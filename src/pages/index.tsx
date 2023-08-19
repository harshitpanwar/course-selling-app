import { useEffect, useState } from "react"
import axios from 'axios';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react'

import { courseListState } from "../../atoms/courses";
import { user } from "../../atoms/user";
import { useRecoilValue, useRecoilState } from 'recoil';
import { allCourseList } from "../../selectors/courses";
import { loggedInUser } from "../../selectors/user";
import Link from "next/link";


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
    const courses = useRecoilValue(allCourseList);
    const [courseList, setCourseList] = useRecoilState(courseListState);
    const userStatus = useRecoilValue(loggedInUser);
    const [userState, setUserState] = useRecoilState(user);
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen)
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

    const res = await fetch('api/auth/profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await res.json();

    if(data?.status == 'ok' && data?.user){
        const userState = {
            isAuth: true,
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

  useEffect(() => {
    // Fetch data from your API
        getPosts();
        getUser();
        console.log(userState)

  }, []);

  return (
    <div className="bg-white">

    {userState.isAuth ?
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
            <Link href="/auth/signup" className="font-semibold text-black transition-all duration-200 hover:underline">
                Sign Up
            </Link>
            
            </button>
            <button
            type="button"
            className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
            <Link href="/auth/login" className="font-semibold text-black transition-all duration-200 hover:underline">
                Log In
            </Link>
            
            </button>

        </div>
        :<button
        type="button"
        className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        onClick={logout}
        >
            Logout
        </button>
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
                    <Link href="/auth/signup" className="font-semibold text-black transition-all duration-200 hover:underline">
                        Sign Up
                    </Link>
                    </button>
                    </Link>
                    <button
                    type="button"
                    className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                    <Link href="/auth/login" className="">
                        Log In
                    </Link>
                    </button>
                </div>
                :<button
                type="button"
                className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                onClick={logout}
                >
                Log Out
                </button>
            }
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>

    <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
      {courseList.map((course) => (
        <div
          key={course.id}
          className="relative aspect-[16/9]  w-auto rounded-md md:aspect-auto md:h-[400px]"
        >
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.kindpng.com%2Fpicc%2Fm%2F585-5856121_course-hd-png-download.png&f=1&nofb=1&ipt=5050961c92d0fe1131831ab13d7c2c6c7ebb43ee1811ca1c5cce7747858dfbc9&ipo=images"
            alt="AirMax Pro"
            className="z-0 h-full w-full rounded-md object-cover"
          />
          <div className="absolute inset-0 rounded-md bg-gradient-to-t from-gray-900 to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-left">
            <h1 className="text-lg font-semibold text-white">{course.title}</h1>
            <p className="mt-2 text-sm text-gray-300">
              {course.description}
            </p>
            <button className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white">
              Buy Now &rarr;
            </button>
          </div>
        </div>
      ))}
    </div>
    </div>
  )

}

