const db = require("./database");
require("./schema");

const problems = [
  {
    title: "Parking Lot",
    slug: "parking-lot",
    description:
      "Design a parking lot system that supports different vehicle types and parking slots.",
    requirements: JSON.stringify([
      "Support multiple vehicle types",
      "Assign suitable parking slots",
      "Release parking slots",
      "Calculate parking fees",
      "Support multiple floors"
    ]),
    difficulty: "Medium"
  },
  {
    title: "Elevator System",
    slug: "elevator-system",
    description:
      "Design an elevator system that manages multiple elevators and floor requests.",
    requirements: JSON.stringify([
      "Support multiple elevators",
      "Accept floor requests",
      "Assign elevators",
      "Handle elevator movement",
      "Support internal and external requests"
    ]),
    difficulty: "Hard"
  },
  {
    title: "Vending Machine",
    slug: "vending-machine",
    description:
      "Design a vending machine that manages products, payments and inventory.",
    requirements: JSON.stringify([
      "Display products",
      "Accept payment",
      "Dispense products",
      "Return change",
      "Handle out-of-stock products"
    ]),
    difficulty: "Easy"
  },
  {
    title: "Library Management",
    slug: "library-management",
    description:
      "Design a library system for books, members and borrowing.",
    requirements: JSON.stringify([
      "Manage books",
      "Register members",
      "Issue books",
      "Return books",
      "Track overdue books"
    ]),
    difficulty: "Medium"
  }
];

const insert = db.prepare(`
  INSERT OR IGNORE INTO problems
  (title, slug, description, requirements, difficulty)
  VALUES (?, ?, ?, ?, ?)
`);

const transaction = db.transaction(() => {
  for (const problem of problems) {
    insert.run(
      problem.title,
      problem.slug,
      problem.description,
      problem.requirements,
      problem.difficulty
    );
  }
});

transaction();

console.log("Problems seeded successfully.");