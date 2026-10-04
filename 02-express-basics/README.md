# Express Basics

This example introduces the minimum structure needed to run a small Express API.

It is intentionally simple so you can focus on the request/response flow before moving on to routing, controllers, middleware, database models, and centralized error handling.

## What you will practice

- Creating an Express application
- Parsing JSON request bodies
- Defining `GET` and `POST` routes
- Returning JSON responses and HTTP status codes
- Using a simple 404 fallback route
- Running the application with Node.js

## Project structure

```text
02-express-basics/
├── package.json
└── src/
    └── server.js
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

The API will start at:

```text
http://localhost:3000
```

You can also run it without watch mode:

```bash
npm start
```

## Try the routes

### Home

```http
GET /
```

Example response:

```json
{
  "message": "Node.js Backend Development companion API"
}
```

### Health check

```http
GET /api/health
```

Example response:

```json
{
  "status": "ok"
}
```

### Echo JSON data

```http
POST /api/echo
Content-Type: application/json
```

Example request body:

```json
{
  "title": "Learning Express"
}
```

Example response:

```json
{
  "received": {
    "title": "Learning Express"
  }
}
```

### Unknown route

A request to a route that does not exist returns:

```json
{
  "message": "Route not found"
}
```

## Why this example stays small

At this stage, all routes live in one file on purpose. Once the basic Express request/response flow is clear, the next companion examples separate routing and controller responsibilities and introduce reusable middleware.

## Book

This repository is companion material for **Node.js Backend Development: A Practical Guide to Building Production-Ready APIs** by **Yasin Besni**.

Amazon: https://www.amazon.com/dp/B0HL1NWT4B
