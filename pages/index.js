import Head from 'next/head'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { DataContext } from '../store/GlobalState'
import Link from 'next/link'
import ProductItem from '../components/product/ProductItem'
import {useRouter} from 'next/router'
import { filterSearch } from '../authent/filterSearch'
import Filter from '../components/Filter'

export default function Home({products, results}) {

  const [ product, setProduct ] = useState(products)
  const [ result, setResult ] = useState(results)

  const [ isCheck, setIsCheck ] = useState(false)
  const [ page, setPage ] = useState(1)

  const { state, dispatch } = useContext(DataContext)
  const { user } = state 

  const router = useRouter()

//   useEffect( () => {
//      axios.get( 'http://localhost:5000/product/' )
//      .then( (response) => {
//       console.log(response.data)
//       setProduct(response.data.products)
//       console.log(product)
//       setResult(response.data.result)
//       console.log(result)

//      } )
//      .catch( (error) => {
//         console.log({error})
//      } )
//   },[] )

  useEffect( () => {
    setProduct(products)
  },[products] )

  useEffect( () => {
    if(Object.keys(router.query).length === 0 ){
      setPage(1)
    }
  },[router.query] )

  const handleCheck = (id) => {
   product.forEach( (prod) => {
      if(prod._id === id ) {
         return prod.checked = !prod.checked
      }
   } )
   setProduct([...product])
  }

  const handleCheckAll = () => {
      product.forEach( (prod) => {
           return prod.checked = !isCheck
         } )
      setProduct([...product])
      setIsCheck(!isCheck)
  }

  const handleDeleteAll = () => {
    let deleteArr = [];
    product.forEach( (prod) => {
      if(prod.checked) {
         deleteArr.push({
             data: '', id: prod._id, title:'Delete all selected products?', type: 'DELETE_PRODUCT' 
         }) }
    } )
    
    dispatch({ type: 'ADD_MODAL', payload: deleteArr })

  }

  const handleLoadMore = () => {
    setPage(page + 1)
    filterSearch({router, page: page + 1 })
  }


  return (
         <div className='products' >
            <Head>
                <title> Home Page </title>
            </Head>

           <Filter state={state} />

            {
               user.user && user.user.role === 'admin' && 
               <div className="delete_all btn btn-danger mt-2" style={{marginBottom: '-10px'}} > 
                   <input type="checkbox" checked={isCheck} 
                   style={{width: '25px', height: '25px', transform: 'translateY(8px)' }} onChange={handleCheckAll} />
                   <button className="btn btn-danger ml-2" onClick={handleDeleteAll} data-toggle="modal" data-target="#exampleModal"  >
                      DELETE ALL
                   </button>
               </div>
            }

            {
              product.length === 0 
              ? <h2> No Products </h2> 
              : product.map( prod => (
               <ProductItem key={prod._id} product={prod} handleCheck={handleCheck} state={state} dispatch={dispatch} />  
              )                        
          )}

          {
            results < page * 3 ? "" 
            : <button className="btn btn-outline-info d-block mx-auto mb-4"
            onClick={handleLoadMore} >
                Load More
            </button>
          }
          

         </div>
  )
}

export async function getServerSideProps({query}) {
   const page = query.page || 1
   const category = query.category || 'all'
   const sort = query.sort || ''
   const search = query.search || 'all' 

   const res = await axios.get(`
   http://localhost:5000/product?limit=${page * 3}&category=${category}&sort=${sort}&title=${search}` )

  return{
    props: {
      products: res.data.products,
      results: res.data.result
    }
  }
}
