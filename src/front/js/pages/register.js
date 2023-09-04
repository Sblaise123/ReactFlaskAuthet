// import React, { useContext, useState } from "react";
// import { Context } from "../store/appContext";
// import { useNavigate } from "react-router-dom";

// export const Register = () => {
//     const { store, actions } = useContext(Context);
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [recovery_question, setRecoveryquestion] = useState("");
//     const [recovery_answer, setRecoveryanswer] = useState("");
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [errorMessages, setErrorMessages] = useState({});

//     const navigate = useNavigate();

//     const handleSubmit = () => {
//         setIsSubmitting(true);
//         try {
//              actions.register(email, password, recovery_question, recovery_answer);
            
//             navigate("/login"); 
//         } catch (error) {
            
//             console.error("Registration failed:", error);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <form className="form" onSubmit={handleSubmit}>
//             <div>
//                 <div className="signup-form">
//                     <div className="forms">
//                         <label>Email Address</label>
//                         <input
//                             type="email"
//                             value={email}
//                             placeholder="Enter your email"
//                             onChange={(e) => {
//                                 setEmail(e.target.value);
//                                 setErrorMessages((prevErrors) => ({ ...prevErrors, email: "" }));
//                             }}
//                         />
//                         {errorMessages.email && <div className="error-message">{errorMessages.email}</div>}
//                     </div>

//                     <div className="forms">
//                         <label>Password</label>
//                         <input
//                             type="password"
//                             value={password}
//                             placeholder="Enter your password"
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                     </div>

//                     <div className="forms">
//                         <label>Recovery Question</label>
//                         <input
//                             type="text"
//                             value={recovery_question}
//                             placeholder="Enter recovery question"
//                             onChange={(e) => setRecoveryquestion(e.target.value)}
//                         />
//                     </div>

//                     <div className="forms">
//                         <label>Recovery Answer</label>
//                         <input
//                             type="text"
//                             value={recovery_answer}
//                             placeholder="Enter recovery answer"
//                             onChange={(e) => setRecoveryanswer(e.target.value)}
//                         />
//                     </div>
//                 </div>

//                 <div>
//                     <button type="submit" disabled={isSubmitting}>
//                         {isSubmitting ? "Submitting..." : "Submit"}
//                     </button>
//                 </div>
//             </div>
//         </form>
//     );
// };
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const Navigate = useNavigate();
  const createAccount = (e) => {
    e.preventDefault();
    fetch(
      "/api/create_account",
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((Response) => {
        return Response.json();
      })
      .then((result) => {
        if (result.includes('User already exists :(')) {
          setError('User already exists :(');
        } else {
          console.log(result);
          Navigate("/Login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={createAccount} className="container">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">
          Email address
        </label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="youremail@mail.com"
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
        <div id="emailHelp" class="form-text">
          {error}
        </div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">
          Password
        </label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="*******"
          type="password"
          class="form-control"
          id="exampleInputPassword1"
        />
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        <label class="form-check-label" for="exampleCheck1">
          Remember Me
        </label>
      </div>
      <button type="submit" class="btn btn-primary">
        Create Account
      </button>
      <Link to="/Login">
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </Link>
    </form>
  );
};