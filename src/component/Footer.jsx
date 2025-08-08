import React from 'react'

const Footer = () => {
    return (
        <div className='bg-gray-900 flex items-center justify-center flex-col fixed bottom-0 w-full'>
            <div className='logo font-bold text-white text-2xl'>
                <span className='text-green-500'>&lt;</span>
                Pass
                <span className='text-green-500'>OP/&gt;</span>
            </div >
            <div className='text-white flex gap-1 p-2 font-bold text-lg items-center'>
                Created With <img className='' width={30} src="icons/heart.png" alt="" /> By Lokesh
            </div>
        </div>
    )
}

export default Footer