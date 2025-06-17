"use client"
import React from 'react';
import AuthSection from "@/ui/components/header/auth-section";
import {useRouter} from "next/navigation";

type Props = {}

const Header: React.FC<Props> = ({}) => {
    const router = useRouter();
    const redirectToMainPage = () => router.push('/to-do-lists');
    return (
        <header className={"w-full py-3 bg-stone-600 flex flex-row justify-between px-6"}>
            <p onClick={redirectToMainPage}>TO-DO list</p>
            <AuthSection/>
        </header>
    );
};

export default Header;
