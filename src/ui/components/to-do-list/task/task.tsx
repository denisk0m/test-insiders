import React, {useState} from 'react';
import {ITask, IToDoList, UserRolesEnum} from "@/types";
import {ImCross} from "react-icons/im";
import {deleteTask, updateTask} from "@/firebase/todos";
import {GoPencil} from "react-icons/go";
import useUserStore from "@/store/userStore";
import {useModal} from "@/ui/components/modal/ModalProvider";
import ConfirmInModal from "@/ui/components/modal/ConfirmInModal";
import CheckBox from "@/ui/components/default/check-box";
import ChangeTask from "@/ui/components/forms/task/ChangeTask";
import {useTaskHandlers} from "@/ui/components/to-do-list/task/useTaskHandlers";

type Props = {
    list: IToDoList;
    task: ITask
}



const Task: React.FC<Props> = ({ task, list }) => {
    const { user } = useUserStore();
    const isAdmin: boolean = list.users.some(
        (u) => u.role === UserRolesEnum.ADMIN.toString() && u.user === user.email
    );
    const [isDone, setIsDone] = useState<boolean>(task.isComplete);

    const { handleChangeStatus, handleDelete, handleChangeTask } = useTaskHandlers(list, task);

    return (
        <div className={"flex flex-row mx-2"}>
            <div
                className={`p-4 border rounded-lg w-full shadow-sm transition ${
                    isDone ? "bg-green-50 border-green-300" : "bg-white"
                }`}
                onClick={() => handleChangeStatus(isDone, setIsDone)}
            >
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                    </div>
                    <CheckBox isSelected={isDone} />
                </div>
            </div>
            {isAdmin && (
                <aside className={"flex flex-col bg-white px-3 justify-center border rounded-lg gap-[1rem]"}>
                    <GoPencil onClick={handleChangeTask} />
                    <ImCross className={"fill-red-500"} onClick={handleDelete} />
                </aside>
            )}
        </div>
    );
};

export default Task;
