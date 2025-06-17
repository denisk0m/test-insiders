// firebase/users.ts
import { doc, setDoc } from "firebase/firestore";
import { IUser } from "@/types";
import { db } from "@/firebase/firebase";


export const createUserInDatabase = async (user: Omit<IUser, "role">) => {
    try {
        const userRef = doc(db, "users", user.id);
        await setDoc(userRef, {
            ...user,
            createdAt: new Date().toISOString(), // Optional: add timestamp
        });
    } catch (error) {
        console.error("Failed to create user in Firestore:", error);
        throw error;
    }
};
