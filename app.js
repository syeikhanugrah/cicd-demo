const express = require("express");
const app = express();

app.use(express.json());

// GET / — Health check
app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Welcome to CI/CD Demo App!",
    version: "1.0.0",
  });
});

// GET /greeting
app.get("/greeting", (req, res) => {
  res.status(200).json({
    message: "hello",
  });
});

// GET /about — About endpoint
app.get("/about", (req, res) => {
  res.status(200).json({
    app: "CI/CD Demo",
    author: "Syeikh Anugrah",
    stack: ["Node.js", "Express", "GitHub Actions", "Vercel"],
  });
});

// POST /calculate — Simple calculator
app.post("/calculate", (req, res) => {
  const { a, b, operator } = req.body;

  if (a === undefined || b === undefined || !operator) {
    return res
      .status(400)
      .json({ error: "Missing required fields: a, b, operator" });
  }

  let result;
  switch (operator) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "*":
      result = a * b;
      break;
    case "/":
      if (b === 0) return res.status(400).json({ error: "Division by zero" });
      result = a / b;
      break;
    default:
      return res
        .status(400)
        .json({ error: "Invalid operator. Use: +, -, *, /" });
  }

  res.status(200).json({ a, b, operator, result });
});

module.exports = app;
