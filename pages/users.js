import Head from 'next/head'
import { useContext, useEffect } from 'react'
import { DataContext } from '../store/GlobalState'
import {useRouter} from 'next/router'
import Link from 'next/link'

export default function Users () {

    const router = useRouter()
    const { state, dispatch } = useContext(DataContext)
    const { user, users, modal} = state
 

    return (
        <>
        { user.user ?
          <div className="table-responsive" > 
             <Head>
                 <title> Users </title>
             </Head>

             <table className="table w-100" >
                <thead>
                    <tr>
                       <th>  </th>
                       <th> ID </th>
                       <th> Avatar </th>
                       <th> Name </th>
                       <th> Email </th>
                       <th> Admin </th>
                       <th> Action </th>
                    </tr>
                </thead>
                <tbody>
                    {
                       users.map( (userr, index) => (
                        <tr key={userr._id} style={{cursor: 'pointer'}} >
                            <td> { index + 1 } </td>
                            <td> {userr._id} </td>
                            <td> 
                              <img src={userr.avatar} alt={userr.avatar} style={{width: '30px', height: '30px', overflow: 'hidden', objectFit:'cover' }} />
                            </td>
                            <td> {userr.name} </td>
                            <td> {userr.email} </td>
                            <td> 
                              {
                                userr.role === 'admin'
                                ? userr.root? <i className="fas fa-check text-success"> Root </i> 
                                :  <i className="fas fa-check text-success"></i>
                                :  <i className="fas fa-times text-danger"></i>
                              } 
                            </td>
                            <td> 
                               <Link href={ user.user.root && user.user.email !== userr.email ? `/edit_user/${userr._id}`: '#!' }>
                                  <a> <i className="fas fa-edit text-info mr-2" title="Edit"></i> </a>
                               </Link>

                               { user.user.root && user.user.email !== userr.email ? 
                                  <i className="fas fa-trash-alt text-danger ml-2" title="Remove"
                                 data-toggle="modal" data-target="#exampleModal" 
                                 onClick={() => { dispatch({ 
                                  type: 'ADD_MODAL',
                                  payload: [{ data: users, id: userr._id, title:userr.name, type: 'ADD_USERS' }]
                                 }) } } ></i>
                                 : <i className="fas fa-trash-alt text-danger ml-2" title="Remove"></i>
                               } 

                            </td>
                        </tr>
                       ) )
                    }
                </tbody>

             </table>

          </div> : <p></p> }
        </>
    )

}
