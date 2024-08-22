import { useEffect, useState } from "react";

export function useFetch(url, initalData){
    const [data, setData] = useState(initalData);
    
    useEffect(() => {
        const abortController = new AbortController();

        (async () => {
            const response = await fetch(url, { signal: abortController.signal });
            const result = await response.json();

            setData(Object.values(result));
        })();

        return () => abortController.abort();
    }, [url]);


    return {
        data,
    };
}