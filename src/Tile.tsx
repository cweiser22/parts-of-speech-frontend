import React from 'react'

interface Props{
    name: string;
    count: number;
}

function Tile({name, count}: Props){
    return (
        <div className="py-2">
                    <h5 className="text-sm text-gray-500 uppercase font-semibold p-0.5">{name}</h5>
                    <h1 className="font-bold text-4xl">{count}</h1>
                </div>
    )
}

export default Tile