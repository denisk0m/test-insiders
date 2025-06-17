// hooks/useLogin.ts
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { FirebaseError } from "@firebase/app";
import { toast } from "react-toastify";
import { authUser } from "@/firebase/firebase";
import { IUser, UserRolesEnum } from "@/types";
import useUserStore from "@/store/userStore";

export const useLogin = () => {
    const { login } = useUserStore();
    const router = useRouter();

    const handleLogin = async (
        values: { email: string; password: string },
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        try {
            const userCredential = await signInWithEmailAndPassword(
                authUser,
                values.email,
                values.password
            );

            if (userCredential) {
                const email = userCredential.user.email ?? "";
                const userState: IUser = {
                    username: email,
                    email: email,
                    id: email, // Ideally use `userCredential.user.uid`
                    role: UserRolesEnum.VIEWER,
                };

                login(userState);
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

    return { handleLogin };
};
