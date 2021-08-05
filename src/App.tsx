import React from 'react';
import NavBar from './NavBar';
import TextInput from './TextInput';
import DataDisplay from './DataDisplay/DataDisplay';
import ErrorDisplay from './ErrorDisplay';
import { POSResponse, POSState } from './types';
import { useState } from 'react';
import {requestPOS} from "./api";


// function to handle getting POS data


//data to use when app first loads
const defaultData: POSResponse = {
  values: [
    {
      recordId: 'a1',
      data: {
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
    }
  ]
}

function App() {

  // keeps track of whether POS data needs to be or is being refreshed
  const [valid, setValid] = useState<boolean>(true);

  // POS data
  const [pos, setPos] = useState<POSResponse>(defaultData);

  // whether or not the request failed
  // specific errors are not displayed, we need only know whether an error happened or not
  const [error, setError] = useState<boolean>(false);

  // keeps track of text inputted
  const [inputText, setInputText] = useState<string>('');

  const [typingTimeout, setTypingTimeout] = useState<any>(0);

  // function to be called whenever the input text changes
  function updateInputText(s: string){

      // cancel old timeout
      if (typingTimeout){
        clearTimeout(typingTimeout)
      }

    // invalidate the current data
    setValid(false);

    // update inputText
    setInputText(s);

    // set new timeout
    setTypingTimeout(setTimeout(() => updatePOSData(), 1000))

  }

  async function updatePOSData(){
    // do not make a request if all input text has been deleted. just use defaultData
    if (inputText == ""){
      console.log("Blank")
      setPos(defaultData);
      setValid(true);
      return;
    }
    try{
      // fetch new POS from server
      const newData = await requestPOS(inputText!);

      // set new data
      setPos(newData);

      // revalidate
      setValid(true);
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
              <TextInput inputText={inputText!} updateInputText={updateInputText}/>
            </div>
            <div className="col-span-1">
              {error ? <ErrorDisplay/> : <DataDisplay valid={valid} data={pos?.values[0].data}/>}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
