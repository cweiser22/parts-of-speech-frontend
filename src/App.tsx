import React from 'react';
import NavBar from './NavBar';
import TextInput from './TextInput';
import DataDisplay from './DataDisplay/DataDisplay';
import useSWR from 'swr';
import ErrorDisplay from './ErrorDisplay';
import { POSResponse, POSState } from './types';
import { useState } from 'react';
import { useEffect } from 'react';


const POS_URL = 'http://localhost:8080/pos';

// function to handle getting POS data
async function requestPOS(text: string): Promise<POSResponse>{

  // format required by the POS API
  const body = {
    values: [
      {
        recordId: 'a1',
        data: {
          text,
          language: 'en'
        }
      }
    ]
  }

  // TODO: remove this when finished
  console.log(JSON.stringify(body))

  // make request
  const res = await fetch(POS_URL, {method: 'POST', body: JSON.stringify(body), headers:{'Content-Type':'application/json'}});

  // return request body
  return await res.json() as POSResponse;
}

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

let timer = setTimeout(()=>{}, 10000);

function App() {

  // keeps track of whether POS data needs to be or is being refreshed
  const [valid, setValid] = useState<boolean>(true);

  // POS data
  const [pos, setPos] = useState<POSResponse>(defaultData);

  // whether or not the request failed
  // specific errors are not displayed, we need only know whether an error happened or not
  const [error, setError] = useState<boolean>(false);

  // keeps track of text inputted
  const [inputText, setInputText] = useState<string>();

  const [typingTimeout, setTypingTimeout] = useState<any>(0);

  // function to be called whenever the input text changes
  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>){

    // invalidate the current data
    setValid(false);

    // cancel old timeout
    if (typingTimeout){
      clearTimeout(typingTimeout)
    }

    // update inputText
    setInputText(e.target.value);

    // set new timeout
    setTypingTimeout(setTimeout(() => updatePOSData(), 1000))

  }

  async function updatePOSData(){
    // do not make a request if all input text has been deleted. just use defaultData
    if (!inputText){
      setPos(defaultData)
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

  /*useEffect(()=>{
    async function updatePOSData(){
      try{
        const newData = await requestPOS(inputText!);
        setPos(newData);
        setValid(true);
      } catch(e){
        setError(true);
      }
    }
    if (!valid){
      updatePOSData();
    }
  }, [valid])*/
  

  return (
    <div className="App">
      <header>
        <NavBar/>
      </header>
      <main>
        <div className="md:w-3/4 mx-auto p-12">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <TextInput onChange={handleChange}/>
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
