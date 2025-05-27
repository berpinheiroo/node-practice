import { Request, Response } from "express";
import { sign } from 'jsonwebtoken'

const user = {
  id_user: "12345",
  name: "Bernardo Pinheiro",
  email: "be@diobank.com",
  password: "password"
};

export class LoginController {
  login = async (request: Request, response: Response) => {
    
    const tokenData = {
        name: user.name,
        email: user.email
    }

    const tokenKey = '123456789'

    const tokenOptions = {
        subject: user.id_user
    }
    
    const token = sign(tokenData, tokenKey, tokenOptions)
    
    response.status(200).json({token});
    return;
  };
}
