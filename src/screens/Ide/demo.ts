import { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { themes } from "../data/themeData";
import { submitCode } from "../services/compilerService";
import { userContext } from "../context/userContext";

const Editor = () => {
  const { state } = useLocation<{ someData: any }>();
  const [themeSelected, setSelectedTheme] = useState(themes[6]);
  const [code, setCode] = useState<string>("");
  const [showLangDrop, setShowLangDrop] = useState<boolean>(false);
  const [editorLang, setEditorLang] = useState<number | null>(null);
  const [userInput, setUserInput] = useState<string>("");
  const [codeOutput, setCodeOutput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { notifyToast, notifyToastError } = useContext(userContext);
  const CodeError: string = "Write some code inside the editor";

  const handleSubmit = async () => {
    setLoading(true);
    if (code !== "" && editorLang != null) {
      const expectedOutput: string = "11";
      let output = await submitCode(
        code,
        editorLang,
        userInput,
        expectedOutput
      );
      console.log("output", output);
      setCodeOutput(output?.stdout);
      if (output?.stdout == null) {
        setCodeOutput(output.status.description);
        notifyToastError(output.status.description);
      } else {
        notifyToast("Successfully Compiled");
      }
    } else {
      if (editorLang == null) {
        const msg: string = "Please select your language first";
        setCodeOutput(msg);
        notifyToastError(msg);
      } else {
        setCodeOutput(CodeError);
        notifyToastError(CodeError);
      }
    }
    setLoading(false);
  };

  return (
    <>
      {/* JSX code here */}
    </>
  );
};

export default Editor;
