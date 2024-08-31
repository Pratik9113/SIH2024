import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify';

import { StoreContext } from '../../context/StoreContext'
import './Login.css'
const Login = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState("Login")
    const { setToken } = useContext(StoreContext)
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })


    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = `http://localhost:4000`

        if (currState === 'Login') {
            newUrl += "/api/user/login"
        } else {
            newUrl += "/api/user/register"
        }

        try {
            const response = await axios.post(newUrl, data, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            })

            if (response.data.success) {
                setToken(response.data.message)
                localStorage.setItem("token", response.data.token)
                setShowLogin(false);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            toast.error("User Not Register or wrong credendials")
        }
    }
    return (
        <div>
            <div className="login">
                <form onSubmit={onLogin} className='login-container'>
                    <div className="login-title">
                        <h2>{currState}</h2>
                        <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" className="login-click" />
                    </div>
                    <div className="">
                        <img src={assets.PoliceLoginLogo} alt="Login Illustration" className="login-image" />
                    </div>
                    <div className="login-input">
                        {currState === "Login" ? null : <input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder='enter your name' required />}
                        <input type="text" name="email" onChange={onChangeHandler} value={data.email} placeholder='enter your email' required />
                        <input type="text" name="password" onChange={onChangeHandler} value={data.password} placeholder='enter your password ' required />
                    </div>
                    <button type="submit"> {currState === "SignUp" ? "create an account " : "Login "}</button>
                    {currState === "Login" ?
                        <p>create an account <span className='login-click' onClick={() => setCurrState("SignUp")}>click here</span></p>
                        :
                        <p>already have an account <span className='login-click' onClick={() => setCurrState("Login")}>Login here </span></p>
                    }
                </form>
            </div>
        </div>
    )
}

export default Login



// import React, { useContext, useState } from 'react';
// import { assets } from '../../assets/assets';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { StoreContext } from '../../context/StoreContext';
// import './Login.css';

// const Login = ({ setShowLogin }) => {
//     const [currState, setCurrState] = useState("Login");
//     const { setToken } = useContext(StoreContext);
//     const [data, setData] = useState({
//         name: "",
//         email: "",
//         password: ""
//     });

//     const onChangeHandler = (event) => {
//         const { name, value } = event.target;
//         setData((prevData) => ({ ...prevData, [name]: value }));
//     };

//     const onLogin = async (event) => {
//         event.preventDefault();
//         let newUrl = `http://localhost:4000`;

//         if (currState === 'Login') {
//             newUrl += "/api/user/login";
//         } else {
//             newUrl += "/api/user/register";
//         }

//         try {
//             const response = await axios.post(newUrl, data, {
//                 withCredentials: true,
//                 headers: { "Content-Type": "application/json" },
//             });

//             if (response.data.success) {
//                 setToken(response.data.token);
//                 localStorage.setItem("token", response.data.token);
//                 setShowLogin(false);
//                 toast.success(response.data.message);
//             } else {
//                 toast.error(response.data.message);
//             }
//         } catch (error) {
//             console.error("Login/Register Error:", error);
//             toast.error(error.response?.data?.message || "User Not Registered or wrong credentials");
//         }
//     };

//     return (
//         <div>
//             <div className="login">
//                 <form onSubmit={onLogin} className='login-container'>
//                     <div className="login-title">
//                         <h2>{currState}</h2>
//                         <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" className="login-click" />
//                     </div>
//                     <div className="login-input">
//                         {currState === "Login" ? null : (
//                             <input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder='Enter your name' required />
//                         )}
//                         <input type="email" name="email" onChange={onChangeHandler} value={data.email} placeholder='Enter your email' required />
//                         <input type="password" name="password" onChange={onChangeHandler} value={data.password} placeholder='Enter your password' required />
//                     </div>
//                     <button type="submit"> {currState === "SignUp" ? "Create an account" : "Login"} </button>
//                     {currState === "Login" ? (
//                         <p>Create an account <span className='login-click' onClick={() => setCurrState("SignUp")}>Click here</span></p>
//                     ) : (
//                         <p>Already have an account? <span className='login-click' onClick={() => setCurrState("Login")}>Login here</span></p>
//                     )}
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Login;
