import { NextApiRequest, NextApiResponse } from "next";
import crypto from 'crypto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if(req.method == 'POST'){
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        } = req.body;

        const secret:any = process.env.RAZORPAY_KEY_SECRET;
        const shasum = crypto.createHmac("sha256", secret);

        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

        const generated_signature = shasum.digest("hex");

        // comaparing our digest with the actual signature
        if (generated_signature !== razorpaySignature)
            return res.status(200).json({ msg: "Transaction not legit!" });

        return res.send({
            msg: "Transaction successful!",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        });

    
    }
    else
    return res.status(405).json({message: 'Method not allowed'});

   

}