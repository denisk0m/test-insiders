import React from "react";
import { ImCross } from "react-icons/im";
import { IToDoList, UserRolesEnum } from "@/types";
import useUserStore from "@/store/userStore";
import {useParticipantHandlers} from "@/ui/components/to-do-list/participant/useParticipantHandlers";
import DeleteParticipantButton from "@/ui/components/to-do-list/participant/DeleteParticipantButton";

type Props = {
    list: IToDoList;
    participant: {
        user: string;
        role: UserRolesEnum;
    };
};

const Participant: React.FC<Props> = (props) => {
    const {participant} = props;
    return (
        <div className="flex flex-row mx-2 items-center justify-between p-4 border rounded-lg bg-white shadow-sm">
            <div className="flex flex-col">
                <span className="font-semibold text-gray-800">{participant.user}</span>
                <span className="text-sm text-gray-500">{participant.role}</span>
            </div>
            <DeleteParticipantButton {...props} />
        </div>
    );
};

export default Participant;
