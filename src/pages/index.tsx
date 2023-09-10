import { useEffect, useState } from "react"
import axios from 'axios';
import { Menu, X, ChevronDown, ChevronRight, Loader } from 'lucide-react'

import { courseListState } from "../../atoms/courses";
import { user } from "../../atoms/user";
import { useRecoilValue, useRecoilState } from 'recoil';
import { allCourseList } from "../../selectors/courses";
import { loggedInUser } from "../../selectors/user";
import Link from "next/link";
import { User, userState } from "../../interfaces/User";
import { Course } from "../../interfaces/Course";
import { useRouter } from 'next/router';
import {Dna} from "react-loader-spinner"

export default function Home() {
    const menuItems = [
        {
          name: 'Home',
          href: '#',
        },
        {
          name: 'About',
          href: '#',
        }
      ]
    const router = useRouter();

    const courses = useRecoilValue(allCourseList);
    const [courseList, setCourseList] = useRecoilState(courseListState);
    const userStatus = useRecoilValue(loggedInUser);
    const [userState, setUserState] = useRecoilState(user);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const userInfo = userStatus.user;
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen)
    }
async function initiatePayment(course: Course) {

  setLoading(true);

  if(!userInfo || !userInfo?.id || !userInfo?.name || !userInfo?.email){
    alert('Please login to buy a course');
    setLoading(false);
    return;
  }

  if(!course || !course?.id ){
    alert('Something went wrong');
    setLoading(false);
    return;
  }

  makePayment(userInfo, course);

}
async function getPosts() {
    axios.get('api/courses')
    .then(response => {
      // Assuming your API response contains the course data
      const courses = response.data;
      setCourseList(courses); // Update Recoil state with fetched data
    })
    .catch(error => {
      console.error('Error fetching courses:', error);
    });

}

async function getUser() {

    const url = 'api/auth/profile';

    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await res.json();

    if(data?.status == 'ok' && data?.user){
        const userState = {
            isAuth: true,
            isAdmin: data?.user?.isAdmin,
            user : data?.user
        }
        setUserState(userState);
        console.log(userState)
    }

}

