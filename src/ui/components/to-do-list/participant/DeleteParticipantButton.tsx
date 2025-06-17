import React from 'react';
import {ImCross} from "react-icons/im";
import useUserStore from "@/store/userStore";
import {useParticipantHandlers} from "@/ui/components/to-do-list/participant/useParticipantHandlers";
import {IToDoList, UserRolesEnum} from "@/types";

type Props = {
    list: IToDoList;
    participant: {
        user: string;
        role: UserRolesEnum;
    };
};

const DeleteParticipantButton: React.FC<Props> = ({participant,list}) => {
    const { user } = useUserStore();
    const { handleDelete } = useParticipantHandlers(list);
    const isAdmin = list.ownerEmail === user.id;
    return (
      isAdmin && (
          <button onClick={() => handleDelete(participant.user)} className="ml-4">
              <ImCross className="fill-red-500 hover:scale-110 transition" />
          </button>
      )
  );
};

export default DeleteParticipantButton;
