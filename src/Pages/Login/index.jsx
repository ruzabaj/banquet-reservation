import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import "../../Assets/Styles/Login/login.scss";
import { Form, useNavigate } from 'react-router-dom';
import Forms from './Form';
import axios from 'axios';

const Login = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [isClicked, setIsCLicked] = useState(false);
    const [token, setToken] = useState("");

    const navigate = useNavigate();

    let baseURL = process.env.REACT_APP_BASE_URL;

    const onSubmit = data => {
        axios.post(`${baseURL}/login`, data)
            .then((response) => {
                // console.log(response.data.token, "res")
                setToken(response.data.token)

            })
            .catch((error) => {
                // console.log(error.data, "err")
            })
        // navigate("/started")
    }

    const iconCLicked = () => {
        setIsCLicked(!isClicked)
    }

    console.log("token", token);

    useEffect(() => {
        if (token) {
            localStorage.setItem("tokens", token)
            navigate("/started")
        }
    }, [token])

    return (
        <div className='login-page'>
            <div className='right-side'>
                {/* <div className='comapny-name'>
                    <img src='./alice.jpg' className='alice-logo' />
                    <h4>Alice Reception</h4>
                </div>
                <div className='right-side-contents'>
                    <h2>Welcome</h2>
                    <small>You are one step away from <i>signing in</i>.</small>
                    <p><b>Sign in</b> to make reservations and many more</p>
                </div> */}
                <div className='bg-image'>
                    <img src='./alice_bg.jpg' alt='background-alice' />
                    <div className='right-side-contents'>
                        <h2>Welcome </h2>
                        {/* <img src='./welcome.jpg' alt='namaste' className='welcome'/> */}
                        {/* <p>Sign in to continue</p> */}
                    </div>
                    {/* <div className='comapny-name'>
                        <img src='./alice.jpg' className='alice-logo' />
                        <h4>Alice Reception</h4>
                    </div> */}
                </div>
            </div>
            <div className='left-side'>
                <div className='comapny-name'>
                    <img src='./alice.jpg' className='alice-logo' />
                    {/* <h4>Alice Reception</h4> */}
                </div>
                {/* <div className='left-title'>
                    <h3>Sign In</h3>
                </div> */}
                <Forms
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    register={register}
                    errors={errors}
                    iconCLicked={iconCLicked}
                    isClicked={isClicked}
                />
            </div>

        </div>
    )
}

export default Login