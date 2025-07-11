import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import "./Chat.css";

import InfoBar from "../InfoBar/InfoBar";
import Messages from "../Messages/Messages";
import Input from "../Input/Input";
import TextContainer from '../TextContainer/TextContainer';

let socket;

const Chat = () => {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);

    const ENDPOINT = "https://prichat.onrender.com";
    const location = useLocation();

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        setName(name);
        setRoom(room);
        
        socket = io(ENDPOINT, {transports: ['websocket', 'polling', 'flashsocket']});
        
        socket.emit("join", { name, room }, () => {});

        return () => {
            socket.disconnect();
            socket.off();
        }
    }, [location.search, ENDPOINT]);
    
    useEffect(() => {
        socket.on('message', (message) => {
            setMessages((messages) => [...messages, message]);
        });
    }, []);
    
    useEffect(() => {
        socket.on('roomData', ({ users }) => {
            setUsers(users);
        });
    }, []);
    
    const sendMessage = (e) => {
        e.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => {
                setMessage("");
            });
        }
    };
    console.log(name, message, messages);

    return (
        <div className="outerContainer">
            <div className="user-container">
                <TextContainer users={users} />
            </div>
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    );
};

export default Chat;