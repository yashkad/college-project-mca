import { io } from "socket.io-client";
const URL = "https://mca-collage-project-backent.vercel.app";
export const socket = io(URL);
