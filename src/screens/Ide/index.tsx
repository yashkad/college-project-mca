import React, { useState } from "react";
import AceEditor from "react-ace";
import { useLocation } from "react-router-dom";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-kotlin";
import "ace-builds/src-noconflict/mode-clojure";
import "ace-builds/src-noconflict/mode-csharp";
// import "ace-builds/src-noconflict/mode-php";
import "ace-builds/src-noconflict/mode-r";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-rust";
import "ace-builds/src-noconflict/mode-scala";
import "ace-builds/src-noconflict/mode-swift";
import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-elixir";

import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-pastel_on_dark";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-textmate";

// import { submitCodeService, getLanguagesService } from "./Service/service";
import { submitCode } from "./Service/newService";

import { langData, languages, themes } from './utils'
import Sidebar from "../../assets/Sidebar";




const Editor = () => {
    const { state } = useLocation();
    const [themeSelected, setSelectedTheme] = useState(themes[6]);
    const [code, setCode] = useState<string>("");
    const [showLangDrop, setShowLangDrop] = useState<boolean>(false);
    const [editorLang, setEditorLang] = useState<any | null>(null);
    const [userInput, setUserInput] = useState<string>("");
    const [codeOutput, setCodeOutput] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
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
            console.log("output:", output);
            setCodeOutput(output?.stdout);
            if (output?.stdout == null) {
                setCodeOutput(output.status.description);
            } else {
            }
        } else {
            if (editorLang == null) {
                const msg: string = "Please select your language first";
                setCodeOutput(msg);
            } else {
                setCodeOutput(CodeError);
            }
        }
        setLoading(false);
    };

    return (
        <div className="flex">


            <Sidebar active="Run" />
            <div className="flex flex-col w-[94vw] h-screen">
                {state && (
                    <div className=" mt-5 bg-slate-200 rounded">
                        <div className="text-center ">
                            <p className="text-base font-light">You are solving :</p>
                            <h2 className="text-xl font-semibold font-mono">{state.title}</h2>
                        </div>
                    </div>
                )}
                {/* Navbar */}
                <div className="flex flex-auto  bg-gray-900 md:flex md:flex-row p-4 justify-between">
                    <div className="md:flex md:flex-row">
                        <div className="mr-10 mb-4">
                            <select
                                id="countries"
                                onChange={(e) => setSelectedTheme(e.target.value)}
                                className="select select-primary w-full max-w-xs"
                            >
                                {themes.map((theme) => {
                                    return <option value={theme}>{theme}</option>;
                                })}
                            </select>
                        </div>

                        <div>
                            <select
                                className="select mb-3 "
                                onChange={(e) => {
                                    setEditorLang(e.target.value);
                                    console.log(typeof e.target.value);
                                }}
                            >
                                <option disabled selected>
                                    Select Language
                                </option>
                                {langData.map((item) => {
                                    return <option value={item.id}>{item.name}</option>;
                                })}
                            </select>
                        </div>
                    </div>

                    <div
                        className={`${loading ? "loading" : ""} btn btn-wide `}
                        onClick={handleSubmit}
                    >
                        <button className="px-4 mx-3  py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600">Run code</button>
                    </div>
                </div>

                <div className="grid md:grid-cols-2">
                    {/* IDE */}
                    <div className="h-1/2 ">
                        <AceEditor
                            width="100%"
                            height="90vh"
                            placeholder="Enter your code here"
                            mode="java"
                            // mode={`${editorLang}`}
                            theme={themeSelected}
                            name="blah2"
                            //   onLoad={this.onLoad}
                            onChange={(a) => setCode(a)}
                            fontSize={28}
                            showPrintMargin={true}
                            showGutter={true}
                            highlightActiveLine={true}
                            value={code}
                            setOptions={{
                                enableBasicAutocompletion: true,
                                enableLiveAutocompletion: true,
                                enableSnippets: true,
                                showLineNumbers: true,
                                tabSize: 2,
                            }}
                        />
                    </div>

                    {/* <div className="divider divider-horizontal"></div> */}
                    {/* Input and Output Box */}
                    <div className="grid">
                        {/* Input Box */}
                        {/* <div className=" md:hidden">
                            <label htmlFor="message" className="block mb-2 text-sm font-medium ">
                                {"Input"}
                            </label>
                            <textarea
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                id="message"
                                rows={5}
                                className={`resize-none block p-2.5 w-full md:h-1/2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 ${loading ? "cursor-not-allowed" : ""
                                    }`}
                                placeholder="Your Input..."
                                disabled={loading ? true : false}
                            ></textarea>
                        </div> */}

                        {/* <div className="flex flex-col"> */}


                        {/* Output Box */}
                        <div className="">
                            <label htmlFor="message" className="block mb-2  mx-2 text-sm font-medium ">
                                {"Output"}
                            </label>
                            <pre
                                id="message"
                                // rows=""
                                className="overflow-y-scroll block p-2.5 w-full h-[35vh] text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                            // placeholder="Your message..."
                            // disabled
                            // value={codeOutput}
                            >
                                {loading ? (
                                    <div className=" rounded-md p-4 w-full mx-auto">
                                        <div className="animate-pulse flex space-x-4">
                                            <div className="flex-1 space-y-6 py-1">
                                                <div className="h-2 bg-slate-700 rounded"></div>
                                                <div className="space-y-3">
                                                    <div className="grid grid-cols-3 gap-4">
                                                        <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                                                        <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                                                    </div>
                                                    <div className="h-2 bg-slate-700 rounded"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        {" "}
                                        {codeOutput === undefined ? (
                                            <div className="text-xl">
                                                <span className="text-red-700"> Error:</span> Something is
                                                Wrong
                                            </div>
                                        ) : (
                                            codeOutput
                                        )}
                                    </div>
                                )}
                            </pre>
                        </div>

                        {/* Input Box */}
                        <div className="">
                            <label htmlFor="message" className="block mb-2 text-sm font-medium ">
                                {"Input"}
                            </label>
                            <textarea
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                id="message"
                                rows={5}
                                className={`resize-none block p-2.5 w-full md:h-1/2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 ${loading ? "cursor-not-allowed" : ""
                                    }`}
                                placeholder="Your Input..."
                                disabled={loading ? true : false}
                            ></textarea>
                        </div>

                        {/* </div> */}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Editor;
