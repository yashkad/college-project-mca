import ReactCodeMirror from "@uiw/react-codemirror";
import { useEffect, useState } from "react";
import { ThemesList } from "../CodeTranslator/utils";
import { useBearStore } from "../../store/useBearStore";
import { javascript } from "@codemirror/lang-javascript";
import axios from "axios";

const CodeExplain = () => {
  const [editorText, setEditorText] = useState("");
  const [theme, setTheme] = useState(ThemesList[5]);
  const [loading, setLoading] = useState(false);
  const { data, actions } = useBearStore();

  const onChange = (e: string) => {
    setEditorText(e);
  };

  //   const handleSubmit = () => {};

  const handleSubmit = async () => {
    // alert(1);
    console.log(editorText);
    setLoading(true);
    let headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json",
    };
    const bodyContent = JSON.stringify({
      code: editorText,
    });
    let reqOptions = {
      // url: "https://mca-collage-project-backent.vercel.app/api/translateCode",
      url: "http://localhost:3000/api/explainCode",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };

    let response = await axios.request(reqOptions);
    console.log(response.data);
    // setEditorText(response.data.message);
    setLoading(false);
    // actions.setCloseModal();
    actions.setModal({
      content: () => (
        <ModalContent text={response.data.message} actions={actions} />
      ),
    });
  };

  useEffect(() => {
    if (loading) {
      actions.setModal({
        content: () => <h1 className="text-white text-2xl">Loading...</h1>,
      });
    }
  }, [loading]);
  return (
    <div className="h-screen w-full">
      <ReactCodeMirror
        value={editorText}
        height="100%"
        className={`w-full h-full border-r-8 text-xl`}
        onChange={onChange}
        theme={theme.theme}
        extensions={[javascript({ jsx: true })]}
        indentWithTab={true}
        placeholder={"Enter your code..."}
      />

      <button
        type="button"
        className="absolute bottom-5 right-5 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        onClick={handleSubmit}
      >
        Explain code
      </button>
    </div>
  );
};

export default CodeExplain;

const ModalContent = ({ text, actions }: any) => {
  return (
    <div className="  relative font-mono text-lg bg-white pt-12 p-6 rounded-3xl text-gray-700 border border-gray-500 shadow-2xl">
      <p
        className="absolute top-2 right-2 cursor-pointer hover:bg-slate-400 hover:rounded-full w-10 h-10 flex justify-center items-center"
        onClick={() => {
          actions.setCloseModal();
        }}
      >
        X
      </p>
      <p className=" w-full h-full">{text}</p>
    </div>
  );
};
