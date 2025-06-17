import { useModal } from "@/ui/components/modal/ModalProvider";
import { deleteList } from "@/firebase/todos";
import ChangeListName from "@/ui/components/forms/list/change-list-name";
import AddNewPerson from "@/ui/components/forms/list/add-new-person";
import CreateNewTask from "@/ui/components/forms/task/CreateNewTask";
import ConfirmInModal from "@/ui/components/modal/ConfirmInModal";
import useListsStore from "@/store/listsStore";
import { IToDoList } from "@/types";

export const useListHandlers = (list: IToDoList, userEmail: string) => {
    const { showModal } = useModal();
    const { resetLists } = useListsStore();

    const handleDeleteList = () => {
        showModal(
            <ConfirmInModal
                actionToConfirm={`Are you sure you want to delete "${list.name}"?`}
                onConfirm={async () => {
                    await resetLists(userEmail);
                    await deleteList(list.id);
                }}
            />
        );
    };

    const handleChangeListName = () => {
        showModal(<ChangeListName listId={list.id} currentName={list.name} />);
        resetLists(userEmail);
    };

    const handleAddPerson = () => {
        showModal(<AddNewPerson listId={list.id} />);
        resetLists(userEmail);
    };

    const handleCreateTask = () => {
        showModal(<CreateNewTask listId={list.id} />);
    };

    return {
        handleDeleteList,
        handleChangeListName,
        handleAddPerson,
        handleCreateTask,
    };
};