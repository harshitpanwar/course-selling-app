import { selector } from "recoil";
import { courseListState } from "../atoms/courses";
import { Course } from '../interfaces/Course'; 

export const allCourseList = selector<Course[]>({
    key: 'filteredCourseState',
    get: ({ get }) => {
      const allCourses = get(courseListState);
      return allCourses;
    },
  });
  