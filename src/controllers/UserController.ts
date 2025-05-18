import { Request, Response } from 'express'
import { UserService } from '../services/UserService'

export class UserController {
    createUser = (request: Request, response: Response) => {
        const userService = new UserService()
        const user = request.body

        if (!user.name) {
            response.status(400).json({ message: 'Bad request! Name obrigatório' })
            return
        }

        userService.createUser(user.name, user.email)
        response.status(201).json({ message: 'Usuário criado' })
        return
    }

    getAllUsers = (request: Request, response: Response) => {
        const userService = new UserService()
        const users = userService.getAllUsers()
        response.status(200).json(users)
    }
}
