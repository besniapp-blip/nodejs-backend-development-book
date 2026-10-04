export const books = [
  {
    id: 1,
    title: "Node.js Backend Development",
    author: "Yasin Besni",
  },
  {
    id: 2,
    title: "API Design Notes",
    author: "Example Author",
  },
];

export function getNextBookId() {
  return books.length === 0
    ? 1
    : Math.max(...books.map((book) => book.id)) + 1;
}
