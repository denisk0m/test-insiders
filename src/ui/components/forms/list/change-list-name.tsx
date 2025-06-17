"use client";
import React, { useState } from 'react';
import useUserStore from "@/store/userStore";
import { updateListName } from "@/firebase/todos"; // <-- You'll need to implement this
import { useModal } from "@/ui/components/modal/ModalProvider";

type Props = {
    listId: string;
    currentName: string;
};

const EditListName: React.FC<Props> = ({ listId, currentName }) => {
    const { hideModal } = useModal();
    const [name, setName] = useState(currentName);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        await updateListName(listId, name.trim());
        hideModal();
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-6 p-4 border rounded shadow space-y-4">
            <h3 className="text-lg font-semibold">Edit List Name</h3>
            <input
                type="text"
                placeholder="New list name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border p-2 rounded"
                required
            />
            <button
                type="submit"
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
                Save Changes
            </button>
        </form>
    );
};

export default EditListName;
