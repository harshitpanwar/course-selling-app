import Link from "next/link";
import { useState, useEffect } from "react";
import { user } from "../../atoms/user";
import {useRecoilState} from 'recoil';
import { userState } from "../../interfaces/User";
import { useRouter } from 'next/router';
import {Dna} from "react-loader-spinner"

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userState, setUserState] = useRecoilState(user);
    const [loading, setLoading] = useState(false);
    // const router = useRouter();

    async function Login() {

        setLoading(true);
        console.log(email,password)

        const res = await fetch('api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,password
            }),
        })
        const data = await res.json()

        if(data?.status == 'ok' && data?.user && data?.token){

            const userState: userState = {
                isAuth: true,
                isAdmin: data?.user?.isAdmin,
                user : data?.user
            }

            console.log(userState);

            setUserState(userState);

          //set message in message tag
            const message: any = document.querySelector('.message');
            message.innerHTML = data?.message;
            setLoading(false);
            window.location.href = '/';

        }

        const message: any = document.querySelector('.message');
        message.innerHTML = data?.message;

        setLoading(false);


    }

    useEffect(() => {


    }, [])


    return (
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">

        {loading && <Dna
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="dna-loading"
                    wrapperStyle={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'  }}
                    wrapperClass="dna-wrapper"
                />}
                
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 ">
            Don&apos;t have an account?{' '}
            <Link 
                href="/signup"
                className="font-semibold text-black transition-all duration-200 hover:underline"
            >
                Create a free account
            </Link>
            </p>
            <form action="#" method="POST" className="mt-8">
            <div className="space-y-5">
                <div>
                <label htmlFor="" className="text-base font-medium text-gray-900">
                    {' '}
                    Email address{' '}
                </label>
                <div className="mt-2">
                    <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    ></input>
                </div>
                </div>
                <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="" className="text-base font-medium text-gray-900">
                    {' '}
                    Password{' '}
                    </label>
                    {/* <a href="#" title="" className="text-sm font-semibold text-black hover:underline">
                    {' '}
                    Forgot password?{' '}
                    </a> */}
                </div>
                <div className="mt-2">
                    <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    ></input>
                </div>
                </div>
                <div>
                <button
                    type="button"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    onClick={Login}
                >
                    Login
                </button>
                </div>
                <p className="message"></p>
            </div>
            </form>
        </div>
        </div>
   
      )
}