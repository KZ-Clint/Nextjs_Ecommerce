import Head from 'next/head'
import { useContext, useState, useEffect } from 'react'
import { ImageUpload } from '../../authent/imageUpload'
import { DataContext } from '../../store/GlobalState'
import axios from 'axios'
import {useRouter} from 'next/router'
import baseUrl from '../../components/base/baseUrl'


export default function ProductsManager ({ CUP, CN, CA }) {

    const initialState = { product_id: "", title: '', price: 0, inStock: 0, description: '', content: '', category: '' }

    const [ product, setProduct ] = useState(initialState)
    const {product_id, title, price, inStock, description, content, category} = product

    const [images, setImages] = useState([])

    const { state, dispatch } = useContext(DataContext)
    const { categories, user } = state

    const router = useRouter()
    const {id} = router.query
    const [ onEdit, setOnEdit ] = useState(false)

    useEffect( () => {
        const getP = async () => { 
        if(id) {
           setOnEdit(true)
           const res = await axios.get(`${baseUrl}/product/${id}`)
           console.log(res.data) 
           setProduct(res.data.products)
           setImages(res.data.products.images)

        } else {
           setOnEdit(false)
           setProduct(initialState)
           setImages([])
        }
    }
    getP()
    },[id] )

    const handleChangeInput = (e) => {
        const {name, value} = e.target
        setProduct({...product, [name] : value })

    }

    const handleUploadInput = (e) => {
        dispatch({ type: 'NOTIFY', payload:{} })
        let newImages = []
        let num = 0;
        let err = ''
        const files = [...e.target.files]
        // console.log(files)
        if(files.lengh === 0 ) {
           return  dispatch({ type: 'NOTIFY', payload:{error: 'File does not exist'} }) 
        }
        files.forEach( (file) => {
            if( file.size > 1024 * 1024 ) {
                return dispatch({ type: 'NOTIFY', payload:{error: 'The largest image size is 1mb'} }) 
            }
            if( file.type !== 'image/jpeg' && file.type !== 'image/png'  ) {
                return dispatch({ type: 'NOTIFY', payload:{error: 'Image format is incorrect'} }) 
            }

            num += 1;
                if(num <= 5) {
                    newImages.push(file)
                    return newImages
                }
        } )
        console.log(newImages)

        const imgCount = images.length
        
        if( imgCount + newImages.length > 5 ) {
           return dispatch({ type: 'NOTIFY', payload: {error: 'Select up to 5 images' } })
        }
        setImages([...images, ...newImages])
    }
    
    const deleteImage = (index) => {
        // const newArr = [...images]
        // const newhhh = newArr.filter( (img, ind) => {    // ITTT WORKEDDDDDDDDDDDDD ALTERNATIVE 1
        //     return  ind !== index
        // } )
        // setImages(newhhh)
       
        const newArr = [...images]
        newArr.splice(index, 1)
        setImages(newArr)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(user.user.role !== 'admin' ) {
           return dispatch({ type: 'NOTIFY', payload: {error: 'Not an admin' } })
        }
        if( !product_id || !title || !price || !inStock || !description || !content || category === 'all' || images.length === 0 ) {
            return dispatch({ type: 'NOTIFY', payload: { error : "Please add all the fields" } })
        }
             
        dispatch({ type: 'NOTIFY', payload: { loading : true } })
        let media = []
        const imgNewURL = images.filter( (img) => {
            return !img.url
        } )
        const imgOldURL = images.filter( (img) => {
            return img.url
        } )
        
        if(imgNewURL.length > 0) {
            media = await ImageUpload(imgNewURL, CUP, CN, CA)
            console.log('image uploadddddddddddddddd')
        }

        if(onEdit){
            try{
                console.log('data putttt fetchinggggggggg nowwww')
                const res = await axios.put(`${baseUrl}/product/${id}`, {...product, images: [...imgOldURL, ...media] }  ,{  headers: {
                'Authorization': `Bearer ${user.access_token} `
              }} ) 
    
              dispatch({ type: 'NOTIFY', payload: { loading : false} })
              dispatch({ type: 'NOTIFY', payload: { success : res.data.msg } })
    
            }
            catch (error) {
                console.log({error})
                dispatch({ type: 'NOTIFY', payload: { error : error.response.data.error } })
            }
        } else{
            try{
                console.log('data fetchinggggggggg nowwww')
                const res = await axios.post(`${baseUrl}/product`, {...product, images: [...imgOldURL, ...media] }  ,{  headers: {
                'Authorization': `Bearer ${user.access_token} `
              }} ) 
    
              dispatch({ type: 'NOTIFY', payload: { loading : false} })
              dispatch({ type: 'NOTIFY', payload: { success : res.data.msg } })
    
            }
            catch (error) {
                console.log({error})
                dispatch({ type: 'NOTIFY', payload: { error : error.response.data.error } })
            }
        }


        
    }


    
    return (
        <>
        <div className="products_manager" >
            <Head>
                <title> Product Manager </title>
            </Head>
            
            <form className="row" onSubmit={handleSubmit} >
                <div className="col-md-6" >
                   <input type="text" name="product_id" value={product_id} placeholder="Product ID" className="d-block my-4 w-100 p-2" onChange={handleChangeInput} /> 
                   <input type="text" name="title" value={title} placeholder="Title" className="d-block my-4 w-100 p-2" onChange={handleChangeInput} /> 
                </div> 

                <div className="row" >
                    <div className="col-sm-6" >
                        <label htmlFor="price" > Price </label>
                       <input type="number" name="price" value={price} placeholder="Price" className="d-block w-100 p-2" onChange={handleChangeInput} />
                    </div>

                    <div className="col-sm-6" >
                       <label htmlFor="price" > In Stock </label>
                       <input type="number" name="inStock" value={inStock} placeholder="inStock" className="d-block w-100 p-2" onChange={handleChangeInput} />
                    </div>
                </div>   

                <textarea name="description" id="description" cols="30" rows="4" value={description} placeholder="Description" className="d-block my-4 w-100 p-2"  onChange={handleChangeInput} />
                <textarea name="content" id="content" cols="30" rows="4" value={content} placeholder="Content" className="d-block my-4 w-100 p-2"  onChange={handleChangeInput} />

                <div className="input-group-prepend px-0 my-2">
                    <select name="category" id="category" value={category} onChange={handleChangeInput} className="custom-select text-capitalize" >
                        <option value="all"> All Products </option>
                        {
                            categories.map( (category) => (
                               <option key={category._id} value={category._id}> {category.name} </option>
                            ))
                        }
                    </select>
                </div>

                <div className="col-md-6 my-4" >
                     <div className="input-group mb-3" >
                        <div className="input-group-prepend" >
                            <span className="input-group-text"> Upload </span>
                        </div>
                        <div className="custom-file border rounded" >
                            <input type="file" className="custom-file-input" 
                            onChange={handleUploadInput} multiple accept="image/*" />
                        </div>
                     </div>

                     <div className="row img-up mx-0" >
                         {
                            images.map( (img, index) => (
                                <div key={index} className="file_img my-1">
                                    <img src={img.url? img.url : URL.createObjectURL(img) } alt="" className="img-thumbnail rounded" /> 
                                    <span onClick={ () => deleteImage(index) } >X</span> 
                                </div>    
                            ) )
                         } 
                     </div>

                </div>  
                <button type="submit" className="btn btn-info mb-3 px-4" > { onEdit? 'Update' : 'Create' } </button>
            </form>
              
        </div>
        
        </>
    )
}


export function getServerSideProps ({req,res}) {
    let CLOUD_UPDATE_PRESET = process.env.CLOUD_UPDATE_PRESET
    let CLOUD_NAME  = process.env.CLOUD_NAME
    let CLOUD_API = process.env.CLOUD_API
    return {
        props: { CUP : CLOUD_UPDATE_PRESET,
                 CN :  CLOUD_NAME,
                 CA : CLOUD_API  
        }
    }
 
 }