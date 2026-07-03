# Mean-To-The-Bone CMS

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.5.

## Project was built in
* Angular 4
* ExpressJS
* Node 8
* NPM 5
* MongoDB

## Pepper — SMS notification layer

**Pepper** is the SMS alert subsystem for this CMS. When a page is published or updated, Pepper notifies subscribed phone numbers.

Without Twilio credentials, Pepper runs in **mock mode** and logs messages to the server console. Set these environment variables for real SMS delivery:

| Variable | Description |
|----------|-------------|
| `TWILIO_ACCOUNT_SID` | Twilio account SID |
| `TWILIO_AUTH_TOKEN` | Twilio auth token |
| `TWILIO_PHONE_NUMBER` | Twilio sender number (E.164 format) |

### Pepper API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/pepper/status` | Pepper mode and configuration |
| GET | `/api/pepper/subscribers` | Active SMS subscribers |
| POST | `/api/pepper/subscribe` | `{ name?, phone }` — subscribe a number |
| POST | `/api/pepper/unsubscribe` | `{ phone }` — unsubscribe |
| POST | `/api/pepper/test` | `{ phone, message? }` — send a test SMS |
| GET | `/api/pepper/history` | Recent notification log |

Page create/update (`POST /api/pages`, `PUT /api/pages`) automatically triggers Pepper notifications to all active subscribers.

## TODOS
1. Add User Authentication
2. Replace Callbacks/Promises with Async/Await functions
3. APIs/Models to revisit
