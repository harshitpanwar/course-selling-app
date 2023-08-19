import { NextApiRequest, NextApiResponse } from 'next';
import  {prisma}  from '../db/server';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { UserWithoutPassword } from '../../../../interfaces/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if(req.method == 'POST'){

        const { email, password } = req.body;
    
        //check if user already exists
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if(!user){
            return res.status(409).json({status: "nok", message: 'User does not exist'});
        }
        
        const valid = await compare(password, user.password);

        if(!valid){
            return res.status(409).json({status: "nok", message: 'Invalid password'});
        }

        const userWithoutPassword: UserWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email,
        };

        const secret: any = process.env.JWT_SECRET;

        const token = jwt.sign({_id: user.id}, secret);
        
        const options = {expires:new Date(Date.now()+90*24*60*60*1000),
            httpOnly:true,};

        res.setHeader('Set-Cookie', serialize('token', token, options));
        return res.status(201).json({
            status: "ok",
            message: "Logged in successfully",
            user: userWithoutPassword,
            token: token});

    }
    else{
        return res.status(405).json({message: 'Method not allowed'});
    }

}