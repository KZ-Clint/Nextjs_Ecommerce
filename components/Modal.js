import { useContext } from 'react'
import { DataContext } from '../store/GlobalState'
import { deleteItem } from '../store/Actions'
import axios from 'axios'
import {useRouter} from 'next/router'
import baseUrl from './base/baseUrl'

export default function Modal () {

    
    const { state, dispatch } = useContext(DataContext)
    const { modal, user } = state

    const router = useRouter()

    const deleteUser = async (item) => {
        const res = await axios.delete(`${baseUrl}/user/users/adminusers/delete/${item.id}`, {  headers: {
            'Authorization': `Bearer ${user.access_token} `
        }} )
        console.log(res.data.msg)
    }

    const deleteCategory = async (item) => {
        try { 
        const res = await axios.delete(`${baseUrl}/categories/${item.id}`, {  headers: {
            'Authorization': `Bearer ${user.access_token} `
        }} )
        dispatch( { type: 'NOTIFY', payload:{ success: res.data.msg } } )
        } 
        catch (error) {
            console.log({error:error})
            return dispatch({ type: 'NOTIFY', payload: { error : error.response.data.error } })
        }
    }

    const deleteProduct = async (item) => {
        const res = await axios.delete(`${baseUrl}/product/${item.id}`, {  headers: {
            'Authorization': `Bearer ${user.access_token} `
        }} )
        console.log(res.data.msg)
        dispatch( { type: 'NOTIFY', payload:{ success: res.data.msg } } )
        return router.push('/')
    }

   const handleSubmit = async () => {
    if( modal.length !== 0 ) {
        for( const item of modal ) {
            if( item.type === 'ADD_USERS' ) {
                return deleteUser(item)
              } 
              if( item.type === 'ADD_CATEGORY' ) {
                return deleteCategory(item)
              } 
              if( item.type === 'DELETE_PRODUCT' ) {
                  deleteProduct(item)
              } 
              if( item.type === 'ADD_CART' ) {
                dispatch( deleteItem(item.data, item.id, item.type ) )
              }
            
              dispatch( { type: 'ADD_MODAL', payload: [] } ) 
        }
        }
   } 

    return (
        <>        
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel"> { modal.length !== 0 && modal[0].title  } </h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    Do you want to delete this item
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleSubmit} > Yes </button>
                    <button type="button" className="btn btn-primary" data-dismiss="modal" > Cancel </button>
                </div>
                </div>
            </div>
            </div>
        </>
    )
}