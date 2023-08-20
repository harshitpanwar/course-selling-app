import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
import { deleteCookie } from 'cookies-next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
        if(req.method=='GET'){
    
            //logout 
            const options = {expires:new Date(Date.now()-90*24*60*60*1000),
                httpOnly:true,};
            try {
                deleteCookie('server-token', { req, res });
                return res.status(201).json({status: "ok", message: 'Logged out'});

            } catch (error) {

                return res.status(500).json({status: "nok", message: 'Could not log out'});
                
            }
    
        }
        else{
            return res.status(405).json({message: 'Method not allowed'});
        }
}