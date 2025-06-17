import React from 'react';
import {IToDoList, UserRolesEnum} from "@/types";
import Participant from "@/ui/components/to-do-list/participant/participant";

type Props = {
    list: IToDoList

}

const ParticipantsMapper: React.FC<Props> = ({list}) => {
    const participants = list.users
    return (
        <div>
            <h3>Users</h3>
            {
                participants && participants.map(p => <Participant key={p.user} list={list} participant={p}/>)
            }
        </div>
    );
};

export default ParticipantsMapper;
