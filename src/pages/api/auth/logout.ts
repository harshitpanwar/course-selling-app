import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
        if(req.method=='GET'){
    
            //logout 
            const options = {expires:new Date(Date.now()-90*24*60*60*1000),
                httpOnly:true,};
            res.setHeader('Set-Cookie', serialize('token', '', options));
            return res.status(201).json({status: "ok", message: 'Logged out'});
    
        }
        else{
            return res.status(405).json({message: 'Method not allowed'});
        }
}