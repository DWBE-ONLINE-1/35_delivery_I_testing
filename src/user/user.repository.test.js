const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const faker = require("faker");
const { UserModel } = require("../database");
const UserRepository = require("./user.repository");

describe("UserRepositoryTest", function () {
  let expectedStubValue;
  let stubValue;
  let userRepository;

  before(function () {
    userRepository = new UserRepository();
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
    it("should add a new user to DB", async function () {
      const stub = sinon.stub(UserModel, "create").returns(stubValue);
    
      const actualUser = await userRepository.create(stubValue.name, expectedStubValue.email);

      expect(stub.calledOnce).to.be.true;
      expect(actualUser.id).to.equal(expectedStubValue.id);
      expect(actualUser.name).to.equal(expectedStubValue.name);
      expect(actualUser.email).to.equal(expectedStubValue.email);
      expect(actualUser.createdAt).to.equal(expectedStubValue.createdAt);
      expect(actualUser.updatedAt).to.equal(expectedStubValue.updatedAt);
    });
  });

  describe("getUser", function() {
    it("should return a user with specific id", async function() {
      const stub = sinon.stub(UserModel, "findOne").returns(stubValue);
    
      const actualUser = await userRepository.getUser(stubValue.id);

      expect(stub.calledOnce).to.be.true;
      expect(actualUser.id).to.equal(expectedStubValue.id);
      expect(actualUser.name).to.equal(expectedStubValue.name);
      expect(actualUser.email).to.equal(expectedStubValue.email);
      expect(actualUser.createdAt).to.equal(expectedStubValue.createdAt);
      expect(actualUser.updatedAt).to.equal(expectedStubValue.updatedAt);
    });
  });
});
