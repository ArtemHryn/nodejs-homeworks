/* eslint-disable no-undef */
const { describe, it, expect } = require("@jest/globals");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { loginController } = require("../controllers/authControllers");
const { User } = require("../models/userModel");

describe("login controller test", () => {
  it("it should return status 200, token and object user with email and subscription", async (done) => {
    const user = {
      _id: "1",
      createdAt: "2022-12-30T15:21:21.657+00:00",
      subscription: "starter",
    };
    const mReq = {
      body: {
        email: "fake@mail.com",
        password: "123456789",
      },
    };
    const token = jwt.sign(
      {
        _id: user._id,
        createdAt: user.createdAt,
      },
      process.env.JWT_SALT,
      { expiresIn: "1d" }
    );
    const result = {
      user: {
        email: mReq.body.email,
        subscription: user.subscription,
      },
      token,
    };

    const mRes = {
      status: jest.fn(() => mRes),
      json: jest.fn(() => mRes),
    };
    jest.spyOn(User, "findOne").mockImplementationOnce(() => mReq.body.email);
    // jest.spyOn(User, "findByIdAndUpdate").mockImplementationOnce(() => done());
    User.findByIdAndUpdate = jest.fn();

    await loginController(mReq, mRes);

    expect(mRes.status).toHaveBeenCalledWith(200);
    expect(mRes.status).toHaveBeenCalledTimes(1);
    console.log('done');
    expect(mRes.json).toHaveBeenCalledWith(result);
    expect(mRes.json).toHaveBeenCalledTimes(1);
    
  });
});
