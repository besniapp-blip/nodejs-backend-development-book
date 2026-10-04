# Middleware

This example shows how Express middleware participates in the request/response flow and why middleware order matters.

The code keeps each middleware focused on one responsibility so you can see how reusable request-processing steps fit together.

## What you will practice

- Creating custom middleware
- Understanding middleware order
- Passing control with `next()`
- Adding request-specific data
- Reusing middleware across routes
- Using route-level validation middleware

## Project structure

```text
04-middleware/
├── package.json
└── src/
    ├── server.js
    └── middleware/
        ├── requestContext.js
        ├── requestLogger.js
        └── validateMessage.js
```

## Requirements

- Node.js 18 or newer
- npm

## Run the example

From this folder:

```bash
npm install
npm run dev
```

The API starts at:

```text
http://localhost:3000
```

## How the middleware flow works

For every request, Express processes middleware in registration order:

```text
request
  ↓
express.json()
  ↓
requestContext
  ↓
requestLogger
  ↓
matching route
  ↓
response
```

The `requestContext` middleware creates a unique request ID and stores it on `req`. Because it runs before `requestLogger`, the logger can include that same ID in its output.

Calling `next()` tells Express to continue to the next middleware or route handler.

## Try the routes

### Read request information

```http
GET /api/info
```

Example response:

```json
{
  "message": "Middleware example is running.",
  "requestId": "generated-request-id",
  "receivedAt": "2026-01-01T12:00:00.000Z"
}
```

### Send a valid message

```http
POST /api/messages
Content-Type: application/json
```

Request body:

```json
{
  "message": "Hello middleware"
}
```

Example response:

```json
{
  "message": "Hello middleware",
  "requestId": "generated-request-id"
}
```

### Trigger validation middleware

Send an empty message:

```json
{
  "message": ""
}
```

The `validateMessage` middleware ends the request with HTTP 400 instead of calling `next()`.

Example response:

```json
{
  "message": "The message field must be a non-empty string.",
  "requestId": "generated-request-id"
}
```

## Why middleware order matters

A middleware can only use information created before it runs. If `requestLogger` were registered before `requestContext`, the logger would not have access to the request ID at the beginning of the flow.

This is one reason Express applications usually register middleware deliberately instead of treating `app.use()` calls as interchangeable.

## Book

This repository is companion material for **Node.js Backend Development: A Practical Guide to Building Production-Ready APIs** by **Yasin Besni**.

Amazon: https://www.amazon.com/dp/B0HL1NWT4B
