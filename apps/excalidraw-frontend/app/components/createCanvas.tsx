import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store"; // Import RootState
import { setRooms } from "../slice/roomSlice";


interface ModalDetails {
  setCreateRoom: Dispatch<SetStateAction<boolean>>;
  createRoom: boolean;
}

interface IFormInput {
  name: string;
}

export default function CreateCanvas({
  setCreateRoom,
  createRoom,
}: ModalDetails) {
  const { register, handleSubmit } = useForm<IFormInput>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { rooms } = useSelector((state: RootState) => state.roomList);
  const disptach = useDispatch();

  const addCanvasHandler = async (data: IFormInput) => {

    try {
      const addCanvas = await axios.post(
        `${process.env.NEXT_PUBLIC_HTTP_BACKEND}/room/create`,
        data,
        {
          headers: {
            Authorization: token,
          },
        }
      );
        const newCanvas = [...rooms, addCanvas.data.room]
        localStorage.setItem('roomList', JSON.stringify(newCanvas));
        const newRooms = localStorage.getItem('roomList');
        const parsedRooms = newRooms ? JSON.parse(newRooms) : [];
        disptach(setRooms(parsedRooms))
        setCreateRoom(false)


    } catch (error) {
      const err = (error as Error).message;
      console.log(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(addCanvasHandler)}
      className="border-[1px] shadow-lg flex flex-col justify-around  w-[35%] h-[30%] rounded-lg px-4 bg-white"
      onClick={(e) => e.stopPropagation()}
    >
      <h1 className="font-extrabold text-2xl mt-4">Create New Canvas</h1>

      <div className="flex flex-col">
        <label htmlFor="name" className="font-semibold font-sans mb-2">
          Canvas Name
        </label>
        <input
          {...register("name")}
          name="name"
          type="text"
          placeholder="Enter Canvas Slug..."
          id="name"
          className="border-2 px-4 py-2 rounded-md outline-none shadow-inner border-gray-300 font-md"
        />
      </div>
      <div className="flex justify-between">
        <button
          onClick={() => {
            setCreateRoom(!createRoom);
          }}
          className="bg-gradient-to-r w-[48%] bg-clip-text font-bold from-black to-orange-500 px-5 py-2 rounded-md hover:opacity-90 font-sans mt-3 border-[1px] border-slate-500"
        >
          Cancel
        </button>
        <button className="bg-gradient-to-r w-[48%] from-black to-orange-500 px-5 py-2 font-semibold text-white rounded-md hover:opacity-90 font-sans mt-3">
          Create Canvas
        </button>
      </div>
    </form>
  );
}
