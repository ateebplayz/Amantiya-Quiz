"use client"
import '../../globals.css'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'

function LoginPage() {
    const router = useRouter()
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [code, setCode] = React.useState('')
    const [shake, setShake] = React.useState(false)
    const handleSubmit = async () => {
        const resp = await axios.get(`https://api.amantiya.com:8080/admin/authenticate?username=${username}&password=${password}&code=${code}`)
        if(resp.data.code !== 200) {
            console.log(resp.data)
            setShake(true)
            await new Promise(r=> setTimeout(r, 500))
            setShake(false)
        } else {
            localStorage.setItem('token', resp.data.data)
            router.push('/admin')
        }
    }
    return (
    <div className='bg-primary font-primary min-h-screen w-full flex justify-center items-center'>
        <div className={`bg-secondary ${shake ? 'animate-shake' : ''} shadow-2xl border-[1px] border-text w-96 h-fit p-8 rounded flex justify-center items-center flex-col`}>
            <h1 className='text-4xl font-bold'>Beheerdashboard</h1>
            <p className='mt-2 text-md text-center w-full'>Bedrieger? Wij denken van wel. Voer uw gegevens in om te authenticeren.</p>
            <input onChange={(e)=>{setUsername(e.target.value)}} className='bg-white mt-2 border-[1px] border-slate-300 p-3 placeholder-slate-500 focus:outline-none w-full' placeholder='Gebruikersnaam'/>
            <input onChange={(e)=>{setPassword(e.target.value)}} type='password' className='bg-white mt-2 border-[1px] border-slate-300 p-3 placeholder-slate-500 focus:outline-none w-full' placeholder='Wachtwoord'/>
            <input onChange={(e)=>{setCode(e.target.value)}} maxLength={8} className='bg-white mt-2 border-[1px] border-slate-300 p-3 placeholder-slate-500 focus:outline-none w-full' type='password' placeholder='8-cijferige toegangscode'/>
            <button onClick={handleSubmit} className={`mt-4 border-[1px] border-buttonBorder transition duration-500 hover:bg-buttonBgHover bg-button text-text rounded-[1px] px-10 w-full py-2 ${1 === 1 ? '' : 'opacity-50 curser-not-allowed pointer-events-none'}`}>
            Authenticeren
            </button>
        </div>
    </div>
    )
}

export default LoginPage