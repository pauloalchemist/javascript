import { Request, Response, NextFunction, request } from 'express';
import { decode } from 'jsonwebtoken';
import UserRespository from '../repositories/UserRepository';
import { getCustomRepository } from 'typeorm';
import User from '../model/User';

async function decoder(request: Request): Promise <User | undefined> {
  
  const authHeader = request.headers.authorization || "";
  const userRepository = await getCustomRepository(UserRespository);

  const [, token ] = authHeader?.split(" "); 

  const payload = decode(token);
  
  const user = await userRepository.findOne(payload?.sub, { relations: ['roles'] });

  return user;
};

function is(role: String[]) {
  const roleAuthorized = async (request: Request, response: Response, next: NextFunction) => {
    
    const user = await decoder(request);

    const userRoles = user?.roles.map(role => role.name);

    const existRoles = userRoles?.some(r => role.includes(r));

    if(existRoles) {
      return next();
    };

    return response.status(401).json({message: "usuário sem autorização"});
    
  }

  return roleAuthorized;
};

export { is };