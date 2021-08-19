const chai = require("chai");
const sinon = require("sinon");
const UserRepository = require("./user.repository");
const expect = chai.expect;
const faker = require("faker");
const UserService = require("./user.service");

describe("UserServiceTest", function () {
  let expectedStubValue;
  let stubValue;
  let userRepository;
  let userService;

  before(function () {
    userRepository = new UserRepository();
    userService = new UserService(userRepository);
  });

  beforeEach(function () {
    expectedStubValue = {
      id: faker.datatype.uuid(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.past()
    };
    stubValue = expectedStubValue;
  });

  describe("create", function() {
    it("should create a new user", async function () {
      //#region  Arranged
      const stub = sinon.stub(userRepository, "create").returns(stubValue);
      //#endregion

      // Act
      const actualUser = await userService.create(stubValue.name, stubValue.email);

      // Assert
      expect(stub.calledOnce).to.be.true;
      expect(actualUser.id).to.equal(expectedStubValue.id);
      expect(actualUser.name).to.equal(expectedStubValue.name);
      expect(actualUser.email).to.equal(expectedStubValue.email);
      expect(actualUser.createdAt).to.equal(expectedStubValue.createdAt);
      expect(actualUser.updatedAt).to.equal(expectedStubValue.updatedAt);
    });
  });

  describe("getUser", function() {
    it("should return a user that matches the provided id", async function() {
      const stub = sinon.stub(userRepository, "getUser").returns(stubValue);

      const actualUser = await userService.getUser(stubValue.id);

      expect(stub.calledOnce).to.be.true;
      expect(actualUser.id).to.equal(expectedStubValue.id);
      expect(actualUser.name).to.equal(expectedStubValue.name);
      expect(actualUser.email).to.equal(expectedStubValue.email);
      expect(actualUser.createdAt).to.equal(expectedStubValue.createdAt);
      expect(actualUser.updatedAt).to.equal(expectedStubValue.updatedAt);
    });
  });
});
