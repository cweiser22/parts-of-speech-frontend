import React from 'react'

function NavBar(){
    return (
        <nav className="w-full bg-white border flex ">    
            <div className="flex flex-col p-4">
                <h1 className="text-2xl font-bold my-auto ml-4">Parts of Speech Tagging</h1>
            </div>
            <div className="flex-grow">

            </div>
            <div className="h-16">
                <a className="flex flex-col align-center p-4" href="https://github.com/cweiser22/parts-of-speech-frontend">
                    <img className="" src="/github-icon.png" style={{maxHeight: '32px'}} alt="Github"/>
                </a>
            </div>
        </nav>
    )
}

export default NavBar;