"use client";

import axios from "axios";
import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store"; // Import RootState
import { setRooms } from "../slice/roomSlice";
import Room from "../components/Room";
import Loading from "./loading";

async function getRoomList(token: string) {
  const roomList = await axios.get(
    `${process.env.NEXT_PUBLIC_HTTP_BACKEND}/room/getRoomList`,
    {
      headers: {
        Authorization: token,
      },
    }
  );

  return roomList.data.rooms;
}

export default function CanvasList() {
  const dispatch = useDispatch();

  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    async function getData() {
      if (!token) {
        return;
      }
      const data = await getRoomList(token);
      if (!data) {
        return;
      }
      localStorage.setItem("roomList", JSON.stringify(data));
      dispatch(setRooms(data));
    }
    getData();
  }, [token]);

  return (
    <>
      <Suspense fallback={<Loading/>}>
        <Room />
      </Suspense>
    </>
  );
}