async function logout() {

    const res = await fetch('api/auth/logout', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await res.json();
    console.log(data)

    if(data?.status == 'ok'){
        const userState = {
            isAuth: false,
            user : null
        }
        setUserState(userState);
        console.log(userState);
        alert('Logged out successfully');
        // window.location.href = '/';

    }
    
}


const makePayment = async (user: User, course: Course) => {

  const res = await initializeRazorpay();

  if (!res) {
    alert("Razorpay SDK Failed to load");
    return;
  }

  // Make API call to the serverless API
  const course_id = course.id;
  const user_id = user.id;
  const apiData = await fetch("/api/payments/razorpay",
    {
    body: JSON.stringify({course_id, user_id}),
    headers: { "Content-Type": "application/json" },
    method: "POST"
    },
    ).then((t) =>
    t.json()
  );
  console.log(apiData);
  var options = {
    key: process.env.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
    name: "Manu Arora Pvt Ltd",
    currency: apiData.currency,
    amount: apiData.amount,
    order_id: apiData.id,
    description: "Thankyou for your test donation",
    image: "https://manuarora.in/logo.png",
    handler: async function (response:any) {
      // Validate payment at server - using webhooks is a better idea.
      console.log(response);
      const data = {
        orderCreationId: apiData.id,
        razorpayPaymentId: response.razorpay_payment_id,
        razorpayOrderId: response.razorpay_order_id,
        razorpaySignature: response.razorpay_signature,
      };

      const result = await axios.post('/api/payments/verifySignature', data);

      
      const props: any = {
        razorpayPaymentId: response.razorpay_payment_id,
        razorpayOrderId: response.razorpay_order_id,
        message: result.data.msg,
        course: JSON.stringify(course)
      };

      console.log("props", props);

      router.push({
        pathname: '/orderconfirmation',
        query: props
      })

      // alert(response.razorpay_payment_id);
      // alert(response.razorpay_order_id);
      // alert(response.razorpay_signature);
    },
    prefill: {
      name: apiData.name,
      email: apiData.email,
      contact: "9999999999",
    },
  };

  const paymentObject = new (window as any).Razorpay(options);
  paymentObject.open();
  setLoading(false);
};

const initializeRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
};


  useEffect(() => {
    // Fetch data from your API
        getPosts();
        getUser();
        console.log(userState)

  }, []);

  return (
    <div className="bg-white">

    {loading && <Dna
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: "1000", backgroundColor: "tranparent"  }}
            wrapperClass="dna-wrapper"
        />}

    {
    userState.isAuth ?
      userState.isAdmin?
      <div className="bg-black text-white text-center py-2">
      Admin {userState?.user?.name} 
      </div>:
      <div className="bg-black text-white text-center py-2">
          Logged in as {userState?.user?.name} 
      </div>:
      <div className="bg-black text-white text-center py-2">
          Not Logged in
      </div>

    }

    <div className="relative w-full bg-white">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <b>Course Selling Platform</b>
      <div className="hidden grow items-start lg:flex">
        <ul className="ml-12 inline-flex space-x-8">
          {menuItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900"
              >
                {item.name}
                {/* <span>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </span> */}
              </a>
            </li>
          ))}
        </ul>

       
      </div>

      <div className="hidden space-x-2 lg:block">

        {!userState.isAuth ?
        <div>
            <button
            type="button"
            className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
            <Link href="/signup" className="font-semibold text-black transition-all duration-200 hover:underline">
                Sign Up
            </Link>
            
            </button>
            <button
            type="button"
            className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
            <Link href="/login" className="font-semibold text-black transition-all duration-200 hover:underline">
                Log In
            </Link>
            
            </button>

        </div>
        :
        <div>
        {
        userState.isAdmin &&

          <Link href="/createCourse" className="font-semibold text-black transition-all duration-200 hover:underline">
            <button
            type="button"
            className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
                Create Course
            </button>
          </Link>
        }
          <button
          type="button"
          className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          onClick={logout}
          >
              Logout
          </button>
        </div>
       
        }
      </div>
      <div className="lg:hidden">
        <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
      </div>
      {isMenuOpen && (
        <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-5 pb-6 pt-5">
              <div className="flex items-center justify-between">
                <div className="-mr-2">
                  <button
                    type="button"
                    onClick={toggleMenu}
                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    <span className="sr-only">Close menu</span>
                    
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-4">
                  {menuItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                    >
                      <span className="ml-3 text-base font-medium text-gray-900">
                        {item.name}
                      </span>
                      <span>
                        <ChevronRight className="ml-3 h-4 w-4" />
                      </span>
                    </a>
                  ))}
                </nav>
              </div>
              <div className="mt-2 space-y-2">
                
            {!userState.isAuth ? 
                <div>
                    <Link href="/auth/login" className="font-semibold text-black transition-all duration-200 hover:underline">
                    <button
                    type="button"
                    className="w-full rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                    <Link href="/signup" className="font-semibold text-black transition-all duration-200 hover:underline">
                        Sign Up
                    </Link>
                    </button>
                    </Link>
                    <button
                    type="button"
                    className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                    <Link href="/login" className="">
                        Log In
                    </Link>
                    </button>
                </div>
                :
                <div>
                  {
                  userState.isAdmin &&

                  <Link href="/createCourse" className="font-semibold text-black transition-all duration-200 hover:underline">
                  <button
                  type="button"
                  className="w-full rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                  Create Course
                  </button>
                  </Link>
                  } 
                  <button
                  type="button"
                  className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  onClick={logout}
                  >
                  Log Out
                  </button>

                </div>
            }
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>

    <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
      {
      courseList.length==0?
      <Dna
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        wrapperClass="dna-wrapper"
      />
      :
      courseList.map((course) => (
        <div
          key={course.id}
          className="relative aspect-[16/9]  w-auto rounded-md md:aspect-auto md:h-[400px]"
        >
          <img
            src={course.image}
            alt="AirMax Pro"
            className="z-0 h-full w-full rounded-md object-cover"
          />
          <div className="absolute inset-0 rounded-md bg-gradient-to-t from-gray-900 to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-left">
            <h1 className="text-lg font-semibold text-white">{course.title}</h1>
            <p className="mt-2 text-sm text-gray-300">
              {course.description}
            </p>
            <p className="mt-2 text-sm text-gray-300">
              Price ₹ {course.price}
            </p>
            <button className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white"
            onClick={(e)=> {e.preventDefault(); initiatePayment(course)}}
            >
              Buy Now &rarr;
            </button>
          </div>
        </div>
      ))}
    </div>
    </div>
  )

}

