import React from 'react'
import { useState } from 'react';

interface Props{
    updateInputText: any;
    inputText?: string;
}

function TextInput({updateInputText, inputText}: Props){
    const [wordCount, setWordCount] = useState<number>(0);
    const [charCount, setCharCount] = useState<number>(0);


    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>){

        if (e.target.value == ''){
            console.log(e.target.value);
            setWordCount(0);
            setCharCount(0)
            updateInputText('');
            return;
        }
        console.log(`target val: ${e.target.value}`);

        // call handler passed down from app
        updateInputText(e.target.value);

        setWordCount(e.target.value.trim().split(/\s+/).length);
        setCharCount(e.target.value.length);


    }

    return (
        <div className="w-full border rounded px-6 bg-white block divide-y  ">
            <div className="flex w-full pt-2 ">
                <div className="block p-2 mr-8">
                    <h5 className="text-xs text-gray-500 uppercase font-normal p-0.5">Words</h5>
                    <h1 className="font-bold text-4xl">{wordCount}</h1>
                </div>
                <div className="block p-2">
                    <h5 className="text-xs text-gray-500 uppercase font-normal p-0.5">Characters</h5>
                    <h1 className="font-bold text-4xl">{charCount}</h1>
                </div>
            </div>

            <div className="h-96 p-2    ">
                <textarea
                   /* onKeyDown={(e) => {
                        if (e.key == 'Backspace'){
                            // call handler passed down from app
                            console.log('backspace')
                        }
                    }}*/
                   // value={inputText}
                    onChange={handleChange}
                    
                    placeholder="Paste text here..."
                    className="resize-none focus:outline-none text-md text-lg h-full font-mono w-full appearance-none font-normal leading-relaxed"
                ></textarea>
            </div>
            <div className="h-6 flex flex-col justify-center py-8">
                <p className="font-sans text-xs"><span className="font-bold">Parts of Speech Tagger</span> -- Count the number of each part of speech that appears in a text</p>
            </div>
        </div>
    )
}

export default TextInput;