import { User } from "../interfaces/User";
import users from "../data/userData";

function getAllUsers(query?: string, email?: string, phoneNumber?: string): User[] {
    let filteredUsers = [...users];

    if (query) {

        filteredUsers = filteredUsers.filter((user) =>
            `${user.firstName} ${user.lastName}`.includes(query)
        );
    }

    if (email) {
        filteredUsers = filteredUsers.filter((user) => user.email === email);
    }

    if (phoneNumber) {
        filteredUsers = filteredUsers.filter((user) =>
            user.phoneNumbers.some((number) => number.value === phoneNumber)
        );
    }

    return filteredUsers;
}


function findUserById(userId: string): User | undefined {
    return users.find((user) => user._id === userId);
}

function createUser(newUser: User): User {
    newUser._id = String(users.length + 1);
    users.push(newUser);
    return newUser;
}

function updateUser(userId: string, updatedUser: User): User | undefined {
    const userIndex = users.findIndex((user) => user._id === userId);
    if (userIndex !== -1) {
        updatedUser._id = userId;
        users[userIndex] = updatedUser;
        return updatedUser;
    }
    return undefined;
}

function deleteUser(userId: string): boolean {
    const userIndex = users.findIndex((user) => user._id === userId);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        return true;
    }
    return false;
}


export { getAllUsers, findUserById, createUser, updateUser, deleteUser };
