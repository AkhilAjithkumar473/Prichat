import express from "express";
import { Server } from "socket.io"
import { createServer } from "http";
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import router from "./router.js";
import { addUser, removeUser, getUser, getUsersInRoom } from "./users.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
const server = createServer(app);
const io = new Server(server);

app.use(cors());
app.use(router);

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

io.on('connection', (socket) => {
    console.log("We have a new connection!");

    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });

        if (error) return callback(error);

        socket.emit('message', { user: 'admin', text: `Welcome ${user.name}, to room ${user.room}!` });
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
        socket.join(user.room);

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message });
        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', { user: "admin", text: `${user.name} has left the room!` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        }
    });
});

app.use(router);

server.listen(PORT, () => console.log(`Server started successfully on port ${PORT}.`));