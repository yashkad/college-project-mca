import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { ThemesList } from "./utils/index";
import { useBearStore } from "../../store/useBearStore";
import { dracula } from "@uiw/codemirror-themes-all";

function Editor() {
  const onChange = React.useCallback((value: any, viewUpdate: any) => {}, []);

  const { data, actions } = useBearStore();

  return (
    <div className="flex w-screen h-screen bg-black text-white">
      <h1 className="text-3xl ">
        {data.selectedTheme ? data.selectedTheme : "NO theme selected"}
      </h1>
      <button
        onClick={() => {
          actions.setSelectedTheme(ThemesList[9].theme);
        }}
      >
        change
      </button>
      <CodeMirror
        value="console.log('hello world!');"
        height="100%"
        className="w-full h-full"
        extensions={[javascript({ jsx: true })]}
        onChange={onChange}
        theme={data.selectedTheme ? data.selectedTheme : dracula}
      />
    </div>
  );
}
export default Editor;
