# Mean-To-The-Bone CMS

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.5.

A minimal **MEAN stack CMS** (MongoDB, Express, Angular, Node) for managing users, pages, headers, and footers.

## Project was built in
* Angular 4
* ExpressJS
* Node 8
* NPM 5
* MongoDB

## SMS notifications

This CMS can send **SMS alerts** when content is published or updated. Subscribers receive a text when a page is created or changed.

Without Twilio credentials, SMS runs in **mock mode** and logs messages to the server console. Set these environment variables for real delivery:

| Variable | Description |
|----------|-------------|
| `TWILIO_ACCOUNT_SID` | Twilio account SID |
| `TWILIO_AUTH_TOKEN` | Twilio auth token |
| `TWILIO_PHONE_NUMBER` | Twilio sender number (E.164 format) |

### SMS API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/sms/status` | SMS mode and configuration |
| GET | `/api/sms/subscribers` | Active SMS subscribers |
| POST | `/api/sms/subscribe` | `{ name?, phone }` — subscribe a number |
| POST | `/api/sms/unsubscribe` | `{ phone }` — unsubscribe |
| POST | `/api/sms/test` | `{ phone, message? }` — send a test SMS |
| GET | `/api/sms/history` | Recent notification log |

Page create/update (`POST /api/pages`, `PUT /api/pages`) automatically notifies all active subscribers.

## TODOS
1. Add User Authentication
2. Replace Callbacks/Promises with Async/Await functions
3. APIs/Models to revisit
