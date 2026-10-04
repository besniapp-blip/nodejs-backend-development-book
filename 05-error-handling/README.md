# Error Handling

This example shows how to move error responses out of individual route handlers and into a centralized Express error-handling flow.

The goal is not to hide errors. It is to make expected application errors consistent while keeping unexpected failures from leaking unnecessary internal details to API clients.

## What you will practice

- Forwarding errors with `next(error)`
- Creating a small custom `AppError` class
- Handling 404 routes centrally
- Creating centralized error-handling middleware
- Returning consistent JSON error responses
- Distinguishing expected application errors from unexpected failures

## Project structure

```text
05-error-handling/
├── package.json
└── src/
    ├── server.js
    ├── errors/
    │   └── AppError.js
    └── middleware/
        ├── notFound.js
        └── errorHandler.js
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

## The error flow

A route does not need to build every error response itself. It can forward an error:

```js
return next(new AppError(404, "Book not found."));
```

Express then continues to the error-handling middleware:

```text
route
  ↓
next(error)
  ↓
errorHandler
  ↓
JSON error response
```

The centralized handler decides the HTTP status code and response shape.

## Try the routes

### Existing book

```http
GET /api/books/1
```

Example response:

```json
{
  "id": 1,
  "title": "Node.js Backend Development"
}
```

### Invalid id

```http
GET /api/books/abc
```

Example response:

```json
{
  "status": "error",
  "message": "Book id must be a positive integer."
}
```

### Missing book

```http
GET /api/books/99
```

Example response:

```json
{
  "status": "error",
  "message": "Book not found."
}
```

### Unknown route

Requesting a route that is not defined also enters the same centralized error flow.

Example:

```http
GET /api/unknown
```

Example response:

```json
{
  "status": "error",
  "message": "Route not found: GET /api/unknown"
}
```

### Unexpected error

```http
GET /api/demo-error
```

The server logs the original error, but the client receives a generic response:

```json
{
  "status": "error",
  "message": "Internal server error"
}
```

This avoids exposing internal error details to API clients.

## Why centralize error handling?

Without a centralized handler, route handlers often repeat the same response logic:

```js
res.status(404).json({ ... });
res.status(400).json({ ... });
res.status(500).json({ ... });
```

Centralization gives the application one place to define the error response format and makes route handlers easier to read.

## Middleware order

The order at the bottom of `server.js` is intentional:

```js
app.use(notFound);
app.use(errorHandler);
```

Valid routes must be registered first. The 404 middleware handles requests that did not match a route, and the error handler comes last so forwarded errors can reach it.

## Book

This repository is companion material for **Node.js Backend Development: A Practical Guide to Building Production-Ready APIs** by **Yasin Besni**.

Amazon: https://www.amazon.com/dp/B0HL1NWT4B
