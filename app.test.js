const http = require("http");
const app = require("./app");

let server;
let baseUrl;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(0, () => {
    baseUrl = `http://localhost:${server.address().port}`;
    done();
  });
});

afterAll((done) => {
  server.close(done);
});

describe("GET /", () => {
  test("should return status 200", async () => {
    const res = await fetch(`${baseUrl}/`);
    expect(res.status).toBe(200);
  });

  test("should return status ok in body", async () => {
    const res = await fetch(`${baseUrl}/`);
    const body = await res.json();
    expect(body.status).toBe("ok");
  });

  test("should return welcome message", async () => {
    const res = await fetch(`${baseUrl}/`);
    const body = await res.json();
    expect(body.message).toBe("Welcome to CI/CD Demo App!");
  });
});

describe("GET /greeting", () => {
  test("should return status 200", async () => {
    const res = await fetch(`${baseUrl}/greeting`);
    expect(res.status).toBe(200);
  });

  test("should return greeting message", async () => {
    const res = await fetch(`${baseUrl}/greeting`);
    const body = await res.json();
    expect(body.message).toBe("holla");
  });
});

describe("GET /about", () => {
  test("should return status 200", async () => {
    const res = await fetch(`${baseUrl}/about`);
    expect(res.status).toBe(200);
  });

  test("should contain stack array", async () => {
    const res = await fetch(`${baseUrl}/about`);
    const body = await res.json();
    expect(Array.isArray(body.stack)).toBe(true);
    expect(body.stack).toContain("Node.js");
  });
});

describe("POST /calculate", () => {
  const post = (data) =>
    fetch(`${baseUrl}/calculate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

  test("should add two numbers correctly", async () => {
    const res = await post({ a: 5, b: 3, operator: "+" });
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(body.result).toBe(8);
  });

  test("should subtract correctly", async () => {
    const res = await post({ a: 10, b: 4, operator: "-" });
    const body = await res.json();
    expect(body.result).toBe(6);
  });

  test("should multiply correctly", async () => {
    const res = await post({ a: 3, b: 7, operator: "*" });
    const body = await res.json();
    expect(body.result).toBe(21);
  });

  test("should divide correctly", async () => {
    const res = await post({ a: 10, b: 2, operator: "/" });
    const body = await res.json();
    expect(body.result).toBe(5);
  });

  test("should return 400 on division by zero", async () => {
    const res = await post({ a: 5, b: 0, operator: "/" });
    const body = await res.json();
    expect(res.status).toBe(400);
    expect(body.error).toBe("Division by zero");
  });

  test("should return 400 on missing fields", async () => {
    const res = await post({ a: 5 });
    expect(res.status).toBe(400);
  });

  test("should return 400 on invalid operator", async () => {
    const res = await post({ a: 5, b: 3, operator: "%" });
    expect(res.status).toBe(400);
  });
});
