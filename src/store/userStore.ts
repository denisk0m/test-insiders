import {create} from "zustand";
import {IUser, UserRolesEnum} from "@/types";
import {persist} from "zustand/middleware"

interface IUserAuth extends IUser {
    isAuth: boolean;
}

interface UserStore {
    user: IUserAuth
    login: (user: IUser) => void;
    logout: () => void;
}

const initialUser: IUserAuth = {
    isAuth: false,
    id: '-1',
    email: "",
    username: "",
    role: UserRolesEnum.GUEST
}
const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: initialUser,

            login: (userData: IUser) =>
                set(() => ({
                    user: {
                        ...userData,
                        isAuth: true,
                    },
                })),

            logout: () => {
                set(() => ({
                    user: initialUser,
                }))
            }
        }),
        {
            name: "user-storage",
            partialize: (state) => ({ user: state.user }),
        }
    )
);

export default useUserStore;