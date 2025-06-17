import React from 'react';
import {ITask, IToDoList} from "@/types";
import Task from "@/ui/components/to-do-list/task/task";
import {useModal} from "@/ui/components/modal/ModalProvider";
import CreateNewTask from "@/ui/components/forms/task/CreateNewTask";

type Props = {
    tasks: ITask[];
    list: IToDoList
}

const TaskMapper: React.FC<Props> = ({list, tasks}) => {
    const {showModal} = useModal()
    const createTask = () => showModal(<CreateNewTask listId={list.id}/>)

    return (
        <div>
            <h3 className={"font-bold"}>Tasks</h3>
            {
                tasks.length ? tasks.map(task => (<Task key={task.id} list={list} task={task}/>))
                    :
                    <p>There is no tasks right now, but u can create<span className={"text-blue-600 cursor-pointer"} onClick={createTask}> the one</span>
                    </p>
            }
        </div>

    )
        ;
};

export default TaskMapper;
