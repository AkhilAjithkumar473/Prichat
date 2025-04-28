export const addUser = ({ id, name, room }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const doesUserExist = users.find(user => user.name === name && user.room === room);

    if (doesUserExist) {
        return { error: "Username is taken!" };
    } 

    const user = { id, name, room };
    users.push(user);
    
    return { user };
};

export const removeUser = (id) => {
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
};

export const getUser = (id) => users.find(user => user.id === id);

export const getUsersInRoom = (room) => users.filter(user => user.room === room);

const users = [];
