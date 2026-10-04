# Routing and Controllers

This example shows how to separate Express route definitions from request-handling logic without adding unnecessary architectural layers.

The router answers one question:

> Which controller should handle this HTTP method and path?

The controller answers another:

> What should happen when that request reaches the application?

Keeping those responsibilities separate makes a growing API easier to read and change.

## What you will practice

- Creating an Express `Router`
- Grouping related endpoints
- Mounting a router under a base path
- Moving request-handling logic into controller functions
- Reading route parameters
- Returning common HTTP status codes
- Keeping a small project structured without overengineering it

## Project structure

```text
03-routing-and-controllers/
├── package.json
└── src/
    ├── server.js
    ├── controllers/
    │   └── bookController.js
    ├── data/
    │   └── books.js
    └── routes/
        └── bookRoutes.js
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

You can also run it without watch mode:

```bash
npm start
```

## 1. Mount a route group

The application mounts the book router under one base path:

```js
app.use("/api/books", bookRoutes);
```

That means the router does not need to repeat `/api/books` for every endpoint.

## 2. Keep the router focused on mapping requests

The router stays small:

```js
router.get("/", listBooks);
router.get("/:id", getBookById);
router.post("/", createBook);
```

It describes the public HTTP interface, but it does not contain the full implementation of each request.

This gives us these endpoints:

```text
GET  /api/books
GET  /api/books/:id
POST /api/books
```

## 3. Put request-handling logic in controllers

The controller contains the logic for each endpoint.

For example:

```js
export function getBookById(req, res) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      message: "Book id must be a positive integer.",
    });
  }

  const book = books.find((item) => item.id === id);

  if (!book) {
    return res.status(404).json({
      message: "Book not found.",
    });
  }

  res.json(book);
}
```

The route file now tells us *where* a request goes, while the controller tells us *what the application does* with that request.

## Try the routes

### List books

```http
GET /api/books
```

Example response:

```json
{
  "count": 2,
  "data": [
    {
      "id": 1,
      "title": "Node.js Backend Development",
      "author": "Yasin Besni"
    },
    {
      "id": 2,
      "title": "API Design Notes",
      "author": "Example Author"
    }
  ]
}
```

### Get one book

```http
GET /api/books/1
```

Example response:

```json
{
  "id": 1,
  "title": "Node.js Backend Development",
  "author": "Yasin Besni"
}
```

### Request a missing book

```http
GET /api/books/99
```

Example response:

```json
{
  "message": "Book not found."
}
```

### Create a book

```http
POST /api/books
Content-Type: application/json
```

Request body:

```json
{
  "title": "Practical Express Patterns",
  "author": "Example Author"
}
```

Example response:

```json
{
  "id": 3,
  "title": "Practical Express Patterns",
  "author": "Example Author"
}
```

The response uses HTTP `201 Created`.

## Why not add services, repositories, and more layers yet?

A service layer or repository layer can be useful when an application has enough business logic or data-access complexity to justify it.

This example does not have that problem yet.

Adding layers before they solve a real problem can make a beginner project harder to follow rather than easier to maintain.

For this stage, the structure is intentionally small:

```text
request
  ↓
route
  ↓
controller
  ↓
data
  ↓
response
```

As the application grows, validation can move into middleware, errors can move into centralized error handling, and database access can move behind dedicated abstractions when those changes become useful.

## A note about the in-memory data

The `books.js` file is only a small in-memory data source so the routing/controller relationship stays easy to see.

Restarting the server resets newly created books.

A later example replaces temporary in-memory data with MongoDB and Mongoose.

## Book

This repository is companion material for **Node.js Backend Development: A Practical Guide to Building Production-Ready APIs** by **Yasin Besni**.

Amazon: https://www.amazon.com/dp/B0HL1NWT4B
