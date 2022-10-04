import React from 'react'
import style from './Card.module.css'
import Star from '../../../assests/Star .svg'
import MoviePlayer from '../../../assests/moviePlayer.svg'

const Card = ({ele}) => {
    return (
        <>
                <div className={style.card} key={ele.vote_count}>
                    <div className={style.cardImg}>
                        <img src={`https://image.tmdb.org/t/p/w500${ele.poster_path}`} alt="MovieBanner" />
                    </div>
                    <div className={style.about}>
                        <ul>
                            <li>{ele.title.length<=20?ele.title:ele.title.slice(0,20)}</li>
                            <li><img src={Star} alt="Star" /><span> {Math.round((ele.vote_average * 10) / 10 )/2} / 5</span></li>
                        </ul>

                        <div className={style.moviePlayer}>
                            <img src={MoviePlayer} alt="MoviePlayer" />
                        </div>
                    </div>
                </div>
        </>
    )
}

export default Card