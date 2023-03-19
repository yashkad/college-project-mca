import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { fontSize, ThemesList } from "./utils/index";
import { useBearStore } from "../../store/useBearStore";
import { dracula } from "@uiw/codemirror-themes-all";
import ThemeDropdown from "./ThemeDropdown";
import { CursorArrowRaysIcon } from "@heroicons/react/20/solid";

function Editor() {
  const onChange = React.useCallback((value: any, viewUpdate: any) => {}, []);

  const [theme, setTheme] = useState(ThemesList[5]);
  const [size, setFontSize] = useState(fontSize[0]);
  const test = async () => {
    const a = await fetch("http://localhost:3000/");
    console.log(a);
  };
  return (
    <div className="flex w-screen h-screen flex-col">
      <div className="bg-gradient-to-l from-gray-700 via-gray-900 to-black flex flex-row space-x-2 p-1 px-4 items-center">
        <CursorArrowRaysIcon
          onClick={test}
          className="h-8 text-green-400 hover:text-green-600"
        />
        <div className="flex w-full justify-end flex-row space-x-4 pr-6">
          <ThemeDropdown
            options={ThemesList}
            selectedOption={theme}
            setOption={setTheme}
          />
          <ThemeDropdown
            options={fontSize}
            selectedOption={size}
            setOption={setFontSize}
          />
        </div>
      </div>
      <div className="flex flex-1 flex-row">
        <CodeMirror
          value="console.log('hello world!');"
          height="100%"
          className={`w-full h-full border-r-8 ${size.tw}`}
          extensions={[javascript({ jsx: true })]}
          onChange={onChange}
          theme={theme.theme}
        />
        <CodeMirror
          value={`\n\n    predictProba :: [String] -> IO [Double]\n    predictProba xs = do\n        let xs' = map (\\x -> [x]) xs\n        let xs'' = map (\\x -> map (`}
          height="100%"
          className={`w-2/3 text-base ${size.tw}`}
          extensions={[javascript({ jsx: true })]}
          onChange={onChange}
          // theme={ThemesList[0].theme}
          readOnly={true}
          editable={false}
        />
      </div>
    </div>
  );
}
export default Editor;
