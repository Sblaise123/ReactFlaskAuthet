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

//     const handleSubmit =() => {
//          actions.register(email, password, recovery_question, recovery_answer);

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

import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [recovery_question, setRecoveryquestion] = useState("");
    const [recovery_answer, setRecoveryanswer] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessages, setErrorMessages] = useState({});

    const navigate = useNavigate();

    const handleSubmit = () => {
        setIsSubmitting(true);
        try {
             actions.register(email, password, recovery_question, recovery_answer);
            
            navigate("/login"); 
        } catch (error) {
            
            console.error("Registration failed:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div>
                <div className="signup-form">
                    <div className="forms">
                        <label>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setErrorMessages((prevErrors) => ({ ...prevErrors, email: "" }));
                            }}
                        />
                        {errorMessages.email && <div className="error-message">{errorMessages.email}</div>}
                    </div>

                    <div className="forms">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="forms">
                        <label>Recovery Question</label>
                        <input
                            type="text"
                            value={recovery_question}
                            placeholder="Enter recovery question"
                            onChange={(e) => setRecoveryquestion(e.target.value)}
                        />
                    </div>

                    <div className="forms">
                        <label>Recovery Answer</label>
                        <input
                            type="text"
                            value={recovery_answer}
                            placeholder="Enter recovery answer"
                            onChange={(e) => setRecoveryanswer(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </div>
        </form>
    );
};
