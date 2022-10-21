import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'

export const Profile = () => {

    const { user, isAuthenticated } = useAuth0()


    return (
        isAuthenticated && (
            <div className='flex items-center content-center justify-around mt-4'>
                <p className='text-2xl text-slate-700'>Hello! <b className='text-4xl font-semibold text-blue-600 playerName' style={{textShadow: '0px 0px 1px #000'}}>{user.given_name}</b></p>
            </div>
        )
    )
}
