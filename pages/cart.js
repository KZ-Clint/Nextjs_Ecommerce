import Head from 'next/head'
import { useContext, useState, useEffect } from 'react'
import { DataContext } from '../store/GlobalState'
import {useRouter} from 'next/router'
import Link from 'next/link'
import CartItem from '../components/CartItem'
import axios from 'axios'
import baseUrl from '../components/base/baseUrl'

export default function Cart () {

  const { state, dispatch } = useContext(DataContext)
  const { cart, user, orders } = state

  const [ total, setTotal ] = useState(0)

  const [ address, setAddress ] = useState('')
  const [ mobile, setMobile ] = useState('')
  const [ payment, setPayment ] = useState(false)
  const [ callback, setCallback ] = useState(false)

  const router = useRouter()

  useEffect( () => {
    const getTotal = () => {
      const res = cart.reduce( (prev, item) => {
        return prev + (item.price * item.quantity)
      },0)
      setTotal(res)
    } 

    getTotal()
  },[cart] )

    useEffect( () => {
    const cartLocal = JSON.parse(localStorage.getItem('cart01'))
    if(cartLocal && cartLocal.length > 0 ) {
       let newArr = []
       const update = async () => {  
       for ( const item of cartLocal ) {
       const res = await axios.get( `${baseUrl}/product/${item._id}`)
     
            console.log(item._id)
            const {_id, title, images, price, inStock, sold} = res.data.products
            console.log(res.data)
            if(inStock > 0) {
              console.log('gotten for statement')
              newArr.push( {
                _id, title, images, price, inStock, sold,
                quantity: item.quantity > inStock - sold ? 1 : item.quantity
              } )
              console.log(item.inStock)
            }        
       }
          dispatch( {type: 'ADD_CART', payload: newArr } )
          localStorage.setItem('cart01', JSON.stringify(newArr))
      }
      update()
    }
  
  },[] )

//   useEffect( () => {
//     localStorage.setItem('cart01', JSON.stringify(cart))

//  },[cart] )

 const handlePayment = async () => {
   if(!address || !mobile ) 
     return dispatch({ type: 'NOTIFY', payload: {error: ' Please add your address and mobile ' } })

     let newCart = []
     for( const item of cart ){
       const res = await axios.get( `${baseUrl}/product/${item._id}`)
       if (res.data.inStock - item.quantity >= 0 ) {
        newCart.push(item)
       }
     }
     if(newCart.length < cart.length) {
        setCallback(!callback)
        return dispatch({ type: 'NOTIFY', payload: {error: ' The product is out of stock or the quantity is insufficient ' } })
     }

     axios.post( `${baseUrl}/order/`, { address, mobile, cart, total },{  headers: {
      'Authorization': `Bearer ${user.access_token} `
    }} )
     .then( (response) => {
      console.log(response.data)
      dispatch( {type: 'ADD_CART', payload: [] } )
      const newOrder = {
         ...response.data.newOrder,
         user: user.user
      }

      dispatch( {type: 'ADD_ORDERS', payload: [...orders, newOrder] } )
      if(cart.length === 0 ) {
        localStorage.setItem('cart01', JSON.stringify(cart))
      }
      dispatch( {type: 'NOTIFY', payload: {success: response.data.msg } } )
      return router.push(`/order/${response.data.newOrder._id}`)
     } )
     .catch( (error) => {
       
        return dispatch( {type: 'NOTIFY', payload: { error: "something went wrong" } } )
        
     } )


 }
 
  if (cart.length === 0 ) {
    return <h2> Empty Cart! </h2>
  }

  return (
         <>
         <div className="row mx-auto" >
            <Head>
                <title> Cart Page </title>
            </Head>
            <div className="col-md-8 text-secondary table-responsive my-3"> 
               <h2 className="text-uppercase" > Shopping Cart </h2>

               <table className="table my-3">
                  <tbody>
                     {
                        cart.map( (item) => (
                          <CartItem key={item._id} item={item} dispatch={dispatch} cart={cart} />
                        ) )
                     } 
                  </tbody>
               </table>
            </div>
            <div className="col-md-4 my-3 text-right text-uppercase text-secondary"> 
                <form>
                    <h2> Shipping </h2>

                    <label htmlFor="address"> Address </label>
                    <input type="text" name="address" id="address" className="form-control mb-2" value={address} 
                    onChange={ (e) => { setAddress(e.target.value) } } />

                    <label htmlFor="mobile"> Mobile </label>
                    <input type="text" name="mobile" id="mobile" className="form-control mb-2" value={mobile}
                     onChange={ (e) => { setMobile(e.target.value) } }  />

                </form>

                <h3> Total: <span className="text-danger"> ${total} </span> </h3>

                 <Link href={user.user ? '#' : '/signin' } >
                    <a className="btn btn-dark" onClick={handlePayment} > Proceed with payment </a>
                 </Link>

            </div>
         </div>
    
         </>
  )
}