import React from 'react'
import { useEffect, useState, useRef } from "react"
import styles from './SignupExc.module.css'


 export default function Animation () {
    const [ modal, setModal ] = useState(false)
    
    const toggleModal = () => {
        setModal(!modal)
    }
    const container = useRef(null)

    const toggleModal2 = (e) => {
        if ( container.current && container.current.contains(e.target) ) {
            setModal(false)
        }
    }

    useEffect ( () => {
        document.addEventListener("mousedown", toggleModal2);
        
        return () => {
            document.removeEventListener("mousedown", toggleModal2);
        }
    } )


    return (
        <>
           <div className={styles.h} ref={container} >
           <button className={styles.dh} onClick={toggleModal}> Open  </button>
           
           { modal &&    
           <div className={styles.mainbox}>
               <div onClick={toggleModal} className={styles.overlay} > </div>
               <div className={styles.box} >
                <p>  kkkkksks</p> 
                <p>  kkkkksks</p> 
                </div>
           </div>
            }
           </div>
        

        </>
    )
 }