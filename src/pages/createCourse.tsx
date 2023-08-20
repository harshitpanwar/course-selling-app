import React, { useState } from 'react';
import { courseListState } from '../../atoms/courses';
import { useRecoilState } from 'recoil';
import { Course } from '../../interfaces/Course';
import { useEffect } from 'react';
import { loggedInUser } from '../../selectors/user';
import { useRecoilValue } from 'recoil';

export default function CreateCourse() {

    const [title , setTitle] = useState('');
    const [description , setDescription] = useState('');
    const [courseList, setCourseList] = useRecoilState(courseListState);
    const userState = useRecoilValue(loggedInUser);

    async function createCourse() {

        console.log(title,description)

        //make api request with cookie
        const res = await fetch('api/courses', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                
            },
            body: JSON.stringify({
                title, description
            })
        });
    
    
        const data = await res.json();

        if(data?.status == 'ok'){

            setTitle('');
            setDescription('');
        }
        //set message in message tag
        const message: Element | null = document.querySelector('.message');
        if(message)
            message.innerHTML = data?.message;
        

    }

    useEffect(() => {

        if(!userState.isAuth){
            console.log('redirect')

            alert('You need to sign in as admin to create a course');

            window.location.href = '/login';
        }

    }, [])


    return (

        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Create a New Course
            </h2>
            <form action="#" method="POST" className="mt-8">
            <div className="space-y-5">
                <div>
                <label htmlFor="" className="text-base font-medium text-gray-900">
                    {' '}
                    Course Title{' '}
                </label>
                <div className="mt-2">
                    <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    ></input>
                </div>
                </div>
                <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="" className="text-base font-medium text-gray-900">
                    {' '}
                    Description{' '}
                    </label>
                </div>
                <div className="mt-2">
                    <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    ></input>
                </div>
                </div>
                <div>
                <button
                    type="button"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    onClick={createCourse}
                >
                    Create Course
                </button>
                </div>
                <p className="message"></p>
            </div>
            </form>
        </div>
        </div>

      )

}