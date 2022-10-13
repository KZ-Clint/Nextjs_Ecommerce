import Head from 'next/head'
import { useState, useEffect, useContext } from 'react'
import {useRouter} from 'next/router'
import axios from 'axios'
import { DataContext } from '../../store/GlobalState'
import Link from 'next/link'
import OrderDetail from '../../components/OrderDetail'




export default function DetailOrder () {

    const { state, dispatch } = useContext(DataContext)
    const { orders, user } = state

    const router = useRouter()
    const {id} = router.query


    const [ orderDetail, setOrderDetail ] = useState([])

    useEffect( () => {
       const newArr = orders.filter( (order) => {
        return order._id === id
       } )
       setOrderDetail(newArr)
       console.log(newArr)
    },[orders] )

    return(
        <>
        <div className="my-3" >
            <Head>
              <title> Detail Order </title> 
            </Head>
        </div>
         <div>
             <button className="btn btn-dark" onClick={ () => router.back() } >
                 <i className="fas fa-long-arrow-alt-left" aria-hidden="true" ></i> Go Back
             </button>
         </div>  
          <OrderDetail orderDetail={orderDetail} state={state} dispatch={dispatch} />
     
        </>
    )
}
