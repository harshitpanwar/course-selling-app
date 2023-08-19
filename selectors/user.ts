import { selector } from "recoil";
import { user } from "../atoms/user";
import { userState } from '../interfaces/User';

export const loggedInUser = selector<userState>({
    key: 'loggedInUser',
    get: ({ get }) => {
        const userState = get(user);
        return userState;
    }
});