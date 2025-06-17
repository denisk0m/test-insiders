import {
    collection,
    addDoc,
    Timestamp,
    doc,
    updateDoc,
    deleteDoc,
    arrayUnion,
    getDocs,
    query,
    where,
    getDoc,
    writeBatch, // Для атомарних операцій
} from "firebase/firestore";
import {db} from "@/firebase/firebase";
import {IToDoList, UserRolesEnum} from "@/types";

export async function createList(
    listName: string,
    ownerEmail: string
): Promise<string> {
    const listsCollectionRef = collection(db, "lists");
    const docRef = await addDoc(listsCollectionRef, {
        name: listName,
        ownerEmail: ownerEmail,
        createdAt: Timestamp.now(),
        users: [{ user: ownerEmail, role: "ADMIN" }],
    });
    return docRef.id;
}


export async function getListsForUser(userEmail: string): Promise<IToDoList[]> {
    const listsCollectionRef = collection(db, "lists");
    const snapshot = await getDocs(listsCollectionRef);

    const userLists: IToDoList[] = snapshot.docs
        .map((doc) => {
            const data = doc.data();

            // Ensure all required fields are present
            return {
                id: doc.id,
                name: data.name ?? "", // Fallback to empty string if missing
                ownerEmail: data.ownerEmail ?? "",
                tasks: data.tasks ?? [], // assuming array of tasks
                adminIds: data.adminIds ?? [],
                users: data.users ?? [], // only if your IToDoList includes this
            } as IToDoList;
        }).filter((list) => {
                console.log(list.users)
                console.log(userEmail)
                return (
                    list.ownerEmail == userEmail ||
                    list.users.some((u: any) => u.user == userEmail)
                );
            })
        ;
    console.log(userLists)
    return userLists;
}

export async function updateListName(
    listId: string,
    newName: string
): Promise<void> {
    const listRef = doc(db, "lists", listId);
    await updateDoc(listRef, { name: newName });
}


export async function deleteList(listId: string): Promise<void> {
    const listRef = doc(db, "lists", listId);
    const tasksCollectionRef = collection(db, "lists", listId, "task");


    const tasksSnapshot = await getDocs(tasksCollectionRef);
    const batch = writeBatch(db);

    tasksSnapshot.docs.forEach((taskDoc) => {
        batch.delete(taskDoc.ref);
    });

    batch.delete(listRef);
    await batch.commit();
}


export async function createTaskInList(
    listId: string,
    title: string,
    description: string,
): Promise<string> {
    console.log(listId)
    const tasksCollectionRef = collection(db, "lists", listId, "task");
    const docRef = await addDoc(tasksCollectionRef, {
        title,
        description,
        isComplete: false,
    });
    return docRef.id;
}


export async function updateTask(
    listId: string,
    taskId: string,
    updates: { title?: string; description?: string; isComplete?: boolean }
): Promise<void> {
    const taskRef = doc(db, "lists", listId, "task", taskId);
    await updateDoc(taskRef, updates);
}


export async function deleteTask(
    listId: string,
    taskId: string
): Promise<void> {
    const taskRef = doc(db, "lists", listId, "task", taskId);
    await deleteDoc(taskRef);
}


export async function getTasksInList(listId: string): Promise<any[]> {
    const tasksCollectionRef = collection(db, "lists", listId, "task");
    const q = query(tasksCollectionRef);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}


export async function addOrUpdateParticipantToList(
    listId: string,
    participantEmail: string,
    participantRole: UserRolesEnum
): Promise<void> {
    const listRef = doc(db, "lists", listId);
    const listSnap = await getDoc(listRef);

    if (!listSnap.exists()) {
        throw new Error("List not found.");
    }

    const currentUsers = listSnap.data()?.users || [];
    const existingUserIndex = currentUsers.findIndex(
        (u: any) => u.user === participantEmail
    );

    let updatedUsers;
    if (existingUserIndex !== -1) {
        updatedUsers = [...currentUsers];
        updatedUsers[existingUserIndex] = { user: participantEmail, role: participantRole };
    } else {
        updatedUsers = [...currentUsers, { user: participantEmail, role: participantRole }];
    }

    await updateDoc(listRef, { users: updatedUsers });
}


export async function removeParticipantFromList(
    listId: string,
    participantEmail: string
): Promise<void> {
    const listRef = doc(db, "lists", listId);
    const listSnap = await getDoc(listRef);

    if (!listSnap.exists()) {
        throw new Error("List not found.");
    }

    const currentUsers = listSnap.data()?.users || [];
    const updatedUsers = currentUsers.filter(
        (u: any) => u.user !== participantEmail
    );

    await updateDoc(listRef, { users: updatedUsers });
}


