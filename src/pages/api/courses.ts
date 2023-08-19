import { NextApiRequest, NextApiResponse } from 'next';
import  {prisma}  from '../api/db/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    // const prisma = new PrismaClient();

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
    
        const createdCourse = await prisma.course.create({
            data: {
                title,
                description,
            },
        });
    
        return res.send(createdCourse);

    }

}