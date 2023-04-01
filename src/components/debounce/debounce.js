import { useEffect, useState } from "react";

function useDebounce(value, delay = 500) {
    const [debounceVal, setDebounce] = useState(value);

    useEffect(()=> {

        const hanlder = setTimeout(()=>{
            setDebounce(value)
        }, delay)
        return () => {
            clearTimeout(hanlder)
        }
    },[value, delay])

    return debounceVal
} 

export default useDebounce