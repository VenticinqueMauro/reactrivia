import React, { useEffect, useState } from 'react'
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { Howl } from 'howler'
import back from '../sound/back.mp3'


export const Ranking = () => {

    const oro = { color: '#FFD700' }
    const plata = { color: '#BEBEBE' }
    const bronce = { color: '#CD7F32' }

    const [rankingList, setRankingList] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const soundBack = new Howl({
        src: back
    })


    //consultar ranking
    useEffect(() => {

        const db = getFirestore();
        const itemsCollection = collection(db, 'ranking')
        const queryItems = itemsCollection;
        getDocs(queryItems).then(snapShot => {
            setRankingList(snapShot.docs.map(item => ({ ...item.data() })))
            setIsLoading(false)
        })


    }, [isLoading])

    rankingList.sort((a, b) => {
        if (a.score > b.score) {
            return -1
        } else if (a.score < b.score) {
            return 1
        } else {
            return 0
        }
    })

    // console.log(rankingList);


    return (
        <div className='flex flex-col items-center mt-8 text-center text-white justify-center-200 containerRanking'>

            <div className='text-4xl text-yellow-300 btnVolver'
                onClick={() => {
                    soundBack.play()
                    window.location.href = '/'
                }}
                style={{ textShadow: '-2px 1px 3px #000' }}>
                <i className="fa-solid fa-hand-point-left"></i> Back
            </div>
            {isLoading
                ?
                <h2 className='mt-10 text-4xl text-black'>CARGAND0...
                </h2>
                :
                <div className='my-2 mx-7 borderRanking'>
                    <div className='grid items-center grid-cols-3 px-2 mt-3 rankingPos'>
                        <i className="text-3xl text-yellow-300 fa-solid fa-ranking-star rankingIcons"></i>
                        <p className='text-2xl font-semibold'>The Bests</p>
                        <p className='text-xl font-bold'>Score:</p>
                    </div>
                    <div className='grid items-center grid-cols-3 px-2 mt-3 rankingPos'>
                        <i className="text-4xl fa-solid fa-trophy rankingIcons" style={oro}></i>
                        <div className='flex items-center'>
                            <img className='w-10 h-10 rounded-full ' src={rankingList[0].picture} alt={rankingList[0].name} />
                            <p className='px-2 text-center'>{rankingList[0].name}</p>
                        </div>
                        <p className='text-3xl font-bold text-green-400 textScore'>{rankingList[0].score}</p>
                    </div>
                    <div className='grid items-center grid-cols-3 px-2 mt-3 rankingPos'>
                        <i className="text-3xl fa-solid fa-trophy rankingIcons" style={plata}></i>
                        <div className='flex items-center'>
                            <img className='w-10 h-10 rounded-full ' src={rankingList[1].picture} alt={rankingList[1].name} />
                            <p className='px-2'>{rankingList[1].name}</p>
                        </div>
                        <p className='text-3xl font-bold text-green-400 textScore'>{rankingList[1].score}</p>
                    </div>
                    <div className='grid items-center grid-cols-3 px-2 mt-3 rankingPos'>
                        <i className="text-2xl fa-solid fa-trophy rankingIcons" style={bronce}></i>
                        <div className='flex items-center'>
                            <img className='w-10 h-10 rounded-full ' src={rankingList[2].picture} alt={rankingList[2].name} />
                            <p className='px-2'>{rankingList[2].name}</p>
                        </div>
                        <p className='text-3xl font-bold text-green-400 textScore'>{rankingList[2].score}</p>
                    </div>
                    <div className='grid items-center grid-cols-3 px-2 mt-3 rankingPos'>
                        <i className="text-xl text-yellow-200 fa-solid fa-award rankingIcons"></i>
                        <div className='flex items-center'>
                            <img className='w-10 h-10 rounded-full ' src={rankingList[3].picture} alt={rankingList[3].name} />
                            <p className='px-2'>{rankingList[3].name}</p>
                        </div>
                        <p className='text-3xl font-bold text-green-400 textScore'>{rankingList[3].score}</p>
                    </div>
                    <div className='grid items-center grid-cols-3 px-2 mt-3 rankingPos'>
                        <i className="text-xl text-yellow-200 fa-solid fa-award rankingIcons"></i>
                        <div className='flex items-center'>
                            <img className='w-10 h-10 rounded-full ' src={rankingList[4].picture} alt={rankingList[4].name} />
                            <p className='px-2'>{rankingList[4].name}</p>
                        </div>
                        <p className='text-3xl font-bold text-green-400 textScore'>{rankingList[4].score}</p>
                    </div>
                </div>
            }
        </div>
    )
}
