// hooks/useRegister.ts
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { FirebaseError } from "@firebase/app";
import { toast } from "react-toastify";
import { authUser } from "@/firebase/firebase";
import { IUser, UserRolesEnum } from "@/types";
import useUserStore from "@/store/userStore";
import {createUserInDatabase} from "@/firebase/users";

export const useRegister = () => {
    const { login } = useUserStore();
    const router = useRouter();

    const handleRegister = async (
        values: { email: string; password: string },
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        try {
            setSubmitting(true);
            const userCredential = await createUserWithEmailAndPassword(
                authUser,
                values.email,
                values.password
            );

            if (userCredential) {
                const userState: IUser = {
                    username: values.email,
                    email: values.email,
                    id: userCredential.user.uid,
                    role: UserRolesEnum.VIEWER,
                };

                login(userState);
                const {role, ...userWithoutRole} = userState;
                await createUserInDatabase(userWithoutRole);
                router.push("/to-do-lists");
            }
        } catch (e) {
            if (e instanceof FirebaseError) {
                console.error("Firebase error code:", e.code);
                toast.error(e.message);
            } else {
                console.error("Unknown error", e);
                toast.error("An unknown error occurred.");
            }
        } finally {
            setSubmitting(false);
        }
    };

    return { handleRegister };
};
