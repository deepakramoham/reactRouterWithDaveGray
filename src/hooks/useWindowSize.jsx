import {useState, useEffect} from "react";

const useWindowSize = () => {
  const [windowSize,setWindowSize] = useState({
    width:undefined,
    height: undefined
  });

  useEffect(()=>{
    const handleResize=()=>{
      setWindowSize({
        width:window.innerWidth,
        height: window.innerHeight
      });
    }
    handleResize();
    window.addEventListener("resize",handleResize);
  
      
 
    return ()=>window.removeEventListener("resize",handleResize); //CleanUp function refactored.
    // if there is return inside a useEffect then it must be noted that it is a cleanUp function.
  },[])
  return windowSize;
}

export  default useWindowSize;