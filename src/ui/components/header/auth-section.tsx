import React from 'react';
import {IoIosLogIn, IoIosLogOut} from "react-icons/io";
import useUserStore from "@/store/userStore";
import {useRouter} from "next/navigation";

type Props = {}

const AuthSection: React.FC<Props> = ({}) => {
    const {user, logout} = useUserStore();
    const router = useRouter();
    const redirectToLogin = () => router.push("/login")
    return (
        user.isAuth ?
            <div className={"flex text-white flex-row justify-between gap-x-4 ml-auto"}>
                <p>{user.username}</p>
                <IoIosLogOut className={"size-8 fill-white "} onClick={() => logout()}/>
            </div>
            :
            <div className={"flex text-white flex-row justify-between gap-x-4 ml-auto"} onClick={redirectToLogin}>
                <p>Увійти</p>
                <IoIosLogIn className={"size-8 fill-white "} />
            </div>

    );
};

export default AuthSection;
