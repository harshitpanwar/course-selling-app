import React, { useState } from 'react';
import { courseListState } from '../../atoms/courses';
import { useRecoilState } from 'recoil';
import { Course } from '../../interfaces/Course';
import { useEffect } from 'react';
import { loggedInUser } from '../../selectors/user';
import { useRecoilValue } from 'recoil';
import { CldUploadWidget } from 'next-cloudinary';
import {Dna} from "react-loader-spinner"

export default function CreateCourse() {

    const [title , setTitle] = useState('');
    const [description , setDescription] = useState('');
    const [price , setPrice] = useState('');
    const [courseList, setCourseList] = useRecoilState(courseListState);
    const [loading, setLoading] = useState(false);

    const userState = useRecoilValue(loggedInUser);

    async function createCourse() {

        console.log(title,description)

        setLoading(true);

        if(!price || !description || !title){
            alert('Please fill all fields');
            setLoading(false);
            return;
        }


        //create form data

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);

        //append image file
        const file: any = document.querySelector('input[type="file"]');

        console.log("file", file.files[0]);

        formData.append('file', file.files[0]);

        //make api request with cookie
        const res = await fetch('api/createCourse', {
            method: 'POST',
            credentials: 'include',
            body: formData,
        
        });
    
        const data = await res.json();

        if(data?.status == 'ok'){

            setTitle('');
            setDescription('');
            setPrice('');

        }
        //set message in message tag
        const message: Element | null = document.querySelector('.message');
        if(message)
            message.innerHTML = data?.message;
        setLoading(false);
        return;

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
            Create a New Course
            </h2>
            <form method="POST" className="mt-8">
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
                <div className="flex items-center justify-between">
                    <label htmlFor="" className="text-base font-medium text-gray-900">
                    {' '}
                    Price{' '}
                    </label>
                </div>
                <div className="mt-2">
                    <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Price"
                    type='number'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    ></input>
                </div>

                </div>
                <div>
                    <label htmlFor="file" className="text-base font-medium text-gray-900">
                    {' '}
                    Upload Image{' '}
                    </label>
                    <input 
                    type="file" 
                    name="file" 
                    id="file" 
                    className=''/>
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