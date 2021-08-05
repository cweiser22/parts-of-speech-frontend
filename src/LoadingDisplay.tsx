import React from 'react'
import {DotLoader} from 'react-spinners';


function LoadingDisplay(){
    return (
        <div className="h-full border rounded bg-white flex flex-col justify-center p-8">
            <div className="mx-auto"><DotLoader /></div>
        </div>
    )
}

export default LoadingDisplay