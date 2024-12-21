import "reflect-metadata";
import { describe } from "node:test";
import app from "../../src/app";
import request from "supertest";
import datasource from "../../src/config/init";
import Category from "../../src/model/Category";

beforeAll(async () => {
  await datasource.initialize();
  await datasource.synchronize();
});

afterAll(async () => {
  await datasource.destroy();
});

describe("Category routes", () => {
  test("should return 404 when category not found", async () => {
    const response = await request(app).get(
      "/categories/183f74ec-5bc2-44b9-a491-0dd14099651f",
    );
    expect(response.status).toBe(404);
  });
  test("should return 404 when updating category that does not exist", async () => {
    const response = await request(app)
      .post(`/categories/183f74ec-5bc2-44b9-a491-0dd14099651f`)
      .send({ name: "category" });
    expect(response.status).toBe(404);
  });
  test("should return all categories", async () => {
    const categories = await request(app).get("/categories");
    expect(categories.status).toBe(200);
  });

  test("should create a new category with custom color", async () => {
    const response = await request(app)
      .post("/categories")
      .send({ name: "category_1" });
    expect(response.status).toBe(200);
    const category: Category = response.body;
    expect(category.color).toBe("#282828");
  });
  test("should create a new category with custom", async () => {
    const response = await request(app)
      .post("/categories")
      .send({ name: "category_2", color: "#CCDDFF" });
    expect(response.status).toBe(200);
    const category: Category = response.body;
    expect(category.color).toBe("#CCDDFF");
  });
  test("should find a category by name", async () => {
    const response = await request(app).get("/categories?name=category_1");
    expect(response.status).toBe(200);
    const categories: Category[] = response.body;
    expect(categories.length).toBe(1);
    expect(categories.at(0)!.name).toBe("category_1");
  });
  test("should find a category by id", async () => {
    const createResponse = await request(app)
      .post("/categories")
      .send({ name: "category_3" });
    const category: Category = createResponse.body;
    const response = await request(app).get(`/categories/${category.id}`);
    expect(response.status).toBe(200);
    const foundCategory: Category = response.body;
    expect(foundCategory.id).toBe(category.id);
  });
  test("should update a category", async () => {
    const createResponse = await request(app)
      .post("/categories")
      .send({ name: "category_4" });
    const category: Category = createResponse.body;
    const response = await request(app)
      .post(`/categories/${category.id}`)
      .send({ name: "category_4a" });
    expect(response.status).toBe(200);
    const updatedCategory: Category = response.body;
    expect(updatedCategory.name).toBe("category_4a");
  });
  test("should delete a category", async () => {
    const createResponse = await request(app)
      .post("/categories")
      .send({ name: "category_5" });
    const category: Category = createResponse.body;
    const response = await request(app).delete(`/categories/${category.id}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      "Succesfully removed category: category_5",
    );
  });
  test("should return 400 when category name is not passed", async () => {
    const response = await request(app)
      .post("/categories")
      .send({ color: "#CCDDFF" });
    expect(response.status).toBe(400);
  });
  test("should return 400 when category name is empty", async () => {
    const response = await request(app).post("/categories").send({ name: "" });
    expect(response.status).toBe(400);
  });
  test("should return 400 when category name is already exists", async () => {
    const response = await request(app)
      .post("/categories")
      .send({ name: "category_1" });
    expect(response.status).toBe(400);
  });
  test("should return 400 when updating category with empty name", async () => {
    const createResponse = await request(app)
      .post("/categories")
      .send({ name: "category_6" });
    const category: Category = createResponse.body;
    const response = await request(app)
      .post(`/categories/${category.id}`)
      .send({ name: "" });
    expect(response.status).toBe(400);
  });
  test("should return 400 when updating category without a name passed", async () => {
    const createResponse = await request(app)
      .post("/categories")
      .send({ name: "category_7" });
    const category: Category = createResponse.body;
    const response = await request(app)
      .post(`/categories/${category.id}`)
      .send({ color: "#CCDDFF" });
    expect(response.status).toBe(400);
  });
  test("should return 400 when updating category with already existing name", async () => {
    const createResponse = await request(app)
      .post("/categories")
      .send({ name: "category_8" });
    const category: Category = createResponse.body;
    const response = await request(app)
      .post(`/categories/${category.id}`)
      .send({ name: "category_1" });
    expect(response.status).toBe(400);
  });
});
