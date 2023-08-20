import { Course } from "../../interfaces/Course";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface MyPageProps {
    razorpayPaymentId: string;
    razorpayOrderId: string;
    message: string | undefined;
    course: Course;
  }
  
const OrderConfirmation = () => {

    const router = useRouter();
    let {course, razorpayPaymentId, razorpayOrderId, message}:any = router.query;
    if(course)
    course = JSON.parse(course);

    return  (
        <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
          <h2 className="text-3xl font-bold">Order Details</h2>
          <div className="mt-3 text-sm">
            Check the status of recent and old orders & discover more products
          </div>
          <div className="mt-8 flex flex-col overflow-hidden rounded-lg border border-gray-300 md:flex-row">
            <div className="w-full border-r border-gray-300 bg-gray-100 md:max-w-xs">
              <div className="p-8">
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
                  {[
                    ['razorpayPaymentId', razorpayPaymentId],
                    ['razorpayOrderId', razorpayOrderId],
                    ['Total Amount', `₹ ${course?.price}`],
                    ['Order Status', message],
                  ].map(([key, value]) => (
                    <div key={key} className="mb-4">
                      <div className="text-sm font-semibold">{key}</div>
                      <div className="text-sm font-medium text-gray-700">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="p-8">
                <ul className="-my-7 divide-y divide-gray-200">
                    <li
                      key={course?.id}
                      className="flex flex-col justify-between space-x-5 py-7 md:flex-row"
                    >
                      <div className="flex flex-1 items-stretch">
                        <div className="flex-shrink-0">
                          <img
                            className="h-20 w-20 rounded-lg border border-gray-200 object-contain"
                            src={course?.image}
                            alt={course?.image}
                          />
                        </div>
                        <div className="ml-5 flex flex-col justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-bold text-gray-900">{course?.title}</p>
                            <p className="mt-1.5 text-sm font-medium text-gray-500">{course?.description}</p>
                          </div>
    
                          <p className="mt-4 text-sm font-medium text-gray-500">x 1</p>
                        </div>
                      </div>
    
                      <div className="ml-auto flex flex-col items-end justify-between">
                        <p className="text-right text-sm font-bold text-gray-900">₹ {course?.price}</p>
                      </div>
                    </li>
                </ul>
                <hr className="my-8 border-t border-t-gray-200" />
                {/* <div className="space-x-4">
                  <button
                    type="button"
                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    View Order
                  </button>
                  <button
                    type="button"
                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    View Invoice
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      );
  };
  
export default OrderConfirmation;