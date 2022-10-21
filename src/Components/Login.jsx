import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import { Howl } from 'howler'
import click from '../sound/click.mp3'


export const Login = () => {

    const { loginWithRedirect } = useAuth0()

    const soundClick = new Howl({
        src: click,
        volume: 0.3
    })

    return (
        <button className='px-3 mt-10 text-xs font-medium text-center btnLogin '
            onClick={() => {
                soundClick.play()
                loginWithRedirect()
            }
            }>
            <span className='spanLogin '>Login <i className="fa-brands fa-google"></i></span>
        </button>
    )
}
