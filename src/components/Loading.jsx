import React from 'react'

const Loading = () => {
    return (
        <div>
            <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2   flex flex-col items-center translate-y-1/2 ">
                <div className="border-t-transparent border-solid animate-spin  rounded-full border-red-400 border-8 h-48 w-48"></div>
                <h1 className='text-3xl mt-12 text-stone-900'>Please wait fetching in process</h1>
            </div>

        </div>
    )
}

export default Loading