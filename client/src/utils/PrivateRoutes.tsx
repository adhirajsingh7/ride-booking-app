import { PropsWithChildren, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetUser from "../hooks/useGetUser";
import axios from "axios";
import LoaderComponent from "../components/Loader";

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  // const user = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/login/success");
        setUser(res.data.user);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        navigate("/login", { replace: true });
        console.log(error);
      }
    };
    getUser();
  }, []);

  // useEffect(() => {
  //   if (user === null) {
  //     navigate("/login", { replace: true });
  //   }
  // }, [navigate, user]);
  {
    /* <LoaderComponent />; */
  }
  // if (loading) return <div>Loading...</div>;

  return !loading && children;
}
