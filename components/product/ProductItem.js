import Link from 'next/link'
import { useContext } from 'react'
import { DataContext } from '../../store/GlobalState'
import { addToCart } from '../../store/Actions'

const ProductItem = ({product, handleCheck, state, dispatch}) => {
    console.log(product)
    console.log(product.title)

    const { cart, user,  } = state

    const userLink = () => {
      return(
        <>
           <Link href={`product/${product._id}`}>
               <a className="btn btn-info mr-1 flex-fill "> View </a>
           </Link>
           <button className="btn btn-success ml-1 flex-fill"
           onClick={ () => {dispatch(addToCart(product, cart))} }
           disabled={product.inStock === 0 ? true : false } >
                Buy 
           </button>
        </>
      )
    }

    const adminLink = () => {
      return(
        <>
           <Link href={`create/${product._id}`}>
               <a className="btn btn-info mr-1 flex-fill "> Edit </a>
           </Link>
           <button className="btn btn-danger " style={{marginLeft: '5px', flex: 1 }} 
            data-toggle="modal" data-target="#exampleModal" 
            onClick={() => { dispatch({ 
             type: 'ADD_MODAL',
             payload: [{ data: product, id: product._id, title:product.title, type: 'DELETE_PRODUCT' }]
            }) } }>
                Delete
           </button>
        </>
      )
    }
    // localStorage.setItem('cart01', JSON.stringify(cart))
    // console.log(cart)

    return(
      
        <div className="card" style={ {width: '18rem'}}>

            {
              user.user &&  user.user.role === 'admin' && 
               <input type="checkbox" checked={product.checked} 
               className="position-absolute" style={{height: '20px', width: '30px' }}
               onChange={ () => { handleCheck(product._id) } } />
            }

            <img className="card-img-top" src={product.images[0].url} alt={product.images[0].url} />
            <div className="card-body">
               <h5 className="card-title text-capitalize " title={product.title} > {product.title} </h5>
               <div className="row justify-content-between mx-0 " >
                  <h6 className="text-danger" > ${product.price} </h6>
                  {
                    product.inStock > 0 ? <h6 className="text-danger"> In Stock {product.inStock} </h6> : 
                    <h6 className="text-danger"> Out Stock  </h6> 
                  }
               </div>
               <p className="card-text" title={product.description} > {product.description} </p>
               <div className="row justify-content-between mx-0" >
                  { user.user && user.user.role !== 'admin' ? userLink() : adminLink() }
               </div>
            </div>
        </div>
      
    )
}

export default ProductItem