const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const faker = require("faker");
const UserController = require("./user.controller");
const UserService = require("./user.service");
const UserRepository = require("./user.repository");

describe("UserControllerTest", function () {
  let expectedStubValue;
  let stubValue;
  let status;
  let json;
  let req;
  let res;
  let userController;
  let userService;
  let userRepository;

  before(function () {
    userRepository = sinon.spy();
    userService = new UserService(userRepository);
    userController = new UserController(userService);
    status = sinon.stub();
    json = sinon.spy();
    res = {
      json,
      status
    };
    status.returns(res);
  });

  describe("register", function () {
    beforeEach(() => {
      expectedStubValue = {
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        email: faker.internet.email(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past()
      };
      stubValue = expectedStubValue;
    });

    it("should not register a user when name param is not provided", async function () {
      req = {
        body: {
          email: faker.internet.email()
        }
      };

      await userController.register(req, res);

      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal("Invalid Params");
    });

    it.skip("should not register a user when name and email params are not provided", async function () {
      req = { body: {} };

      await userController.register(req, res);

      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal("Invalid Params");
    });

    it.skip("should not register a user when email param is not provided", async function () {
      req = {
        body: {
          name: faker.name.findName()
        }
      };

      await userController.register(req, res);

      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal("Invalid Params");
    });

    it.skip("should register a user when email and name params are provided", async function () {
      req = {
        body: {
          name: faker.name.findName(),
          email: faker.internet.email()
        }
      };
      const stub = sinon.stub(userService, "create").returns(stubValue);

      await userController.register(req, res);

      expect(stub.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(201);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].data).to.equal(stubValue);
    });
  });

  describe("getUser", function () {
    beforeEach(() => {
      req = {
        params: {
          id: faker.datatype.uuid()
        }
      };
      res = { json: function () { } };
    });

    it("should return a user that matches the id param", async function () {
      stubValue = {
        id: req.params.id,
        name: faker.name.findName(),
        email: faker.internet.email(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past()
      };
      const mock = sinon.mock(res);
      mock
        .expects("json")
        .once()
        .withExactArgs({ data: stubValue });
      const stub = sinon.stub(userService, "getUser").returns(stubValue);

      await userController.getUser(req, res);

      expect(stub.calledOnce).to.be.true;
      mock.verify();
    });
  });
});
