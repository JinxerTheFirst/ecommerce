import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
Navigate;
export default function ProtectedRoute(props) {
  if (localStorage.getItem("userToken") !== null) {
    return props.children;
  } else {
    return <Navigate to={"/login"} />;
  }
  const [first, setfirst] = useState();
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <div>
        <h1>ProtectedRoute Name</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia aliquid
          harum fugit sequi placeat ad provident. Non vel eos perferendis
          perspiciatis animi, nisi commodi doloribus fuga nulla sit voluptatem
          sunt.
        </p>
      </div>
    </>
  );
}
