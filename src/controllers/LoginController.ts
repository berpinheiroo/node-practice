import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class LoginController {
  userService: UserService;

  constructor(userService = new UserService()) {
    this.userService = userService;
  }

  login = async (request: Request, response: Response) => {
    const { email, password } = request.body;

    try {
      const token = await this.userService.getToken(email, password);

      response.status(200).json({ token });
      return;
    } catch (error) {
      response.status(500).json({ message: "Email/password invalid!" });
      return;
    }
  };
}
