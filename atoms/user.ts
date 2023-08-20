import { atom } from "recoil";
import {  userState } from "../interfaces/User";

export const user = atom<userState>({
    key: 'userState',
    default: {
        isAuth: false,
        isAdmin: false,
        user: undefined
    }
});