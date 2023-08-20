import { NextApiRequest, NextApiResponse } from 'next';
import  {prisma}  from '../db/server';
import { hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { UserWithoutPassword } from '../../../../interfaces/User';
import { setCookie } from 'cookies-next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
        if(req.method=='POST'){

            let {name, email, password, isAdmin} = req.body;
    
            isAdmin = isAdmin==='true'?true:false;
    
            if(!name || !email || !password || isAdmin==undefined){
                
                return res.status(409).json({status: "nok", message: 'Missing name, email, password or Admin'});
            }
    
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
                    password: hashedPassword,
                    isAdmin: isAdmin
                }
            });
    
            const userWithoutPassword: UserWithoutPassword = {
                id: createdUser.id,
                name: createdUser.name,
                email: createdUser.email,
            };
    
            let secret: any;
            let token: any;
    
            if(isAdmin){
                secret = process.env.JWT_SECRET_ADMIN;
                token = jwt.sign({_id: createdUser.id, isAdmin: true}, secret);
                userWithoutPassword.isAdmin = true;
            }
            else{
                secret = process.env.JWT_SECRET;
                token = jwt.sign({_id: createdUser.id}, secret);
                userWithoutPassword.isAdmin = false;
            }
    
            setCookie('server-token', token, { req, res, maxAge: 90*24*60*60*1000 });
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
    } catch (error: any) {
        
        return res.status(500).json({status: "nok", message: error?.message});

    }



}

