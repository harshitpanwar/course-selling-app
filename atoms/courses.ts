import { atom } from "recoil";
import { Course } from '../interfaces/Course'; // Make sure to import your Course type

export const courseListState = atom<Course[]>({
  key: 'courseListState',
  default: [],
});
