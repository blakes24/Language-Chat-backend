"use strict";

const request = require("supertest");
const app = require("../app");

/************************************** GET / */

describe("GET /", function () {
  test("works", async function () {
    const resp = await request(app).get("/");

    expect(resp.body).toEqual({ msg: "working" });
  });
});
