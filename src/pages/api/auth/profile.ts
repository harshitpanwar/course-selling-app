import { NextApiRequest, NextApiResponse } from 'next';
import  {prisma}  from '../db/server';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { UserWithoutPassword } from '../../../../interfaces/User';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const {token} = req.cookies;

    if(req.method == 'GET'){

        if(!token){
            return res.status(401).json({status: 'nok', message: 'Not authenticated'});
        }

        const secret: any = process.env.JWT_SECRET;
        const decoded: any = jwt.verify(token, secret);

        const user = await prisma.user.findUnique({
            where: {
                id: decoded._id
            }
        });

        if(!user){
            return res.status(401).json({status: 'nok', message: 'Not authenticated'});
        }

        const userWithoutPassword: UserWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email,
        }

        return res.status(200).json({status: 'ok', user: userWithoutPassword});
    }
    else{
        return res.status(405).json({message: 'Method not allowed'});
    }


}