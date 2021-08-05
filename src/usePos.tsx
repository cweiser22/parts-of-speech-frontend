import useSWR from "swr";

// standard JSON fetching function
const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(response => response.json());

function usePos(){
    const {data, error} = useSWR("http://localhost:3000/pos")

 
}