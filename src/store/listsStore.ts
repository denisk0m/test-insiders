import {create} from "zustand";
import {ITask, IToDoList} from "@/types";
import {getListsForUser} from "@/firebase/todos";


interface ListsStore {
    lists: IToDoList[]
    renameList: (listId: string, name: string) => void
    deleteList: (listId: string) => void
    setupLists: (lists: IToDoList[]) => void
    createList: (list: IToDoList) => void,
    resetLists: (userEmail: string) => Promise<void>
}

const useListsStore = create<ListsStore>((set) => ({
    lists: [],
    setupLists: (lists) =>
        set((state) => ({lists: lists})),
    renameList: (listId, name) =>
        set((state) => {
            const updatedLists = state.lists.map((list) =>
                list.id === listId ? {...list, name} : list
            );
            return {lists: updatedLists};
        }),

    deleteList: (listId) =>
        set((state) => {
            const updatedLists = state.lists.filter((list) => list.id !== listId);
            return {lists: updatedLists};
        }),
    createList: (list) =>
        set((state) => {
            return {lists: [...state.lists, list]};
        }),
    resetLists: async (userEmail: string) => {
        const lists = await getListsForUser(userEmail);
        set({ lists });
    },
}));

export default useListsStore;