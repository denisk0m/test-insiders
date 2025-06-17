import React, { useEffect, useState } from 'react';
import { ITask, IToDoList, UserRolesEnum } from "@/types";
import TaskMapper from "@/ui/components/to-do-list/mappers/task-mapper";
import ParticipantsMapper from "@/ui/components/to-do-list/mappers/participants-mapper";
import { MdOutlinePersonAdd } from "react-icons/md";
import { LiaPlusSquare } from "react-icons/lia";
import { GoPencil } from "react-icons/go";
import { ImCross } from "react-icons/im";
import useUserStore from "@/store/userStore";
import { getTasksInList } from "@/firebase/todos";
import {useListHandlers} from "@/ui/components/to-do-list/useListHandlers";

type Props = {
    list: IToDoList;
};

const List: React.FC<Props> = ({ list }) => {
    const { user } = useUserStore();
    const [tasks, setTasks] = useState<ITask[]>([]);

    const isAdmin: boolean = list.users.some(
        (u) => u.role === UserRolesEnum.ADMIN.toString() && u.user === user.email
    );

    const {
        handleAddPerson,
        handleCreateTask,
        handleChangeListName,
        handleDeleteList
    } = useListHandlers(list, user.email);

    useEffect(() => {
        const fetchTasks = async () => {
            const taskData = await getTasksInList(list.id);
            setTasks(taskData);
        };
        fetchTasks();
    }, [list.id]);

    return (
        <div className="bg-stone-400 p-10">
            <div className="flex flex-row mb-8 justify-between px-4 items-center">
                <h2>{list.name}</h2>
                {isAdmin && (
                    <div className="flex flex-row gap-[1rem]">
                        <MdOutlinePersonAdd onClick={handleAddPerson} />
                        <LiaPlusSquare onClick={handleCreateTask} />
                        <GoPencil onClick={handleChangeListName} />
                        <ImCross className="fill-red-500" onClick={handleDeleteList} />
                    </div>
                )}
            </div>
            <TaskMapper tasks={tasks} list={list} />
            <ParticipantsMapper list={list} />
        </div>
    );
};

export default List;
