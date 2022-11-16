import prismaClient from '../../prisma/index'
import { hash } from 'bcryptjs'

interface UserRequest{
    name: string;
    email: string;
    password: string;
}


class CreateUserService{
    async execute({ name, email, password }: UserRequest){

        //verificar se ele enviou um email

        if(!email){
            throw new Error("Email incorreto!")
        }

        //verificar se o email já está cadastrado

        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        });

        if(userAlreadyExists){
            throw new Error("Usuário já cadastrado com este email!")
        }

        const passwordHash = await hash(password, 8);

        const user = await prismaClient.user.create({
            data:{
                name: name,
                email: email,
                password: passwordHash,
            },
            select:{
                id: true,
                name: true,
                email: true,
            }
        });

        return user

    }
}

export { CreateUserService }