import {useEffect, useState} from "react";

export const useDebounce = (value, delay = 300) => {
  const [debounce, setDebounce] = useState(value)

  useEffect(() => {
   const timer =  setTimeout(() => setDebounce(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounce

}