import React from 'react'
import style from './Navbar.module.css'
import Logo from '../../assests/Logo.svg'
import SearchIcon from '../../assests/search.svg'
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    const removeUser = () => {
        localStorage.removeItem("token")
        navigate('/')
    }

    return (
        <>
            <header>
                <div className={style.container}>
                    <div className={style.imgContainer}>
                        <img src={Logo} alt="Logo" />
                    </div>
                    {token ? <div className={style.userThings}>
                        <div className={style.searchBox}>
                            <input type="text" placeholder='Search movies ' />
                            <button><img src={SearchIcon} alt="searchIcon" /></button>
                        </div>
                        <button onClick={removeUser}>Logout</button>
                    </div> : ""}

                </div>
            </header>
        </>
    )
}

export default Navbar