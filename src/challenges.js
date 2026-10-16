export const challenges = [
  {
    title: "Start with the basics",
    skill: "TypeScript",
    level: "beginner",
    time: "5 min",
    icon: "{ }",
    description:
      "Small problems. Solid foundations. Your first win starts here.",
    prompt:
      "Write a function named add that takes two numbers and returns their sum.",
    solution:
      "function add(a: number, b: number): number {\n  return a + b;\n}",
  },
  {
    title: "Make data make sense",
    skill: "SQL",
    level: "beginner",
    time: "10 min",
    icon: "▤",
    description: "Find the story in the data, one query at a time.",
    prompt:
      "Select the name of every user from a table named users, sorted alphabetically.",
    solution: "SELECT name FROM users\nORDER BY name ASC;",
  },
  {
    title: "Think outside the loop",
    skill: "Algorithms",
    level: "intermediate",
    time: "15 min",
    icon: "⌘",
    description: "Stretch your thinking. Find a smarter way to solve it.",
    prompt:
      "Given an array of numbers, return an array with duplicate values removed.",
    solution:
      "function unique(values: number[]): number[] {\n  return [...new Set(values)];\n}",
  },
];
