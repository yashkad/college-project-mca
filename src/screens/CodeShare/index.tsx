import ReactCodeMirror from "@uiw/react-codemirror";
import React, { useEffect, useState } from "react";
import { ThemesList } from "../CodeTranslator/utils";
import { socket } from "./socket";
import { toast } from "react-toastify";

const CodeShare = () => {
  const [theme, setTheme] = useState(ThemesList[5]);

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  const [editorText, setEditorText] = useState("// Live code share \n");

  useEffect(() => {
    function onConnect() {
      toast("Connected!");

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
      toast("user connected");
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

  const handleCopyUrl = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);
    console.log("URL copied to clipboard:", currentUrl);
    toast("url copied to clipboard");
  };
  return (
    <div className=" w-full h-screen">
      {/* <h2
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
      </h2> */}
      <ReactCodeMirror
        value={editorText}
        height="100%"
        className={`w-full h-full border-r-8 text-xl`}
        onChange={onChange}
        theme={theme.theme}
      />

      <button
        type="button"
        className="absolute bottom-5 right-5 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        onClick={handleCopyUrl}
      >
        Share Link
      </button>
    </div>
  );
};

export default CodeShare;
