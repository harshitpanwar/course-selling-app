import { NextApiRequest, NextApiResponse } from 'next'
import { Formidable } from "formidable";
import { s3Upload } from '@/aws/s3-upload';
import { s3GetSignedUrl } from '@/aws/s3-get-signed-url';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import  {prisma}  from './db/server';

//set bodyparser
//disable bodyparser for file upload
export const config = {
  api: {
    bodyParser: false
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {

    const data:any = await new Promise((resolve, reject) => {
        const form = new Formidable();
    
        form.parse(req, (err, fields, files) => {
          if (err) reject({ err })
          resolve({ err, fields, files })
        }) 
      })
    
    let { title, description, price } = data?.fields;
    const file = data?.files?.file[0];
    
    title = title[0];
    description = description[0];
    price = price[0];

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


    if(!title || !description || !price){
        return res.send({
            status: 'nok',
            message: 'Missing title or description'
        });
    }

    //upload file to s3
    const folder = 'courses';
    const fileExtension = file.originalFilename.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;

    const fileData = fs.readFileSync(file.filepath);

    const response: any = await s3Upload({folder, file: {name: fileName, data: fileData}});

    console.log(response);

    if(response.error){
        return res.status(400).json({status: 'nok', message: 'Error uploading file'});
    }

    const createdCourse = await prisma.course.create({
        data: {
            title,
            description,
            price: Number(price),
            image: response.Location,
        },
    });


    return res.status(200).json({
        status: 'ok',
        message: 'Course created successfully',
        createdCourse
    });

    return res.send({
        status: 'ok',
        message: 'Course created successfully',
        createdCourse
    });


  
}
