import { updateTask, deleteTask } from "@/firebase/todos";
import { useModal } from "@/ui/components/modal/ModalProvider";
import ConfirmInModal from "@/ui/components/modal/ConfirmInModal";
import ChangeTask from "@/ui/components/forms/task/ChangeTask";
import { ITask, IToDoList } from "@/types";

export const useTaskHandlers = (list: IToDoList, task: ITask) => {
    const { showModal } = useModal();

    const handleChangeStatus = async (isDone: boolean, setIsDone: (v: boolean) => void) => {
        setIsDone(!isDone);
        await updateTask(list.id, task.id, {
            ...task,
            isComplete: !task.isComplete,
        });
    };

    const handleDelete = async () => {
        showModal(
            <ConfirmInModal
                actionToConfirm={`Are you sure to delete task ${task.title}?`}
        onConfirm={async () => await deleteTask(list.id, task.id)}
        />
    );
    };

    const handleChangeTask = async () => {
        showModal(<ChangeTask listId={list.id} initialTask={task} />);
    };

    return {
        handleChangeStatus,
        handleDelete,
        handleChangeTask,
    };
};
