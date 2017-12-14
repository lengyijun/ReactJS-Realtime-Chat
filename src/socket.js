import io from 'socket.io-client';
const socket = io.connect();
// const socket = io('http://localhost');  //error version

export default socket;
// socket.on('init',)
// socket.on('send:message',)
// socket.on('user:join',)
// socket.on("user:left",)
// socket.on("change:name",)
