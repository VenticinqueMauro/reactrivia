import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Game } from './Game'
import { Login } from './Login'
import { Logout } from './Logout'
import { Profile } from './Profile'
import { Howl } from 'howler'
import click from '../sound/click.mp3'
import back from '../sound/back.mp3'
import champion from '../sound/champion.mp3'
import fondo from '../sound/musicaFondo.mp3'
import { Link } from 'react-router-dom'


export const Home = () => {

    const oro = { color: '#FFD700' }
    const ranking = { textShadow: '0px 0px 3px #000', color: '#FFD700' }

    const { isAuthenticated } = useAuth0()

    const [confirm, setConfirm] = useState(false)

    const soundClick = new Howl({
        src: click
    })

    const soundBack = new Howl({
        src: back,
        volume: 0.5
    })

    const soundChampion = new Howl({
        src: champion
    })

    const soundFondo = new Howl({
        src: fondo,
        volume: 0.2
    })


    return (
        <div className='container'>
            <div className='justify-center mt-10 text-5xl font-semibold text-center lg:text-6xl'>
                <h1 className='titulo animate__animated animate__jackInTheBox animate__delay-1s'
                    onClick={() => {
                        soundBack.play()
                        window.location.href = '/'
                    }}>ReacTrivia</h1>
            </div>
            {confirm
                ?
                <Game comenzar={confirm} />
                :
                <div className='text-center animate__animated animate__zoomIn animate__delay-1s'>
                    <Profile />
                    <button disabled={!isAuthenticated && true} className="my-5 btnConfirm disabled:hidden" onClick={() => {
                        soundClick.play()
                        setConfirm(true)
                        soundFondo.play()
                    }}>
                        Start!
                    </button>
                    <div className='flex flex-col items-center justify-center mt-2'>
                        <Link to='/ranking' className='flex items-center text-xl text-black-300' onClick={() => {
                            soundChampion.play()
                        }}>
                            <i className="text-2xl fa-solid fa-trophy rankingIcons" style={oro}></i>
                            <p className='text-2xl font-bold' style={ranking}> Ranking</p>
                        </Link>
                        {isAuthenticated ? <div className='mt-5'><Logout /></div> : <Login />}
                    </div>
                    <ul className="flex justify-center wrapper">
                        <a href="https://www.linkedin.com/in/mauro-venticinque-39a256235/" target='__blank'>
                            <li className="icon linkedIn">
                                <span className="tooltip">LinkedIn</span>
                                <span><i className="fa-brands fa-linkedin-in"></i></span>
                            </li>
                        </a>
                        <a href='https://github.com/VenticinqueMauro' target='__blank'>
                            <li className="icon github">
                                <span className="tooltip">GitHub</span>
                                <span><i className="fa-brands fa-github"></i></span>
                            </li>
                        </a>
                        <a href='https://twitter.com/VenticinqueMa' target='__blank'>
                            <li className="icon twitter">
                                <span className="tooltip">Twitter</span>
                                <span><i className="fa-brands fa-twitter"></i></span>
                            </li>
                        </a>
                    </ul>
                </div>
            }
        </div>
    )
}

