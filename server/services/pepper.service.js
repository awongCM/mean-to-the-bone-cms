const https = require("https");
const querystring = require("querystring");

const Notification = require("../models/notification");
const Subscriber = require("../models/subscriber");

const TWILIO_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_FROM = process.env.TWILIO_PHONE_NUMBER;

function isTwilioConfigured() {
  return Boolean(TWILIO_SID && TWILIO_TOKEN && TWILIO_FROM);
}

function sendViaTwilio(to, body) {
  return new Promise((resolve, reject) => {
    const postData = querystring.stringify({
      To: to,
      From: TWILIO_FROM,
      Body: body
    });

    const auth = Buffer.from(`${TWILIO_SID}:${TWILIO_TOKEN}`).toString("base64");

    const req = https.request(
      {
        hostname: "api.twilio.com",
        path: `/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`,
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": Buffer.byteLength(postData)
        }
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          const parsed = JSON.parse(data);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve({ sid: parsed.sid, status: "sent" });
          } else {
            reject(new Error(parsed.message || "Twilio request failed"));
          }
        });
      }
    );

    req.on("error", reject);
    req.write(postData);
    req.end();
  });
}

async function deliverSms(to, body) {
  if (isTwilioConfigured()) {
    return sendViaTwilio(to, body);
  }

  console.log(`[PEPPER mock SMS] To: ${to}`);
  console.log(`[PEPPER mock SMS] Body: ${body}`);
  return { sid: `mock-${Date.now()}`, status: "mock" };
}

async function logNotification({ phone, message, status, providerId, pageId, error }) {
  const record = new Notification({
    phone,
    message,
    status,
    providerId,
    pageId,
    error
  });
  return record.save();
}

exports.getStatus = function() {
  return {
    name: "Pepper",
    description: "SMS notification layer for Mean-To-The-Bone CMS",
    mode: isTwilioConfigured() ? "twilio" : "mock",
    twilioConfigured: isTwilioConfigured()
  };
};

exports.getSubscribers = async function() {
  return Subscriber.find({ active: true }).sort({ created_at: -1 });
};

exports.subscribe = async function({ name, phone }) {
  const normalizedPhone = phone.replace(/\s+/g, "");
  const existing = await Subscriber.findOne({ phone: normalizedPhone });

  if (existing) {
    existing.name = name || existing.name;
    existing.active = true;
    return existing.save();
  }

  const subscriber = new Subscriber({
    name,
    phone: normalizedPhone
  });
  return subscriber.save();
};

exports.unsubscribe = async function(phone) {
  const normalizedPhone = phone.replace(/\s+/g, "");
  const subscriber = await Subscriber.findOne({ phone: normalizedPhone });
  if (!subscriber) {
    throw new Error("Subscriber not found");
  }
  subscriber.active = false;
  return subscriber.save();
};

exports.getHistory = async function(limit) {
  const max = limit || 20;
  return Notification.find()
    .sort({ created_at: -1 })
    .limit(max);
};

exports.sendTest = async function({ phone, message }) {
  const body = message || "Pepper test: your CMS SMS notifications are working.";
  const normalizedPhone = phone.replace(/\s+/g, "");

  try {
    const result = await deliverSms(normalizedPhone, body);
    return logNotification({
      phone: normalizedPhone,
      message: body,
      status: result.status,
      providerId: result.sid
    });
  } catch (error) {
    await logNotification({
      phone: normalizedPhone,
      message: body,
      status: "failed",
      error: error.message
    });
    throw error;
  }
};

exports.notifyPagePublished = async function(page, event) {
  const subscribers = await Subscriber.find({ active: true });
  if (!subscribers.length) {
    return [];
  }

  const action = event === "updated" ? "updated" : "published";
  const body = `Pepper alert: Page "${page.title}" was ${action} on Mean-To-The-Bone CMS.`;
  const results = [];

  for (const subscriber of subscribers) {
    try {
      const result = await deliverSms(subscriber.phone, body);
      const record = await logNotification({
        phone: subscriber.phone,
        message: body,
        status: result.status,
        providerId: result.sid,
        pageId: page._id
      });
      results.push(record);
    } catch (error) {
      const record = await logNotification({
        phone: subscriber.phone,
        message: body,
        status: "failed",
        pageId: page._id,
        error: error.message
      });
      results.push(record);
    }
  }

  return results;
};
