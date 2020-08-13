import { Router, request, response } from "express";
import { createUserController } from "./UseCases/CreateUser";

const router = Router();

router.post('/users', (request, response) => {
    return createUserController.handle(request, response)
});

export { router };