import React from 'react';
import NavBar from './NavBar';
import TextInput from './TextInput';
import DataDisplay from './DataDisplay/DataDisplay';
import ErrorDisplay from './ErrorDisplay';
import { POSDocumentData} from './types';
import { useState } from 'react';
import {requestPOS} from "./api";


// function to handle getting POS data


//data to use when app first loads
const defaultData: POSDocumentData =  {
        verbs: [],
        adjectives: [],
        adverbs: [],
        nouns: [],
        pronouns: [],
        conjunctions: [],
        interjections: [],
        prepositions: [],
        articles: [],

      }


function App() {

  // POS data
  // either contains POS data, or null if there is no valid data
  const [pos, setPos] = useState<POSDocumentData | null>(defaultData);

  // whether or not the request failed
  // specific errors are not displayed, we need only know whether an error happened or not
  const [error, setError] = useState<boolean>(false);

  // typing timeout is used to determine when to refresh POS data
  const [typingTimeout, setTypingTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  // function to be called whenever the input text changes
  function updateInputText(s: string){

    // cancel old timeout
    if (typingTimeout){
      clearTimeout(typingTimeout)
    }

    // for debugging
    console.log(`updateInputText s=${s}`)

    // get rid of old POS data, it is no longer valid
    setPos(null);

    // set new timeout
    setTypingTimeout(setTimeout(() => updatePOSData(s), 1000))

  }

  // function to be called once the user is done typing
  async function updatePOSData(s: string){
    // do not make a request if all input text has been deleted, just use defaultData
    if (s === ""){
      setPos(defaultData);
      return;
    }

    // if there is input text, get new data
    try{
      // fetch new POS from server
      const res = await requestPOS(s);

      // set new data
      setPos(res.values[0].data);

    } catch(e){
      // display error if anything went wrong
      setError(true);
    }
  }

  

  return (
    <div className="App">
      <header>
        <NavBar/>
      </header>
      <main>
        <div className="md:w-3/4 mx-auto p-12">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <TextInput updateInputText={updateInputText}/>
            </div>
            <div className="col-span-1">
   
              {error ? <ErrorDisplay/> : <DataDisplay pos={pos}/>}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
