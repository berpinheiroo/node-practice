import { UserService } from "../services/UserService";
import { UserController } from "./UserController";
import { makeMockResponse } from "../__mocks__/mockResponse.mock";
import { Request } from "express";
import { makeMockRequest } from "../__mocks__/mockRequest.mock";

const mockUserService = {
  createUser: jest.fn(),
  getUser: jest.fn()
};

jest.mock("../services/UserService", () => {
  return {
    UserService: jest.fn().mockImplementation(() => mockUserService)
  };
});

describe("UserController", () => {
  const userController = new UserController();
  const mockResponse = makeMockResponse();

  it("Deve adicionar um novo usuário", async () => {
    const mockRequest = {
      body: {
        name: "be",
        email: "be@teste.com",
        password: "123456"
      }
    } as Request;
    await userController.createUser(mockRequest, mockResponse);
    expect(mockResponse.state.status).toBe(201);
    expect(mockResponse.state.json).toMatchObject({
      message: "Usuário criado"
    });
  });

  it("Deve retornar erro caso o usuário não informe o nome e o email", async () => {
    const mockRequest = {
      body: {
        name: "",
        email: "",
        password: "123456"
      }
    } as Request;
    const mockResponse = makeMockResponse();
    await userController.createUser(mockRequest, mockResponse);
    expect(mockResponse.state.status).toBe(400);
    expect(mockResponse.state.json).toMatchObject({
      message: 'Bad request! Todos os campos são obrigatórios'
    });
  });

  it("Deve retornar erro caso o usuário não informe o password", async () => {
    const mockRequest = {
      body: {
        name: "be",
        email: "be@teste.com",
        password: ""
      }
    } as Request;
    const mockResponse = makeMockResponse();
    await userController.createUser(mockRequest, mockResponse);
    expect(mockResponse.state.status).toBe(400);
    expect(mockResponse.state.json).toMatchObject({
      message: 'Bad request! Todos os campos são obrigatórios'
    });
  });

  // it('Deve deletar um usuário', async () => {
  //     const mockRequest = {
  //         body: {
  //             name: 'be',
  //         }
  //     } as Request;
  //     const mockResponse = makeMockResponse();
  //     await userController.deleteUser(mockRequest, mockResponse);
  //     expect(mockResponse.state.status).toBe(200);
  //     expect(mockResponse.state.json).toMatchObject({ message: 'Usuário deletado' });
  // });

  it('Deve retornar o usuário com o userId informado', () => {
    const mockRequest = makeMockRequest({
      params: {
        userId: "123456"
      }
    })

    userController.getUser(mockRequest, mockResponse)
    expect(mockUserService.getUser). toHaveBeenCalledWith('123456')
    expect(mockResponse.state.status).toBe(200)
  })
});
