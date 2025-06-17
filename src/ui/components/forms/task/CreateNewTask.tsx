"use client";
import React, {useState} from 'react';
import useUserStore from "@/store/userStore";
import {createTaskInList} from "@/firebase/todos"; // You'll need to define this
import {useModal} from "@/ui/components/modal/ModalProvider";

type Props = {
    listId: string;
};

const CreateNewTask: React.FC<Props> = ({listId}) => {
    const {user} = useUserStore();
    const {hideModal} = useModal();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        await createTaskInList(
            listId,
            title.trim(),
            description.trim(),
        );

        setTitle("");
        setDescription("");
        hideModal();
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-6 p-4 border rounded shadow space-y-4">
            <h3 className="text-lg font-semibold">Create New Task</h3>
            <input
                type="text"
                placeholder="Task name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border p-2 rounded"
                required
            />
            <textarea
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border p-2 rounded resize-none"
                rows={4}
            />
            <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
                Create Task
            </button>
        </form>
    );
};

export default CreateNewTask;
