import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import UserRespository from '../repositories/UserRepository';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';


class SessionController {
  async create(resquest: Request, response: Response) {
    const { username, password } = resquest.body;
    const userRepository = getCustomRepository(UserRespository);
    const user = await userRepository.findOne({username});

    if(!user) {
      return response.status(400).json({erro: "Usuário inválido."});
    }

    const matchPasswword = await compare(password, user.password);

    if(!matchPasswword) {
      return response.status(400).json({erro: "Senha ou usuário inválido"});
    }

    const token = sign({}, "a306723aaafe64254e8d808b61b12bb5", {
      subject: user.id,
      expiresIn: '1d'
    });

    return response.json({
      token,
      user
    });
  };
};

export default new SessionController;