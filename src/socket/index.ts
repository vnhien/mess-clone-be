import { IncomingMessage, Server, ServerResponse } from "http";
import { stringify } from "querystring";
import { Server as SockerIOServer } from "socket.io";

export function initSockerServer(server: Server<typeof IncomingMessage, typeof ServerResponse>) {
  const ioServer = new SockerIOServer(server, {
    path: "/socket",
    cors: {
      origin: "*",
    },
  });

  ioServer.on("connection", (socket) => {
    socket.on("chat", (msg: { content: string; to: string; from: string; roomId: string }) => {
      console.log("🚀 ~ socket.on ~ socket:", socket.rooms);
      // socket.in(msg.roomId).emit("chat", JSON.stringify(msg));
      socket.emit("chat", JSON.stringify(msg));
    });
    socket.on("init-room", (msg: { roomId: string; targetId: string; userId: string }) => {
      console.log("🚀 ~ socket.on ~ msg:", msg);
      socket.join(msg.roomId);
      socket.broadcast.emit("request-joinRoom", JSON.stringify(msg));
      socket.emit(
        "connect-success",
        JSON.stringify({
          success: true,
          roomId: msg.roomId,
        })
      );
    });
    socket.on("room-joined", (msg: { roomId: string; targetId: string; userId: string }) => {
      console.log("🚀 ~ socket.on ~ msg:", msg);
      socket.join(msg.roomId);
      socket.to(msg.roomId).emit(
        "init-connection-status",
        JSON.stringify({
          success: true,
          roomId: msg.roomId,
        })
      );
    });
  });
}
