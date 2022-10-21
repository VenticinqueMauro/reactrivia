import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import exit from '../sound/exit.wav'
import { Howl} from 'howler'

export const Logout = () => {

    const { logout } = useAuth0()
    
    const soundExit = new Howl({
        src: exit,
        volume: 0.5
    })
    
    return (
        <div className='flex justify-center'>
            <button className='px-4 py-1 text-2xl text-red-500 profile' 
            onClick={() => {
                soundExit.play()
                logout()
                }}>Exit</button>
        </div>
    )
}
