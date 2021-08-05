import React from 'react';
import NavBar from './NavBar';
import TextInput from './TextInput';
import DataDisplay from './DataDisplay';
import useSWR from 'swr';
import { POSResponse, POSState } from './types';
import { useState } from 'react';
import { useEffect } from 'react';


const POS_URL = 'http://localhost:8080/pos';

async function requestPOS(text: string): Promise<POSResponse>{
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
  console.log(JSON.stringify(body))
  const res = await fetch(POS_URL, {method: 'POST', body: JSON.stringify(body), headers:{'Content-Type':'application/json'}});
  return await res.json() as POSResponse;
}

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
  const [data, setData] = useState<POSResponse>(defaultData);

  const [inputText, setInputText] = useState<string>();

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>){
    clearTimeout(timer);
    setInputText(e.target.value);
    setTimeout(() => setValid(false), 3000);
  }

  useEffect(()=>{
    async function updatePOSData(){
      try{
        const newData = await requestPOS(inputText!);
        setData(newData);
        setValid(true);
      } catch(e){

      }
    }
    if (!valid){
      updatePOSData();
    }
  }, [valid])
  

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
              <DataDisplay valid={valid} data={data?.values[0].data}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
