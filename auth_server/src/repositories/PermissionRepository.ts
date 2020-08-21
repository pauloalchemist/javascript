import { Repository, EntityRepository } from "typeorm";
import Permission from "../model/Permission";

@EntityRepository(Permission)
class PermissionRepository extends Repository<Permission> {

};

export default PermissionRepository;