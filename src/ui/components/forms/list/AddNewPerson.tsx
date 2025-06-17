"use client";
import React, { useState } from "react";
import { UserRolesEnum } from "@/types"; // Adjust path as needed
import { addOrUpdateParticipantToList } from "@/firebase/todos"; // You must define this function
import { useModal } from "@/ui/components/modal/ModalProvider";
import useListsStore from "@/store/listsStore";
import useUserStore from "@/store/userStore";

type Props = {
    listId: string;
};

const AddUserToListForm: React.FC<Props> = ({ listId }) => {
    const { hideModal } = useModal();
    const { resetLists } = useListsStore();
    const [email, setEmail] = useState("");
    const [role, setRole] = useState<UserRolesEnum>(UserRolesEnum.VIEWER);
    const {user} = useUserStore();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;
        await addOrUpdateParticipantToList(listId, email.trim(), role);
        await resetLists(user.email); // Optionally reload list state
        setEmail("");
        hideModal();
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-sm mx-auto mt-6 p-4 border rounded shadow space-y-4"
        >
            <h3 className="text-lg font-semibold">Add User to List</h3>

            <input
                type="email"
                placeholder="User email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border p-2 rounded"
                required
            />

            <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRolesEnum)}
                className="w-full border p-2 rounded"
            >
                {Object.values(UserRolesEnum).map((role) => (
                    <option key={role} value={role}>
                        {role}
                    </option>
                ))}
            </select>

            <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
                Add User
            </button>
        </form>
    );
};

export default AddUserToListForm;
