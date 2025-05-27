import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  userService: UserService;

  constructor(userService = new UserService()) {
    this.userService = userService;
  }

  createUser = (request: Request, response: Response) => {
    const userService = UserService;
    const user = request.body;

    if (!user.name || !user.email || !user.password) {
      response
        .status(400)
        .json({ message: "Bad request! Todos os campos são obrigatórios" });
      return;
    }

    this.userService.createUser(user.name, user.email, user.password);
    response.status(201).json({ message: "Usuário criado" });
    return;
  };

  getUser = async (request: Request, response: Response) => {
    const { userId } = request.params;
    const user = await this.userService.getUser(userId);
    response.status(200).json({
        userId: user?.id_user,
        name: user?.name,
        email: user?.email
    });
    return;
  };

  // deleteUser = (request: Request, response: Response) => {
  //     const user = request.body
  //     this.userService.deleteUser(user.name)
  //     response.status(200).json({ message: 'Usuário deletado' })
  // }
}
