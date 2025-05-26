import { EntityManager } from "typeorm";
import { AppDataSource } from "../database/index"
import { User } from "../entities/User";

export class UserRepository {
    private manager: EntityManager;

    constructor(
        manager: EntityManager = AppDataSource.manager
    ) {
        this.manager = manager;
    }

    createUser = async (user: User) => {
        return this.manager.save(user);
    }
}