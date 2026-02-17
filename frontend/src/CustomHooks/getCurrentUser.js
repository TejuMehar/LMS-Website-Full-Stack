// src/hooks/useGetCurrentUser.js
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData, setAuthChecked } from "../redux/userSlice";
import { serverUrl } from "../App";

const useGetCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(serverUrl + "/api/user/getcurrentuser", {
          withCredentials: true,
        });

        dispatch(setUserData(result.data));
      } catch (error) {
        dispatch(setUserData(null));
      } finally {
        dispatch(setAuthChecked(true));
      }
    };

    fetchUser();
  }, [dispatch]);
};

export default useGetCurrentUser;
