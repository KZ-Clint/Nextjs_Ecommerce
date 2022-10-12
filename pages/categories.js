import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'
import { DataContext } from '../store/GlobalState'
import { updateItem } from '../store/Actions'
import axios from 'axios'
import {useRouter} from 'next/router'
import Link from 'next/link'

export default function Users () {

    const [ name, setName ] = useState('')   

    const {  state, dispatch } = useContext(DataContext)
    const { categories, user } = state

    const [ id, setId ] = useState('')

    const createCategory = async() => {
       if( user.user.role !== 'admin' ) {
         return dispatch({ type: 'NOTIFY', payload: {error: 'Authentication is not valid' } })
       }
       if(!name) {
         return dispatch({ type: 'NOTIFY', payload: {error: 'Name can not be left blank' } })
       }

       if(!id) {
       dispatch({ type: 'NOTIFY', payload: {loading: true } })
       try {
        const res = await axios.post('http://localhost:5000/categories/', { name }  ,{  headers: {
            'Authorization': `Bearer ${user.access_token} `
          }} ) 
          dispatch({ type: 'NOTIFY', payload: {loading: false } })
          dispatch({ type: 'NOTIFY', payload: {success: res.data.msg } })
          dispatch({ type: 'ADD_CATEGORY', payload: [...categories, res.data.newCategory] })
       }
       catch (error) {
        dispatch({ type: 'NOTIFY', payload: {loading: false } })
        dispatch({ type: 'NOTIFY', payload: {error: error.response.data } })
       }
    }

    if(id) {
        dispatch({ type: 'NOTIFY', payload: {loading: true } })
        try {
         const res = await axios.put(`http://localhost:5000/categories/${id}`, { name }  ,{  headers: {
             'Authorization': `Bearer ${user.access_token} `
           }} ) 
           dispatch({ type: 'NOTIFY', payload: {loading: false } })
           dispatch({ type: 'NOTIFY', payload: {success: res.data.msg } })

           dispatch(updateItem( categories, id, res.data.newCategory, 'ADD_CATEGORY' ) )
        }
        catch (error) {
         dispatch({ type: 'NOTIFY', payload: {loading: false } })
         dispatch({ type: 'NOTIFY', payload: {error: error.response.data } })
        }
     }
     setName('')
     setId('')   
    }

    const handleEditCategory = (category) => {
        console.log(category)
        setId(category._id)
        setName(category.name)
    }

    


    return (
        <>
          <div className="table-responsive" > 
             <Head>
                 <title> categories </title>
             </Head>
             <div className="input-group mb-3"> 
                 <input type="text" className="form-control" 
                 placeholder="Add a new category" value={name} onChange={ (e) => { setName(e.target.value) } } />
                  <button className="btn btn-secondary ml-1"
                  onClick={createCategory} 
                   > { id ? "Update": "Create" } </button>
             </div>
              {
                 categories.map( (category) => (
                    <div key={category._id} className="card my-2 text-capitalize" >
                        <div className="card-body d-flex justify-content-between" >
                            {category.name}
                            <div style={{ cursor: 'pointer' }} >
                                <i className="fas fa-edit mr-2 text-info"
                                onClick={ () => { handleEditCategory(category) } }></i>
                                <i className="fas fa-trash mr-2 text-danger"
                                 data-toggle="modal" data-target="#exampleModal" 
                                 onClick={() => { dispatch({ 
                                  type: 'ADD_MODAL',
                                  payload: [{ data: categories, id: category._id, title:category.name, type: 'ADD_CATEGORY' }]
                                 }) } }></i>
                            </div>    
                        </div>    
                    </div>    
                 ) )
              } 
           </div>
        </>
    )

}
