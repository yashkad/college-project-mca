import ReactCodeMirror from "@uiw/react-codemirror";
import React, { useEffect, useState } from "react";
import { ThemesList } from "../Editor/utils";
import { socket } from "./socket";

const CodeShare = () => {
  const [theme, setTheme] = useState(ThemesList[5]);

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  const [editorText, setEditorText] = useState("// Live code share \n");

  useEffect(() => {
    function onConnect() {
      alert("connected!");

      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function isEdited(value: any) {
      //   alert("is edited");
      //   setFooEvents((previous) => [...previous, value]);
      console.log("edited - value", value);
      setEditorText(value.value);
    }
    function onUsersConnected(value: any) {
      alert("user connected");
      console.log(value);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("is-edited", isEdited);
    socket.on("user-connected", onUsersConnected);

    socket.timeout(1000).emit(
      "join-room",
      {
        userId: socket.id,
        room: "room",
      },
      () => {
        console.log("sent join-room");
      }
    );
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("is-edited", isEdited);
      socket.off("user-connected", onUsersConnected);
      //   socket.disconnect();
    };
  }, []);

  const onChange = React.useCallback((value: any, viewUpdate: any) => {
    console.log("value of textbox changed", value);
    setEditorText(value);

    const data = {
      userId: socket.id,
      room: "room",
      value,
    };
    socket.timeout(1000).emit("edited", data, () => {
      console.log("data sent successfully", editorText);
    });
  }, []);

  return (
    <div className=" w-full h-screen">
      <h2
        onClick={() => {
          const data = {
            userId: socket.id,
            room: "room",
            value: editorText,
          };
          socket.timeout(1000).emit("edited", data, () => {
            console.log("data sent successfully", editorText);
          });
        }}
      >
        Connection : {isConnected ? "YES" : "No"}
      </h2>
      <ReactCodeMirror
        value={editorText}
        height="100%"
        className={`w-full h-full border-r-8 text-xl`}
        onChange={onChange}
        theme={theme.theme}
      />
    </div>
  );
};

export default CodeShare;
