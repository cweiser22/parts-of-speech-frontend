import { POSResponse } from "./types";

// URL of the pos api, should be not hardcoded later
const POS_URL = process.env.REACT_APP_POS_API_URL || 'http://localhost:8080/pos';

// makes request to the POS api and returns the request body as an object
export async function requestPOS(text: string): Promise<POSResponse>{

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
  
    // for debugging
    console.log(`request body=${JSON.stringify(body)}`)
  
    // make request
    const res = await fetch(POS_URL!, {method: 'POST', body: JSON.stringify(body), headers:{'Content-Type':'application/json'}});
  
    // return request body
    return await res.json() as POSResponse;
  }

