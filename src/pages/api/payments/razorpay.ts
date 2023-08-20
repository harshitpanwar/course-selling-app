import { NextApiRequest, NextApiResponse } from "next";
import Razorpay from "razorpay";
import shortid from "shortid";
import { prisma } from "../db/server"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === "POST") {
    // Initialize razorpay object

    const { course_id, user_id } = req.body;

    const course = await prisma.course.findUnique({
        where: {
            id: Number(course_id)
        }
    });
    const user = await prisma.user.findUnique({
        where: {
            id: Number(user_id)
        }
    });
    
    if(!course || !user){
        return res.status(404).json({status: 'nok', message: 'Course or user not found'});
    }

    const key: any = process.env.RAZORPAY_KEY_ID;
    const secret: any = process.env.RAZORPAY_KEY_SECRET;
    const razorpay = new Razorpay({
      key_id: key,
      key_secret: secret,
    });

    // Create an order -> generate the OrderID -> Send it to the Front-end
    const payment_capture = 1;
    const amount = course.price;
    const currency = "INR";
    const options = {
      amount: (amount * 100).toString(),
      currency,
      receipt: shortid.generate(),
      payment_capture,
    };

    try {
      const response = await razorpay.orders.create(options);
      res.status(200).json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
        name: user.name,
        email: user.email,
        
      });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  } else {

    return res.status(405).json({message: 'Method not allowed'});

  }
}
