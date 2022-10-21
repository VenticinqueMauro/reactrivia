import React, { useEffect } from 'react'
import { useState } from 'react'
import Mock from '../Mock/Mock'
import 'animate.css';
import { useAuth0 } from '@auth0/auth0-react';
import { Logout } from './Logout';
import { Ranking } from './Ranking';
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { Howl, Howler } from 'howler';
import correct from '../sound/correct.mp3'
import sinTiempo from '../sound/sinTiempo.mp3'
import champion from '../sound/champion.mp3'
import bob from '../sound/3diasbob.mp3'
import gritoNo from '../sound/gritoNo.mp3'
import click from '../sound/click.mp3'
import back from '../sound/back.mp3'
import aplausos from '../sound/aplausos.mp3'

export const Game = () => {

    const { user } = useAuth0()

    const [preguntaActual, setPreguntaActual] = useState(0)
    const [score, setScore] = useState(0)
    const [isFinished, setIsFinished] = useState(false)
    const [reloj, setreloj] = useState(10)
    const [disabled, setDisabled] = useState(false)
    const [verRanking, setVerRanking] = useState(false)

    const soundCorrect = new Howl({
        src: correct
    });

    const soundIncorrect = new Howl({
        src: gritoNo
    });

    const soundSinTiempo = new Howl({
        src: sinTiempo
    });

    const soundChampion = new Howl({
        src: champion
    });

    const soundBob = new Howl({
        src: bob,
    });

    const soundClick = new Howl({
        src: click
    })

    const soundBack = new Howl({
        src: back
    })
    
    const soundFinal = new Howl({
        src: aplausos
    })

    Howler.volume(0.2);

    const siguientePregunta = (esCorrecta, e) => {

        e.target.classList.add(esCorrecta ? 'correcto' : 'incorrecto')
        if (esCorrecta) {
            soundCorrect.play()
            setScore(score + 10)
        } else {
            soundIncorrect.play()
        }
        setTimeout(() => {
            if (preguntaActual === Mock.length - 1) {
                setreloj(0)
                setIsFinished(true)
                esCorrecta && setScore(score + 10)
                soundFinal.play()
            }

            else {
                setPreguntaActual(preguntaActual + 1)
                esCorrecta && setScore(score + 10)
                e.target.classList.remove(esCorrecta ? 'correcto' : 'incorrecto')
                setreloj(10)
            }
        }, 800);
    }

    useEffect(() => {

        const intervalo = setInterval(() => {

            reloj > 0 && setreloj(reloj - 1)

            reloj === 5 && soundBob.play()

            reloj === 1 && soundSinTiempo.play()

            reloj === 0 && setDisabled(true)

        }, 1000);

        return () => {
            clearInterval(intervalo)
        }
    })


    // enviar datos a firestore
    const setRanking = () => {
            
            const generateId = () => Math.random().toString(36).substr(2, 18);
            const db = getFirestore();
            const userRanking = { id: generateId(), name: user.given_name, picture: user.picture, score: score }
            const userRankingCollection = collection(db, 'ranking');
            addDoc(userRankingCollection, userRanking).then(data => {
                console.log(data.name);
            })
                .catch(err => console.log('error : ' + err))
        
    }

    const topFive = () => {
        setVerRanking(true)
        soundChampion.play()
        setRanking()
    }


    if (isFinished)
        return (
            verRanking
                ?
                <Ranking />
                :
                <div>
                    <div className='grid grid-cols-4 mt-10 gap-x-2 gap-y-3'>

                        <div className='flex flex-col flex-wrap items-center content-center justify-center col-span-2 col-start-2 p-3 text-4xl text-center text-white' style={{ textShadow: '-2px 0px 3px #000' }}>
                            <img src={user.picture} alt={user.name} className='mx-10 rounded-full' style={{ boxShadow: '0px 0px 3px #000' }} />
                            <p className='text-4xl text-yellow-300 userName'>{user.name}</p>
                        </div>

                        <div className='flex justify-around col-span-4 col-start-1 p-3 font-semibold text-center text-white rounded-lg shadow lg:col-start-2 lg:col-span-2 lg:text-xl bg-slate-800 shadow-black'><p>Score: <span className='text-lg font-bold text-yellow-300 lg:text-3xl'>{score}</span> pts / <span className='font-bold text-yellow-400 lg:text-xl'>{Mock.length * 10}</span> pts</p>
                            <button className='flex items-center content-center justify-center text-yellow-200 btnTop5' onClick={() => topFive()}>
                                <p className='px-2 top5'>Ver Ranking</p>
                            </button>
                        </div>

                        <h3 className='col-span-2 col-start-1 p-3 font-semibold text-center text-white bg-green-300 rounded-full shadow lg:col-start-2 lg:col-span-1 shadow-black' style={{ textShadow: '0px 0px 3px #000' }}> <span className='text-2xl font-bold'>{score / 10}</span> <i className="text-xl text-green-500 fa-solid fa-check noShadow"></i></h3>
                        <h3 className='col-span-2 col-start-3 p-3 font-semibold text-center text-white bg-red-400 rounded-full shadow lg:col-start-3 lg:col-span-1 shadow-black' style={{ textShadow: '0px 0px 3px #000' }}><span className='text-2xl font-bold'>{(Mock.length) - (score / 10)}</span> <i className="text-xl text-red-600 fa-solid fa-xmark noShadow"></i></h3>
                    </div>
                    <div className='flex items-center justify-center m-3 font-bold'>
                        <div className='px-4 py-1 mx-3 text-3xl text-yellow-300 profile btnVolver'
                            onClick={() => {
                                setRanking()
                                soundBack.play()
                                window.location.href = '/'
                            }}
                            style={{ textShadow: '-2px 1px 3px #000' }}><i className="fa-solid fa-hand-point-left"></i></div>

                        <Logout score={score} />
                    </div>
                </div>
        );

    return (
        <div className='grid grid-cols-4 mt-10 gap-x-2 gap-y-1'>
            <div className="col-span-2 col-start-1 p-2 my-auto mb-1 text-center text-white rounded-lg shadow lg:col-span-1 lg:col-start-2 bg-slate-800 shadow-black">
                Score: <span className='text-2xl font-bold text-yellow-300'>{score}</span> pts
            </div>
            {disabled
                ?
                <button className="col-span-2 col-start-3 text-center bg-yellow-300 rounded-lg shadow lg:col-span-1 shadow-black animate__animated animate__rubberBand"
                    onClick={() => {
                        soundClick.play()
                        setreloj(10)
                        setDisabled(false)
                        setPreguntaActual(preguntaActual + 1)
                    }}>
                    <span className='text-xl font-bold text-white ' style={{ textShadow: '0px 0px 5px #000' }}>Next! <i className="fa-solid fa-arrow-right"></i></span>
                </button>
                :
                <div className="col-span-2 col-start-3 p-2 mb-1 text-center rounded-lg shadow lg:col-span-1 bg-slate-300 shadow-black">
                    Time: <span className='text-xl font-bold parpadea texto'>{reloj}</span> seg
                </div>
            }
            <div className='col-span-4 col-start-1 p-4 mb-1 bg-orange-400 rounded-full shadow lg:col-start-2 lg:col-span-2 shadow-black'>
                <h2 className='p-2 text-2xl font-semibold text-center text-white ' style={{ textShadow: '0px 0px 5px #000' }}>{Mock[preguntaActual].titulo}</h2>
            </div>
            <div className='flex grid flex-col col-span-4 col-start-1 lg:col-start-2 lg:col-span-2 lg:grid-cols-2 gap-x-2 gap-y-2'>
                {Mock[preguntaActual].opciones.map((pregunta, i) => (
                    <button key={i} className='p-2 text-2xl font-semibold text-center text-white rounded-full shadow bg-slate-400 lg:hover:bg-slate-500 disabled:opacity-60 shadow-black' onClick={(e) => siguientePregunta(pregunta.esCorrecta, e)} disabled={disabled} style={{ textShadow: '0px 0px 5px #000' }}>
                        {pregunta.respuesta}
                    </button>
                ))}
            </div>
        </div>
    )
}