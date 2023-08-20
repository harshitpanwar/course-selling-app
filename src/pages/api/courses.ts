import { NextApiRequest, NextApiResponse } from 'next';
import  {prisma}  from '../api/db/server';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    // const prisma = new PrismaClient();
    try {

        if(req.method == 'GET'){

            const course_id = req.query.id;
    
            let courses;
            if(!course_id)
                courses = await prisma.course.findMany();
            else
                courses = await prisma.course.findUnique({
                    where: {
                        id: Number(course_id)
                    }
                })
            
            return res.send(courses);
        }
        else if(req.method == 'POST'){
            const { title, description } = req.body;
    
            const token = req.cookies['server-token'];
            if(!token){
                return res.status(401).json({status: 'nok', message: 'Not authenticated'});
            }
            let secret: any;
            let decoded: any;
    
            try{
                secret = process.env.JWT_SECRET_ADMIN;
                decoded = jwt.verify(token, secret);
            }
            catch(error:any){
                return res.status(401).json({status: 'nok', message: "Only admin can create courses"});
            }
    
            const user = await prisma.user.findUnique({
                where: {
                    id: decoded._id
                }
            });
    
            if(!user){
                return res.status(401).json({status: 'nok', message: 'Not authenticated'});
            }
    
    
            if(!title || !description){
                return res.send({
                    status: 'nok',
                    message: 'Missing title or description'
                });
            }
        
            const createdCourse = await prisma.course.create({
                data: {
                    title,
                    description,
                },
            });
        
            return res.send({
                status: 'ok',
                message: 'Course created successfully',
                createdCourse
            });
    
        }
            
    } catch (error: any) {
        
        return res.status(500).json({status: 'nok', message: error.message});

    }

}