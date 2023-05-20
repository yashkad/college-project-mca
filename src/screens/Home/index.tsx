import { Outlet } from "react-router-dom";
import { useBearStore } from "../../store/useBearStore";
import Sidebar from "../../components/Sidebar";

const Home = () => {
  const { data, actions } = useBearStore();

  return (
    <div className="flex flex-row">
      <Sidebar className="w-1/5" />
      <Outlet />
    </div>
  );
};

export default Home;
