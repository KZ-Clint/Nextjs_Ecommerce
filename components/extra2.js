import React,{useState, useEffect} from "react";
import styles from './Datamockup.module.css'
import {data} from './datamockup'
import Jjc from "./Jjc";

export default function Datafilter2 ( { onRouteChange } ) {
   
     const [ isDropdownVisible, setIsDropdownVisible ] = useState(false)

     const setDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible)
     } 

     const [ itemsList, setItemsList ] = useState([
        { 
            name : "Default",
            value : "default"
        },
        { 
            name : "Banana",
            value : "banana"
        },
        { 
            name : "Apple",
            value : "apple"
        }
     ])

     const [ selectedItemIndex, setSelectedItemIndex ] = useState(null)

     let filterData = data.filter( (items) => {
        if ( selectedItemIndex === 1 ) {
            return items.first_name.toLowerCase().includes("ma")
        }
        else {
            return items
        }
     } )
     
    //  const setSel = (index) => {
    //      setSelectedItemIndex(index);
    //      setIsDropdownVisible(false)
    //  }


    return (
          <>
             <div>
                
                 <h1> Contact keeper </h1>
                 <div>
                     <div className={styles.f} onClick={setDropdown}> {  selectedItemIndex !== null? itemsList[selectedItemIndex].name : " Default "  } { isDropdownVisible? <p> c</p> : <p> d</p>  } </div>
                    {  isDropdownVisible  &&
                     <div>
                         {
                            itemsList.map( (item, index) => (
                                <div key={item.value} onClick={ (e) => { setSelectedItemIndex(index); setIsDropdownVisible(false) }  }  > {item.name} </div>
                            ) )
                         }
                          {/* <Jjc  items = {itemsList} setSelectedItemIndex={setSel} /> */}
                     </div>
                   
                      }
                 </div>
                 
                   
                
                <table>
                     <thead>
                         <tr>
                            <th> First Name  </th>
                            <th> Last Name  </th>
                            <th> Email  </th>
                            <th> Phone  </th>
                         </tr>
                     </thead>
                     <tbody>
                        {
                            filterData.map( (items) =>  
                                <tr key={items.id} >
                                   <td> {items.first_name}  </td>
                                   <td> {items.last_name} </td>
                                   <td> {items.email} </td>
                                   <td> {items.phone} </td> 
                                </tr>
                              )
                        }
                        
                         {/* <Jjc  items = {itemsList} /> */}
                     </tbody>
                </table>     
                <button onClick={ () => onRouteChange(false) }>  sign out </button>
             </div>
          </> 
    )
}