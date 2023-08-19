import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if(req.method == 'GET'){
        return res.send('Hello world');
    }
    else{
        return res.status(405).json({message: 'Method not allowed'});
    }

}