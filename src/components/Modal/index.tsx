import { useBearStore } from "../../store/useBearStore";

const Modal = () => {
  const { data, actions } = useBearStore();
  console.log(data);
  const Content = data.modalContent;
  if (data.modalShown)
    return (
      <div className="flex absolute w-screen bg-opacity-80 bg-black z-40  h-screen justify-center items-center">
        <Content />
      </div>
    );
  return null;
};

export default Modal;
