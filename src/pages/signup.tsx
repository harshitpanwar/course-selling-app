import Link from "next/link"

import { useState, useEffect } from "react";
import { user } from "../../atoms/user";
import {useRecoilState} from 'recoil';
import { userState } from "../../interfaces/User";

export default function Signup() {

    const [name, setName] = useState(''); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setisAdmin] = useState(false);
    const [userState, setUserState] = useRecoilState(user);


    async function signup(){

        const res = await fetch('api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name, email, password, isAdmin
            }),
        })
        const data = await res.json()

        if(data?.status == 'ok' && data?.user && data?.token){

            const userState: userState = {
                isAuth: true,
                isAdmin: data?.user?.isAdmin,
                user : data?.user
            }
            console.log(userState)

            setUserState(userState);
  
        }

        //set message in message tag
        const message: any = document.querySelector('.message');
        message.innerHTML = data?.message;

    }

    useEffect(() => {

        if(userState.isAuth){
            console.log('redirect')
            window.location.href = '/';
        }

    }, [userState])


    return (
       
        <div className="flex items-center justify-center bg-white px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">

            <h2 className="text-2xl font-bold leading-tight text-black">Sign up to create account</h2>
            <p className="mt-2 text-base text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-black transition-all duration-200 hover:underline">
                Sign In
            </Link>
            </p>
            <form action="#" method="POST" className="mt-8">
            <div className="space-y-5">
                <div>
                <label htmlFor="name" className="text-base font-medium text-gray-900">
                    {' '}
                    Full Name{' '}
                </label>    
                <div className="mt-2">
                    <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Full Name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    ></input>
                </div>
                </div>
                <div>
                <label htmlFor="email" className="text-base font-medium text-gray-900">
                    {' '}
                    Email address{' '}
                </label>
                <div className="mt-2">
                    <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    ></input>
                </div>
                </div>
                <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-base font-medium text-gray-900">
                    {' '}
                    Password{' '}
                    </label>
                </div>
                <div className="mt-2">
                    <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    ></input>
                </div>
                </div>
                {/* making a dropdown to select admin or non admin user*/}
                <div>
                <label htmlFor="admin" className="text-base font-medium text-gray-900">
                    {' '}
                    Admin{' '}
                </label>
                <div className="mt-2">
                    <select value={isAdmin.toString()} onChange={(e)=>{setisAdmin(e.target.value==='true')}}>
                        <option value="true">Admin</option>
                        <option defaultChecked value="false">Non-Admin</option>
                    </select>
                </div>

                </div>
                <div>
                <button
                    type="button"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    onClick={signup}
                >
                    Create Account
                </button>
                </div>
                <p className="message"></p>
            </div>
            </form>
        </div>
        </div>
       
      )
}