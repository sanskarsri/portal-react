import React from "react";
import { useEffect } from "react";

function Helper(props) {
    useEffect(()=>{
        props.handleAuth()
      },[])
    return (
    null
    )
}

export default Helper;
