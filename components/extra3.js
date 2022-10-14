import React,{useState, useEffect} from "react";
import styles from './Datamockup.module.css'
import {data} from './datamockup'

export default function Datafilter () {
    const initialstate = { search:"" , optionselect:"Default"}
    const [ search, setSearch ] = useState(initialstate)
    // const [ datas, setData ] = useState(data)
    const [ s, setS ] = useState(true)

    const searchChange = (e) => {
      const  { name,value } = e.target
        setSearch({...search, [name]: value })    
    }

    const filterData = data.filter( (items) => { 
        if ( search.search.toLowerCase()==='' ) {
          return  items
        } 
        else if ( s )  {
            return  items.first_name.toLowerCase().includes(search.search.toLowerCase()) 
         }
        else {
            return items
        }
    } ).filter( (itemss) => {
        if ( search.optionselect ==="m" ) {
            return itemss.first_name.toLowerCase().includes("m")
        }
        else if ( search.optionselect ==="c" ) {
            return itemss.first_name.toLowerCase().includes("c")
        }
        else if ( search.optionselect ==="a" ) {
            return itemss.first_name.toLowerCase().includes("a")
        }
        else {
            return itemss
        }
    } )

        // const searchChange1=(e)=>{
        //     console.log(e)
        //     setOptValue(e)
        //     let copy_data=data
        //     copy_data= copy_data.filter(item=>
        //         item.first_name.toLowerCase().includes(e)    
        //     )
        //     setData(copy_data)
        // }
    return (
          <>
             <div>
                
                 <h1> Contact keeper </h1>
                <form>
                    <input type = "text" name ="search" value={search.search} onChange={searchChange} />
        
                    <select name="optionselect" onChange={searchChange}>
                       <option value='Default'> Default </option>
                       <option value='m'> m </option>
                       <option value='c'> c </option>
                       <option value='a'> a </option>
                    </select>
                </form>

                {/* <input type = "text" name ="search" value={optValue} onChange={(e)=>searchChange1(e.target.value)} />
                <select name="optionselect" onChange={(e)=>searchChange1(e.target.value)}>
                    <option value='Default'> Default </option>
                    <option value='m'> m </option>
                    <option value='c'> c </option>
                    <option value='a'> a </option>
                </select> */}
                
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
                     </tbody>
                </table>     
             </div>
          </> 
    )
}