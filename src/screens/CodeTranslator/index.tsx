import React, { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { fontSize, languages, ThemesList } from "./utils/index";
import { useBearStore } from "../../store/useBearStore";
import { dracula } from "@uiw/codemirror-themes-all";
import ThemeDropdown from "./ThemeDropdown";
import { CursorArrowRaysIcon } from "@heroicons/react/20/solid";
import axios from "axios";

function Editor() {
  const onChange = React.useCallback((value: any, viewUpdate: any) => {
    setEditorText(value);
  }, []);

  const [theme, setTheme] = useState(ThemesList[5]);
  const [size, setFontSize] = useState(fontSize[2]);
  const [toLang, setToLang] = useState({ name: null });
  const [currentLang, setCurrentLang] = useState({ name: null });

  const [editorText, setEditorText] = useState("// write your code here \n");
  const [outputText, setOutputText] = useState("// Output : \n");
  const [loading, setLoading] = useState(false);

  const translateLanguage = async () => {
    // alert(1);
    setLoading(true);
    let headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json",
    };
    const bodyContent = JSON.stringify({
      toLang: toLang.name,
      fromLang: "javascript",
      code: editorText,
    });
    let reqOptions = {
      url: "http://localhost:3000/api/translateCode",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };

    let response = await axios.request(reqOptions);
    console.log(response.data);
    setOutputText(response.data.message);
    setLoading(false);
    actions.setCloseModal();
  };

  const { data, actions } = useBearStore();

  // useEffect(() => {
  //   if (!toLang?.name) {
  //     actions.setModal({
  //       content: () => (
  //         <TranslationModalContent
  //           setCurrentLang={setCurrentLang}
  //           setToLang={setToLang}
  //           currentLang={currentLang}
  //           toLang={toLang}
  //         />
  //       ),
  //     });
  //   }
  // }, []);

  useEffect(() => {
    if (loading) {
      actions.setModal({
        content: () => <h1 className="text-white text-2xl">Loading...</h1>,
      });
    }
  }, [loading]);
  return (
    <div className="flex w-screen h-screen flex-col">
      <div className="bg-gradient-to-l from-gray-700 via-gray-900 to-black flex flex-row space-x-2 p-1 px-4 items-center">
        <CursorArrowRaysIcon className="h-8 text-green-400 hover:text-green-600" />
        <div className="flex w-full justify-end flex-row space-x-4 pr-6">
          <ThemeDropdown
            options={languages}
            selectedOption={toLang}
            setOption={setToLang}
            initialValue="Translation language"
          />
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
          value={editorText}
          height="100%"
          className={`w-full h-full border-r-8 ${size.tw}`}
          extensions={[javascript({ jsx: true })]}
          onChange={onChange}
          theme={theme.theme}
        />
        <CodeMirror
          value={`${outputText}`}
          height="100%"
          className={`w-2/3 text-base ${size.tw}`}
          extensions={[javascript({ jsx: true })]}
          onChange={onChange}
          // theme={ThemesList[0].theme}
          readOnly={true}
          editable={false}
        />
      </div>

      {toLang?.name && (
        <div className=" absolute bottom-5 right-5">
          <button
            onClick={translateLanguage}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white  focus:ring-2 focus:outline-none focus:ring-blue-300 "
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
              Translate code
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
export default Editor;

const TranslationModalContent = ({
  currentLang,
  toLang,
  setCurrentLang,
  setToLang,
}: any) => {
  const { actions } = useBearStore();
  return (
    <div className=" rounded-2xl bg-white p-6 z-50">
      <div className="font-mono text-xl">Select translation language</div>
      <div className="">
        <ThemeDropdown
          options={languages}
          selectedOption={currentLang}
          setOption={setCurrentLang}
          className=""
        />
        <ThemeDropdown
          options={languages}
          selectedOption={toLang}
          setOption={setToLang}
          className=""
          onChange={(e) => console.log(e)}
        />
      </div>
      {JSON.stringify(toLang)}
      <div
        onClick={() => {
          actions.setCloseModal();
        }}
        className="border-4 cursor-pointer  rounded-full  text-center items-center flex justify-center mt-4 py-2"
      >
        Close
      </div>
    </div>
  );
};
