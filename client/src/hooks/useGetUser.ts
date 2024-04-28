import axios from "axios";
import { useState, useEffect } from "react";

const useGetUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("/login/success");
        setUser(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  return user;
};

export default useGetUser;
