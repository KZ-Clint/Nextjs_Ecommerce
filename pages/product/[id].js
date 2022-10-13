import Head from 'next/head'
import { useState, useEffect, useContext } from 'react'
import {useRouter} from 'next/router'
import axios from 'axios'
import { DataContext } from '../../store/GlobalState'
import { addToCart } from '../../store/Actions'
import baseUrl from '../../components/base/baseUrl'

export default function DetailProduct () {

    const [ product, setProduct ] = useState({})
    const [ i, setI ] = useState(0)
    const { state, dispatch } = useContext(DataContext)
    const { cart } = state

    const router = useRouter()
    const {id} = router.query
    console.log(id)

    useEffect( () => {
        if(router.isReady) {
            axios.get( `${baseUrl}/product/${id}` )
        .then( (response)  => {
            console.log(response.data)
            setProduct(response.data.products)
        } )
        .catch( (err) => {
            console.log({err})
        } )
        }
       
    },[router.isReady] )

    const setP = (index) => {
       setI(index)
    }

    const isActive = (index) => {
       if (i === index ) {
        return " active"
       }
       return ""
    }
    
    // if (Object.keys(product).length !== 0)
    //  localStorage.setItem('cart01', JSON.stringify(cart))

    return(
        <>
          <div className="row detail_page" >
              <Head>
                  <title> Detail Product </title>
              </Head>

              <div className="col-md-6" >
                {
                   Object.keys(product).length !== 0 ? <img src={product.images[i].url} alt={product.images[i].url} 
                   className="d-block img-thumbnail rounded mt-4 w-100 "
                   style={{height: '350px' }} />: <p> No product found </p>
                }
                  
                <div className='row mx-0' style={{cursor: 'pointer' }} >
                    {  Object.keys(product).length !== 0 ? product.images.map( (img, index ) => (
                        <img onClick={() => {setP(index)} } key={index} src={img.url} alt={img.url} 
                        className={`img-thumbnail rounded ${isActive(index)}`}
                        style={{height: '80px', width: '20%' }} /> ) )  :   <p></p>
                    }   
                </div>

              </div>
              <div className="col-md-6 mt-3" >
                  <h2 className="text-uppercase" > { Object.keys(product).length !== 0 ?  product.title : <p></p>  } </h2>
                  <h5 className="text-danger" > { Object.keys(product).length !== 0 ?  product.price : <p></p>  } </h5>

                  <div className="row mx-0 d-flex justify-content-between">
                      {
                        Object.keys(product).length !== 0 && product.inStock > 0 ?
                        <h6 className="text-danger" > In stock: {product.inStock} </h6> :
                        <h6 className="text-danger" > Out Stock </h6>
                      }
                      <h6 className="text-danger" > Sold: {Object.keys(product).length !== 0 ?  product.sold : <p></p> } </h6>
                  </div>

                  <div className="my-2" >  {Object.keys(product).length !== 0 ?  product.description : <p></p> } </div>

                  <div className="my-2" >  {Object.keys(product).length !== 0 ?  product.content : <p></p> } </div>

                  <button type="button" className="btn btn-dark d-block my-3 px-5" 
                  onClick={ () => {dispatch(addToCart(product, cart))} }
                  disabled={product.inStock === 0 ? true : false } > Buy </button>

              </div>
          </div>  
        </>
    )
}
