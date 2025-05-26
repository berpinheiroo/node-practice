import { UserService } from "./UserService";

jest.mock("../repositories/UserRepository");

const mockUserRepository = require("../repositories/UserRepository");

describe("UserService", () => {
  const userService = new UserService(mockUserRepository);

  it("Deve adicionar um novo usuário", async () => {
    mockUserRepository.createUser = jest.fn().mockImplementation(() =>
      Promise.resolve({
        user_id: "123456",
        name: "bernardo",
        email: "be@teste.com",
        password: "123456"
      })
    );
    const response = await userService.createUser("bernardo", "bernardo@teste.com", "12345");
    expect(mockUserRepository.createUser).toHaveBeenCalled();
    expect(response).toMatchObject({
        user_id: "123456",
        name: "bernardo",
        email: "be@teste.com",
        password: "123456"
    })
  });
});
