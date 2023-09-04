// import React, { useContext, useEffect } from "react";
// import { Context } from "../store/appContext";
// import { useNavigate } from "react-router-dom";
// import "../../styles/home.css";

// export const Private = () => {
//   const { store, actions } = useContext(Context);
//   const history = useNavigate();
  
//   useEffect(() => {
    
//     if (!store.token || store.token === "" || store.token === undefined) {
      
//       history("/login");
//     } else {
      
//       actions.getMessage();
//     }
//   }, [store.token, history, actions]);

//   return (
//     <div className="text-center mt-5">
//       <h1>Welcome to the private page</h1>
//       {}
//     </div>
//   );
// };
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Createaccount = () => {
  const Navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      Navigate("/createaccount");
    } else {
      fetch(
        "https://opulent-telegram-rjgwqj9xjpj3x4qp-3001.app.github.dev/api/token",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer" + token,
          },
        }
      )
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => {
          console.log(error)
          Navigate("/createaccount")
        });
    }
  }, []);
  return <div>
    <h1>welcome to the private page</h1>
    </div>;
};