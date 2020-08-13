import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";

export class CreateUserUseCase {
    constructor(
        private usersRepository: IUsersRepository,
        private mailProvider: IMailProvider, 
    ) {};

    async execute(data: ICreateUserRequestDTO) {
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email); 

        if (userAlreadyExists) {
            throw new Error('Usuário já existe.');
        };

        const user = new User(data); 
        await this.usersRepository.save(user); //criação do usuário

        await this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email,
            },
            from: {
                name: 'Equipe do APP',
                email: 'equipe@app.com'
            },
            subject: 'Seja bem-vindo ao APP',
            body: '<p>Você é super e pode fazer login na plataforma.</p>'
        });
    };
};