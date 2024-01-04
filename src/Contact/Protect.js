import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PuffLoader } from 'react-spinners'

const Protect = (props) => {
    const navigate = useNavigate()
    const [token, setToken] = useState('')

    useEffect(() => {
        let getToken = localStorage.getItem('token')
        if(!getToken){
            return navigate('/')
        }
        setTimeout(() => {
            setToken(getToken)
        },1000)
    }, [])

    if(!token){
        return(
            <div className='Loader'>
                <PuffLoader color="#000" />
            </div>
        )
    }

  return props.children

}

export default Protect
