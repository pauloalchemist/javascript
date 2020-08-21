import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import UserRespository from '../repositories/UserRepository';

class UserController {
  async create(request: Request, response: Response) {
    const userRepository = getCustomRepository(UserRespository);
    const { name, username, password } = request.body;
    const existUser = await userRepository.findOne({username});

    if(existUser) {
      return response.status(400).json({message: 'Usuário existente.'});
    }

    const passwordHashed = await hash(password, 8)

    const user = userRepository.create({
      name,
      username,
      password: passwordHashed
    });

    await userRepository.save(user);

    delete user.password;

    return response.status(201).json(user);
  };
};

export default new UserController();