// import React, {useEffect, useState} from 'react'
// import {useRouter} from 'next/router'

export default function Post ({post}) {

    // const [post, setPosts] = useState([]) 
    // const router = useRouter()
    // const {postId} = router.query

    // useEffect( () => {
    //     const responsePosts = async () =>  {
          
    //         const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    //         const data = await response.json()
    //         setPosts(data)
    //     }
        
    //     responsePosts()
    // },[] )

    return (
        <>
          <h2> {post.id} {post.title} </h2>
          <p> {post.body} </p>
        </>
    )
}

export async function getStaticPaths () {

    // const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    // const data = await response.json()

    // const paths = data.map( (post) => {
    //     return {
    //         params : {
    //             postId : `${post.id}`
    //         }
    //     }
    // } )

    return {
        paths: [
            {
                params : { postId: '1' }
            },
            {
                params : { postId: '2' }
            },
            {
                params : { postId: '3' }
            },
        ],
       
        fallback: 'blocking' ,
    }
}

export async function getStaticProps (context) {
    
    const { params } = context
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`)
    const data = await response.json()

    console.log(`Generating page for /posts/${params.postId}`)

    return {
        props: {
            post:data
        } 
    }
    
}

