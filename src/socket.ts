'use strict';

import { Server, Socket } from 'socket.io';

export const io = new Server(null,{
  cors: {
    origin: "*",
  }
});

/**
 * When a user connects to a socket.
 */
io.on('connection', (socket: Socket) => {
  console.log(socket);
});

export default io;
