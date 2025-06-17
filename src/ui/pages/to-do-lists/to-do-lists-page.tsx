"use client"
import React, {useEffect} from 'react';
import List from "@/ui/components/to-do-list/list";
import useListsStore from "@/store/listsStore";
import useUserStore from "@/store/userStore";
import {LiaPlusSquare} from "react-icons/lia";
import {getListsForUser} from "@/firebase/todos";
import {useModal} from "@/ui/components/modal/ModalProvider";
import CreateNewList from "@/ui/components/forms/list/CreateNewList";
import Link from "next/link";

type Props = {}

const ToDoListsPage: React.FC<Props> = ({}) => {
    const {lists,setupLists} = useListsStore()
    const {user} = useUserStore()
    useEffect(() => {
        const  getLists =  async () => {
            const lists = await getListsForUser(user.email)
            setupLists(lists)
        }
        getLists()
    }, [user.email]);
    const {showModal} = useModal()
    return (
        user.isAuth ?
        <div className={"grid grid-cols-4 gap-x-[3rem] gap-y-5 overflow-x-auto pt-20"}>
            <div className={"col-span-full flex flex-row w-fit items-center"} onClick={() => showModal(<CreateNewList/>)}>
                <p>Створити список</p>
                <LiaPlusSquare />
            </div>
            {
                lists.map((list) => <List list={list} key={list.id}/>)
            }
        </div>
            :
            <Link href={"/login"}>Увійдіть</Link>
    );
};


export default ToDoListsPage;
