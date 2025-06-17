import React from 'react';
import CreateNewList from "@/ui/components/forms/list/CreateNewList";
import {LiaPlusSquare} from "react-icons/lia";
import {useModal} from "@/ui/components/modal/ModalProvider";

type Props = {}

const CreateListButton: React.FC<Props> = ({}) => {
    const {showModal} = useModal()
    const createList = () => showModal(<CreateNewList/>)
    return (
        <div className={"col-span-full flex flex-row w-fit gap-3 bg-green-600 rounded-xl px-3 items-center"}
             onClick={createList}>
            <p className={"text-xl"}>Create list</p>
            <LiaPlusSquare className={"size-6"}/>
        </div>
    );
};

export default CreateListButton;
