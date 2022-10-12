import axios from 'axios'
import { createContext, useReducer, useEffect } from 'react'

export const DataContext = createContext()

const reducer = (state, action) => {
    switch(action.type){
        case 'NOTIFY':
            return {
                ...state,
                notify: action.payload
            }
        case 'AUTH':
            return {
                ...state,
                user: action.payload
            }
        case 'ADD_CART':
            return {
                ...state,
                cart: action.payload
            }
        case 'ADD_MODAL':
            return {
                ...state,
                modal: action.payload
            }
        case 'ADD_ORDERS':
            return {
                ...state,
                orders: action.payload
            }  
        case 'ADD_USERS':
            return {
                ...state,
                users: action.payload
            }  
        case 'ADD_CATEGORY':
            return {
                ...state,
                categories: action.payload
            }  
        default: 
          return state;

        }
    }

export const DataProvider = ({children}) => {

    const initialState = { notify: {}, user: {},cart:[], modal:[], orders:[], users: [], categories:[] }
    const [state, dispatch] = useReducer(reducer, initialState)
    const {cart, user} = state

    useEffect( () => {
        const user1 = JSON.parse(localStorage.getItem('user') )
  
        if (user1) {
          dispatch({ type:'AUTH', payload: user1 })
        }
  
     },[] )
    

     useEffect( () => {
        const cart01 = JSON.parse(localStorage.getItem('cart01') )
     
        if (cart01 ) {
          dispatch({ type:'ADD_CART', payload: cart01 })
           console.log(cart01)
           console.log('gottttttttttttttttttttttttttttttttttttttttttennnnnnnnnnnnnnnnn')
        }
  
     },[] )

     useEffect( () => {
        const getO = async () => {
            if(user.access_token) {
                try {
                    const res = await axios.get('http://localhost:5000/order/', {  headers: {
                        'Authorization': `Bearer ${user.access_token} `
                      }} )
                   dispatch({type: 'ADD_ORDERS', payload:res.data.orders})
                }
                catch (error) {
                    console.log( {error: error})
                    return dispatch({ type: 'NOTIFY', payload: error.response.data })
                }         
                
                if( user.user.role === 'admin' ) {
                    try {
                        const res = await axios.get('http://localhost:5000/user/users', {  headers: {
                            'Authorization': `Bearer ${user.access_token} `
                          }} )
                        dispatch({type: 'ADD_USERS', payload: res.data.users})
                    }
                    catch (error) {
                        console.log( {error: error})
                        return dispatch({ type: 'NOTIFY', payload: error.response.data })
                    }
                }
                  else {
                    dispatch({ type: 'ADD_USERS', payload: [] })
                  }
              } else {
                dispatch({ type: 'ADD_ORDERS', payload: [] })
              }

        }
        getO()
  
     },[user.access_token] )

     
     useEffect( () => {
  
        const getC = async () => {
            if(user.access_token) {
            try {
                const res = await axios.get('http://localhost:5000/categories', {  headers: {
                    'Authorization': `Bearer ${user.access_token} `
                  }} )
                  dispatch({ type:'ADD_CATEGORY', payload: res.data.categories })
                  console.log("jdjjjjjjjjjjjjjjjjjjjjjjj")
            }
            catch (error) {
                console.log( {error: error})
                return dispatch({ type: 'NOTIFY', payload: error.response.data })
            }
          } 
       }
       getC()

     },[user.access_token] )


    console.log("AuthContext", state )

    return(
        <DataContext.Provider value={{state, dispatch}} >
            {children}
        </DataContext.Provider>
    )
}