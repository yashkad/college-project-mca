import Sidebar from "../../assets/Sidebar";
import { useBearStore } from "../../store/useBearStore";

const Home = () => {
  const { data, actions } = useBearStore();

  return (
    // <div className="w-screen h-screen flex flex-col bg-slate-400 text-white justify-center items-center">
    //   {/* <h1 className="text-6xl font-mono">{data.count}</h1>
    //   <button className="border p-2 rounded-xl" onClick={() => actions.inc()}>
    //     Increment
    //   </button> */}
    // </div>
    <div>
      {/* <Sidebar /> */}
    </div>
  );
};

export default Home;
