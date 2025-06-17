export enum UserRolesEnum {
    ADMIN="ADMIN",
    GUEST="GUEST",
    VIEWER="VIEWER",
}

export interface IUser {
    id: string;
    email: string;
    username: string
    role: UserRolesEnum;
}
