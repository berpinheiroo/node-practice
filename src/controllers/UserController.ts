import { Request, Response } from 'express'
import { UserService } from '../services/UserService'

export class UserController {
    userService: UserService

    constructor(
        userService = new UserService()
    ) {
        this.userService = userService
    }

    createUser = (request: Request, response: Response) => {
        const userService = UserService
        const user = request.body

        if (!user.name) {
            response.status(400).json({ message: 'Bad request! Name obrigatório' })
            return
        }
        
        if (!user.email) {
            response.status(400).json({ message: 'Bad request! Email obrigatório' })
            return
        }

        this.userService.createUser(user.name, user.email)
        response.status(201).json({ message: 'Usuário criado' })
        return
    }

    getAllUsers = (request: Request, response: Response) => {
        const users = this.userService.getAllUsers()
        response.status(200).json(users)
    }
}
