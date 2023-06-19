import axios from "axios";

// const url = `https://mca-collage-project-backent.vercel.app`;
const url = "http://localhost:3000";

const getLangId = async (): Promise<any> => {
  return await axios
    .get(`${url}/judge/getAllLanguages`)
    .then((res) => {
      return res.data;
    })
    .catch((e) => console.log(e));
};

interface SubmitCodeData {
  code: any;
  langId: any;
  stdin: any;
  expected_output?: string;
  headers: any;
  withCredentials: any;
}

const submitCode = async (
  code: any,
  langId: any,
  stdin: any,
  expectedOutput = ""
): Promise<any> => {
  console.log(code, langId, stdin, expectedOutput);
  const data: SubmitCodeData = {
    code: code,
    langId: langId,
    stdin: stdin,
    expected_output: expectedOutput,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  // console.log("data:",data);
  const result = await axios
    .post(`${url}/judge/submitCode`, data)
    .then((res) => {
      res.data;
      return res.data;
      // console.log("Response Frontend",res.data)
    })
    .catch((e) => console.error(e));
  // console.log("Result in newServices",result);
  return result;
};

export { getLangId, submitCode };
