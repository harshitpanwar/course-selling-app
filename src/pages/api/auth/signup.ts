import { NextApiRequest, NextApiResponse } from 'next';
import  {prisma}  from '../db/server';
import { hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { UserWithoutPassword } from '../../../../interfaces/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if(req.method=='POST'){

        const {name, email, password} = req.body;

        const hashedPassword = await hash(password, 10);

        //check if user already exists
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if(user){
            return res.status(409).json({status: "nok", message: 'User already exists'});
        }
        
        const createdUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword
            }
        });

        const userWithoutPassword: UserWithoutPassword = {
            id: createdUser.id,
            name: createdUser.name,
            email: createdUser.email,
        };

        const secret: any = process.env.JWT_SECRET;

        const token = jwt.sign({_id: createdUser.id}, secret);
        
        const options = {expires:new Date(Date.now()+90*24*60*60*1000),
            httpOnly:true,};

        res.setHeader('Set-Cookie', serialize('token', token, options));
        return res.status(201).json({
                status: "ok",
                message: "Signed up successfully",
                user: userWithoutPassword,
                token: token
                });

    }
    else{
        return res.status(405).json({message: 'Method not allowed'});
    }

}

