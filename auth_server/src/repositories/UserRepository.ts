import { Repository, EntityRepository } from 'typeorm';
import User from '../model/User';

@EntityRepository(User)
class UserRespository extends Repository<User> {

};

export default UserRespository;