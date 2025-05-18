import { UserService } from "./UserService"

describe('UserService', () => {
    const userService = new UserService()

    it('Deve adicionar um novo usuário', () => {
        const  mockConsole = jest.spyOn(global.console, 'log')
        userService.createUser('bernardo', 'bernardo@teste.com');
        expect(mockConsole).toHaveBeenCalled()
    })
})