'use client';

/**
 * To resolving hydration error.
 */

import { useState,useEffect } from "react";

interface ClientOnlyProps {
    children:React.ReactNode
}

// check whether we are in server side rendering or not.
const ClientOnly = ({children}: ClientOnlyProps) => {
    const [hasMounted, setHasMounted] = useState(false);


    // the moment this component loads, that means it has finished with the server side rendering and it can be mounted.
    useEffect(()=>{
        setHasMounted(true);
    },[])

    // it our application has not mounted, return null;
    if(!hasMounted) return null;
    return (
        <>
            {children}
        </>
    )
}

export default ClientOnly