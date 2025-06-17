import {UserRolesEnum} from "@/types/auth-types";

export interface ITask {
    id:string;
    title: string;
    description: string;
    isComplete: boolean;
}
export interface IToDoList {
    id: string;
    name: string;
    ownerEmail: string;
    tasks: ITask[];
    users: {
        user: string;
        role: UserRolesEnum
    }[]
}