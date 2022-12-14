import React, { useState } from 'react'
import style from './Form.module.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { Spin } from 'antd';

const Form = () => {
    const navigate = useNavigate('')

    const [value, setValue] = useState({
        username: "",
        password: ""
    })

    const [userNameError, setuserNameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [loading, setLoading] = useState(false)

    const fetchingToken = async () => {
        const token = await axios.get("https://api.themoviedb.org/3/authentication/token/new?api_key=36f92e051d1f7b92dd147302b1b51f81")
        localStorage.setItem('token', token.data.request_token);
    }

    const onValueChangeHandeler = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }


    const LoginHandeler = async () => {
        setLoading(true)

        setTimeout(async () => {
            const { username, password } = value

            if (username.trim() === "" && password.trim() === "") {
                toast.error("Enter your credintals")
                setLoading(false)
            }
            else if (username.trim() === "") {
                toast.error("Enter your username")
                setLoading(false)
            }
            else if (password.trim() === "") {
                toast.error("Enter your password")
                setLoading(false)
            }
            else if (username.trim() === "" || username !== "Anant_jindal") {
                setuserNameError(true)
                toast.error("User name is not valid")
                setLoading(false)
            }
            else if (password.trim() === "" || password !== "5687Anant@") {
                setPasswordError(true)
                toast.error("Password is not valid")
                setLoading(false)
            }
            else {
                await fetchingToken();
                const checkToken = localStorage.getItem("token")

                const data = {
                    "username": value.username,
                    "password": value.password,
                    "request_token": checkToken
                }
                const res = await axios.post("https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=36f92e051d1f7b92dd147302b1b51f81", data)
                setLoading(false)

                setValue({
                    username: "",
                    password: ""
                })

                toast.success("Login Success")
                navigate('/home')
            }
        }, 1000)

    }
    return (
        <>

            <section>
                <div className={style.formContainer} >
                    <h1>Sign in</h1>
                    <p>Sign in to your Self Service Portal</p>

                    <input type="text" className={style.input} placeholder='Username' name='username' value={value.username} onChange={onValueChangeHandeler} />
                    {userNameError ? <p className={style.errorMessage}>Invalid Username</p> : ""}
                    <br />
                    <input type="password" className={style.input} placeholder='Password' name='password' value={value.password} onChange={onValueChangeHandeler} />
                    {passwordError ? <p className={style.errorMessage}>Invalid Password</p> : ""}

                    <br />
                    <button disabled={loading === true} className={style.button} onClick={LoginHandeler}>{loading ? <Spin /> : "Log in"}</button>
                </div>
                <ToastContainer />
            </section>
        </>
    )
}

export default Form