"use client"
import React, {useEffect} from 'react';
import List from "@/ui/components/to-do-list/list";
import useListsStore from "@/store/listsStore";
import useUserStore from "@/store/userStore";
import {getListsForUser} from "@/firebase/todos";
import Link from "next/link";
import CreateListButton from "@/ui/pages/to-do-lists/create-list-button";

type Props = {}

const ToDoListsPage: React.FC<Props> = ({}) => {
    const {lists, setupLists} = useListsStore()
    const {user} = useUserStore()
    useEffect(() => {
        const getLists = async () => {
            const lists = await getListsForUser(user.email)
            setupLists(lists)
        }
        getLists()
    }, [user.email]);

    return (
        user.isAuth ?
            <div className={"grid grid-cols-4 gap-x-[3rem] gap-y-5 overflow-x-auto pt-10"}>
                <CreateListButton/>
                {
                    lists.map((list) => <List list={list} key={list.id}/>)
                }
            </div>
            :
            <Link href={"/login"}>Увійдіть</Link>
    );
};


export default ToDoListsPage;
