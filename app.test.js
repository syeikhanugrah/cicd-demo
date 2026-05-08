const request = require("supertest");
const app = require("./app");

// ── GET / ──────────────────────────────────────────────────────────────
describe("GET /", () => {
  test("should return status 200", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
  });

  test("should return status ok in body", async () => {
    const res = await request(app).get("/");
    expect(res.body.status).toBe("ok");
  });

  test("should return welcome message", async () => {
    const res = await request(app).get("/");
    expect(res.body.message).toBe("Welcome to CI/CD Demo App!");
  });
});

// ── GET /about ─────────────────────────────────────────────────────────
describe("GET /about", () => {
  test("should return status 200", async () => {
    const res = await request(app).get("/about");
    expect(res.statusCode).toBe(200);
  });

  test("should contain stack array", async () => {
    const res = await request(app).get("/about");
    expect(Array.isArray(res.body.stack)).toBe(true);
    expect(res.body.stack).toContain("Node.js");
  });
});

// ── POST /calculate ────────────────────────────────────────────────────
describe("POST /calculate", () => {
  test("should add two numbers correctly", async () => {
    const res = await request(app)
      .post("/calculate")
      .send({ a: 5, b: 3, operator: "+" });
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(8);
  });

  test("should subtract correctly", async () => {
    const res = await request(app)
      .post("/calculate")
      .send({ a: 10, b: 4, operator: "-" });
    expect(res.body.result).toBe(6);
  });

  test("should multiply correctly", async () => {
    const res = await request(app)
      .post("/calculate")
      .send({ a: 3, b: 7, operator: "*" });
    expect(res.body.result).toBe(21);
  });

  test("should divide correctly", async () => {
    const res = await request(app)
      .post("/calculate")
      .send({ a: 10, b: 2, operator: "/" });
    expect(res.body.result).toBe(5);
  });

  test("should return 400 on division by zero", async () => {
    const res = await request(app)
      .post("/calculate")
      .send({ a: 5, b: 0, operator: "/" });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Division by zero");
  });

  test("should return 400 on missing fields", async () => {
    const res = await request(app).post("/calculate").send({ a: 5 });
    expect(res.statusCode).toBe(400);
  });

  test("should return 400 on invalid operator", async () => {
    const res = await request(app)
      .post("/calculate")
      .send({ a: 5, b: 3, operator: "%" });
    expect(res.statusCode).toBe(400);
  });
});
