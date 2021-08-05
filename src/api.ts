import { POSResponse } from "./types";

const POS_URL = 'http://localhost:8080/pos';

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
  
    // TODO: remove this when finished
    console.log(JSON.stringify(body))
  
    // make request
    const res = await fetch(POS_URL, {method: 'POST', body: JSON.stringify(body), headers:{'Content-Type':'application/json'}});
  
    // return request body
    return await res.json() as POSResponse;
  }

