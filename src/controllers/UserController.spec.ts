import { UserService } from "../services/UserService";
import { UserController } from "./UserController";
import { makeMockResponse } from "../__mocks__/mockResponse.mock";
import { Request } from "express";

describe('UserController', () => {
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getAllUsers: jest.fn(),
        deleteUser: jest.fn()
    }
    const userController = new UserController(mockUserService as UserService);

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'be',
                email: 'be@teste.com'
            }
        } as Request;
        const mockResponse = makeMockResponse();
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado' })
    }),
        it('Deve retornar erro caso o usuário não informe o nome', () => {
            const mockRequest = {
                body: {
                    name: '',
                    email: 'be@teste.com'
                }
            } as Request;
            const mockResponse = makeMockResponse();
            userController.createUser(mockRequest, mockResponse)
            expect(mockResponse.state.status).toBe(400)
            expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Name obrigatório' })
        }),
        it('Deve retornar erro caso o usuário não informe o email', () => {
            const mockRequest = {
                body: {
                    name: 'be',
                    email: ''
                }
            } as Request;
            const mockResponse = makeMockResponse();
            userController.createUser(mockRequest, mockResponse)
            expect(mockResponse.state.status).toBe(400)
            expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Email obrigatório' })
        }),
        it('Deve retornar todos os usuários', () => {
            const mockRequest = {} as Request;
            const mockResponse = makeMockResponse<{name: string, email: string}[]>();

            (mockUserService.getAllUsers as jest.Mock).mockReturnValue([
                { name: 'be', email: 'be@teste.com'}
            ])

            userController.getAllUsers(mockRequest, mockResponse)

            expect(mockResponse.state.status).toBe(200)
            expect(mockResponse.state.json).toMatchObject([
                { name: 'be', email: 'be@teste.com'}
            ])
        })
        it('Deve deletar um usuário', () => {
            const mockRequest = {
                body: {
                    name: 'be',
                }
            } as Request;
            const mockResponse = makeMockResponse();
            userController.deleteUser(mockRequest, mockResponse)
            expect(mockResponse.state.status).toBe(200)
            expect(mockResponse.state.json).toMatchObject({ message: 'Usuário deletado' })
        })
    })

