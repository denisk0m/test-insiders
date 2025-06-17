import { useModal } from "@/ui/components/modal/ModalProvider";
import ConfirmInModal from "@/ui/components/modal/ConfirmInModal";
import { removeParticipantFromList } from "@/firebase/todos";
import { IToDoList } from "@/types";

export const useParticipantHandlers = (list: IToDoList) => {
    const { showModal } = useModal();

    const handleDelete = (participantEmail: string) => {
        showModal(
            <ConfirmInModal
                actionToConfirm={`Are you sure you want to remove ${participantEmail} from the list?`}
                onConfirm={async () => await removeParticipantFromList(list.id, participantEmail)}
            />
        );
    };

    return {
        handleDelete,
    };
};
