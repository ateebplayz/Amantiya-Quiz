"use client"
import { EnergyLevels } from '@/assets/calculation'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
interface User {
    email: string,
    name: string,
    phone: string,
    energyLevel: {
        energielevel: number,
        activerende: number,
        blokkade: number,
        focus: number,
        hyper: number,
        energiereserves: number
    },
    time: number
}
function AdminPage() {
    const router = useRouter()
    const [documents, setDocuments] = React.useState<Array<User>>([])
    const [localDoc, setLocalDoc] = React.useState<User>({
        name: '',
        email: '',
        phone: '',
        time: 0,
        energyLevel: {energielevel: 0, activerende: 0, blokkade: 0, focus: 0, hyper: 0, energiereserves: 0}
    })
    const [average, setAverage] = React.useState<EnergyLevels>({energielevel: 0, activerende: 0, blokkade: 0, focus: 0, hyper: 0, energiereserves: 0})
    const fetchDocs = async () => {
        const resp = await axios.get(`https://api.amantiya.com:8080/users/get?token=${localStorage.getItem('token')}`)
        if(resp.data.code !== 200) return router.push('/admin/login')
        setDocuments(resp.data.data.data)
        setAverage(resp.data.data.average)
    }
    useEffect(()=>{
        fetchDocs()
    })
    const handleModalPop = () => {
        (document.getElementById('modal_popup_results') as HTMLDialogElement).showModal();
    }
  return (
    <div className='bg-primary font-primary flex min-h-screen p-12 justify-center flex-col items-center'>
        <h1 className='text-5xl font-bold'>Admin Dashboard</h1>
        <div className='flex justify-center items-center flex-row flex-wrap'>
            <div className='transition duration-500 hover:scale-105 cursor-pointer w-44 mx-2 h-44 shadow-xl bg-button mt-12 rounded-xl flex flex-col justify-center items-center'>
                <h1 className='text-7xl font-bold'>{average.energielevel}</h1>
                <h1 className='text-xl mt-2'>Energie Level</h1>
            </div>
            <div className='transition duration-500 hover:scale-105 cursor-pointer w-44 mx-2 h-44 shadow-xl bg-button mt-12 rounded-xl flex flex-col justify-center items-center'>
                <h1 className='text-7xl font-bold'>{average.activerende}</h1>
                <h1 className='text-xl mt-2'>Activerende</h1>
            </div>
            <div className='transition duration-500 hover:scale-105 cursor-pointer w-44 mx-2 h-44 shadow-xl bg-button mt-12 rounded-xl flex flex-col justify-center items-center'>
                <h1 className='text-7xl font-bold'>{average.blokkade}</h1>
                <h1 className='text-xl mt-2'>Blokkerings</h1>
            </div>
            <div className='transition duration-500 hover:scale-105 cursor-pointer w-44 mx-2 h-44 shadow-xl bg-button mt-12 rounded-xl flex flex-col justify-center items-center'>
                <h1 className='text-7xl font-bold'>{average.focus}</h1>
                <h1 className='text-xl mt-2'>Niveau van Focus</h1>
            </div>
            <div className='transition duration-500 hover:scale-105 cursor-pointer w-44 mx-2 h-44 shadow-xl bg-button mt-12 rounded-xl flex flex-col justify-center items-center'>
                <h1 className='text-7xl font-bold'>{average.hyper}</h1>
                <h1 className='text-xl mt-2'>Hypersensitivit</h1>
            </div>
            <div className='transition duration-500 hover:scale-105 cursor-pointer w-44 mx-2 h-44 shadow-xl bg-button mt-12 rounded-xl flex flex-col justify-center items-center'>
                <h1 className='text-7xl font-bold'>{average.energiereserves}</h1>
                <h1 className='text-xl mt-2'>Energiereserves</h1>
            </div>
        </div>
        <div className='flex justify-center items-center flex-col p-6 w-full'>
            {documents.map((d, i) => (
                <div className='flex justify-between items-stretch w-full bg-button shadow-xl my-4 p-8' key={i}>
                    <div className='flex flex-row justify-center items-start flex-grow'>
                        <div className='flex justify-center items-start h-full flex-col mr-4'>
                            <h1 className='font-bold text-2xl'>Email</h1>
                            <h1 className='text-lg'>{d.email}</h1>
                        </div>
                        <div className='flex justify-center h-full items-start flex-col mx-4'>
                            <h1 className='font-bold text-2xl'>Name</h1>
                            <h1 className='text-lg'>{d.name}</h1>
                        </div>
                        <div className='flex justify-center h-full items-start flex-col mx-4'>
                            <h1 className='font-bold text-2xl'>Phone</h1>
                            <h1 className='text-lg'>{d.phone}</h1>
                        </div>
                        <div className='flex justify-center h-full items-start flex-col mx-4'>
                            <h1 className='font-bold text-2xl'>Date</h1>
                            <h1 className='text-lg'>{new Date(d.time).toISOString().slice(0, 10)}</h1>
                        </div>
                    </div>
                    <div className='w-64 flex flex-col justify-center items-end flex-grow'>
                        <button onClick={()=>{setLocalDoc(d); handleModalPop()}} className={`mt-4 w-64 border-[1px] border-buttonBorder transition mx-4 duration-500 hover:bg-buttonBgHover bg-button text-text rounded-[1px] px-10 py-2 `}>
                            Results
                        </button>
                        <button className={`mt-4 w-64 border-[1px] border-buttonBorder transition mx-4 duration-500 hover:bg-buttonBgHover bg-red-400 text-white text-text rounded-[1px] px-10 py-2 `}>
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
        <dialog id='modal_popup_results'>
            <div className='w-96 bg-primary rounded p-8'>
                <h1 className='font-bold text-xl ml-2'>Results for {localDoc.name}</h1>
                <h1 className='text-lg ml-2 '>{localDoc.email}</h1>
                <div className='flex justify-start mt-4 items-start flex-row flex-wrap'>
                    <div className='flex justify-center items-center flex-col mx-2'>
                        <h1 className='text-xl font-bold'>Energie leven</h1>
                        <h1 className='text-3xl text-start w-full'>{localDoc.energyLevel.energielevel}</h1>
                    </div>
                    <div className='flex justify-center items-center flex-col mx-2'>
                        <h1 className='text-xl font-bold'>Activerende Energie</h1>
                        <h1 className='text-3xl text-start w-full'>{localDoc.energyLevel.activerende}</h1>
                    </div>
                    <div className='flex justify-center items-center flex-col mx-2'>
                        <h1 className='text-xl font-bold'>Blokkeringsniveau</h1>
                        <h1 className='text-3xl text-start w-full'>{localDoc.energyLevel.blokkade}</h1>
                    </div>
                    <div className='flex justify-center items-center flex-col mx-2'>
                        <h1 className='text-xl font-bold'>Hypersensitiviteitsniveau</h1>
                        <h1 className='text-3xl text-start w-full'>{localDoc.energyLevel.hyper}</h1>
                    </div>
                    <div className='flex justify-center items-center mx-2 flex-col'>
                        <h1 className='text-xl font-bold'>Niveau van Focus</h1>
                        <h1 className='text-3xl text-start w-full'>{localDoc.energyLevel.focus}</h1>
                    </div>
                    <div className='flex justify-center items-center mx-2 flex-col'>
                        <h1 className='text-xl font-bold'>Energiereserves</h1>
                        <h1 className='text-3xl text-start w-full'>{localDoc.energyLevel.energiereserves}</h1>
                    </div>
                </div>
                <button onClick={()=>{(document.getElementById('modal_popup_results') as HTMLDialogElement).close()}} className={`mt-4 w-full ml-2 border-[1px] border-buttonBorder transition mx-4 duration-500 hover:bg-buttonBgHover bg-button text-text rounded-[1px] px-10 py-2`}>
                    Close
                </button>
            </div>
        </dialog>
    </div>
  )
}

export default AdminPage