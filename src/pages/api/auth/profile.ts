import { NextApiRequest, NextApiResponse } from 'next';
import  {prisma}  from '../db/server';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { UserWithoutPassword } from '../../../../interfaces/User';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
        const token = req.cookies['server-token'];

        if(req.method == 'GET'){
        
            if(!token){
                return res.status(401).json({status: 'nok', message: 'Not authenticated'});
            }
            let secret: any;
            let decoded: any;

            try {
                secret = process.env.JWT_SECRET_ADMIN;
                decoded = jwt.verify(token, secret);

            } catch (error) {
                
                try {
                    secret = process.env.JWT_SECRET;
                    decoded = jwt.verify(token, secret);
    
                } catch (error) {
                    
                    return res.status(401).json({status: 'nok', message: 'Not authenticated'});

                }

            }
    
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
                isAdmin: user.isAdmin
            }
    
            return res.status(200).json({status: 'ok', user: userWithoutPassword});
        }
        else{
            return res.status(405).json({message: 'Method not allowed'});
        }
           
    } catch (error: any) {

        return res.status(500).json({status: 'nok', message: error?.message});
        
    }

 

}