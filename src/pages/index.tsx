import { useEffect, useState } from "react"
import axios from 'axios';

import { courseListState } from "../../atoms/courses";
import { useRecoilValue, useRecoilState } from 'recoil';
import { allCourseList } from "../../selectors/courses";


export default function Home() {

    const courses = useRecoilValue(allCourseList);
    const [courseList, setCourseList] = useRecoilState(courseListState);

async function getPosts() {
    axios.get('http://localhost:3000/api/courses')
    .then(response => {
      // Assuming your API response contains the course data
      const courses = response.data;
      setCourseList(courses); // Update Recoil state with fetched data
    })
    .catch(error => {
      console.error('Error fetching courses:', error);
    });

}

  useEffect(() => {
    // Fetch data from your API
        getPosts();

  }, []);

  return (
    <div>
      <h1>Course List</h1>
      <ul>
        {courses.length==0?<p>loading...</p>:courseList.map(course => (
          <li key={course.id}>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );

}

