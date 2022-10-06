import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd';
import style from './Details.module.css'
import BackArrow from '../../assests/backarrow.svg'
import VideoPlayer from '../../assests/player.svg'
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import Modal from '../Modal/Modal';

const Details = () => {
    const navigate = useNavigate()

    const { id } = useParams()

    const [movieDetail, setMovieDetail] = useState([])
    const [play, setPlay] = useState(false)


    const fetchMovieDetail = async () => {
        await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=36f92e051d1f7b92dd147302b1b51f81&language=en-US`).then((res) => {
            setMovieDetail(res.data)
        }).catch((err) => console.log(err))
    }

    const onGoBackHandeler = () => {
        navigate('/home')
    }

    useEffect(() => {
        fetchMovieDetail()
    }, [movieDetail])


    return (
        <>
            <Row className={style.detailsRow}>
                {movieDetail.length === 0 ? "" : <>
                    <Col flex="0 1 450px" className={style.details}>
                        < div className={style.detailsContainer}>
                            <img src={BackArrow} alt="BackArrow" style={{cursor:"pointer"}} id={style.backarrow} onClick={onGoBackHandeler} />
                            <h1>
                                {movieDetail.title.length <= 20 ? movieDetail.title : movieDetail.title.slice(0, 20)}
                            </h1>

                            <p className={style.rating}>Rating:  {Math.round((movieDetail.vote_average * 10) / 10) / 2} / 5</p>

                            <p className={style.description}>
                                {movieDetail.overview.length <= 175 ? movieDetail.overview : movieDetail.overview.slice(0, 175)}
                            </p>

                            <p>Release Date <span>{movieDetail.release_date}</span> </p>
                            <p className={style.language}>Orginal Language <span>English, Spanish, French</span> </p>
                        </div>
                    </Col>


                    <Col flex="1 1 200px" className={style.movieImg}>
                        <div className={style.background} style={{ backgroundImage: `url(${`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`})` }}>

                            <div id={style.id}></div>
                            <div className="videoPlayer">
                                <img id={style.img} src={VideoPlayer} alt="VideoPlayer" 
                                onClick={()=>setPlay(true)}
                                />
                            </div>
                        </div>
                    </Col>
                </>
                }
            </Row>
            <div className={style.modal} >

            {play ? <Modal id={id} onClick={()=>setPlay(false)} /> : ""}
            </div>
        </>
    )
}

export default Details