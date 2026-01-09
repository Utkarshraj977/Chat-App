import {io} from 'socket.io-client'

export function connectWS(){
    return io('https://chat-app-fm5j.onrender.com');
}