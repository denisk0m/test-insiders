"use client";
import React, { useState } from 'react';
import useUserStore from "@/store/userStore";
import {createList} from "@/firebase/todos";
import {useModal} from "@/ui/components/modal/ModalProvider";
import useListsStore from "@/store/listsStore";

type Props = {
};

const CreateNewList: React.FC<Props> = ({ }) => {
    const { user } = useUserStore();
    const { resetLists } = useListsStore();
    const {hideModal} = useModal();
    const [name, setName] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        await createList(name.trim(), user.email);
        await resetLists(user.email);
        setName(""); // Очистити поле
        hideModal();
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-6 p-4 border rounded shadow space-y-4">
            <h3 className="text-lg font-semibold">Create New List</h3>
            <input
                type="text"
                placeholder="List name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border p-2 rounded"
                required
            />
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Create
            </button>
        </form>
    );
};

export default CreateNewList;
