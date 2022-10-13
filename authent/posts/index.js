
// import React, {useEffect, useState} from 'react'

// export default function PostList ({posts}) {
//     console.log({posts})

//     const [posts, setPosts] = useState([]) 

//     useEffect( () => {
//         const responsePosts = async () =>  {
//            const response = await fetch('https://jsonplaceholder.typicode.com/posts')
//             const data = await response.json()
//             setPosts(data)
//         }
        
//         responsePosts()
//     },[] )

//     return (
//         <>
//           <h1> List of post {posts.summary_event_points
// } </h1>
//           {
//              [].map( (post) => {
//                 return (
//                     <div key={post.id} >
//                         <Link href={`posts/${post.id}`} >
//                            <h2> {post.id} {post.points} </h2>
//                         </Link>
//                         <hr />
//                     </div>
//                 )
//              } )
//           }
//         </>
//     )
// }

// export async function getStaticProps () {
//     const response = await fetch('https://fantasy.premierleague.com/api/entry/4791912/')
//     const data = await response.json()
//     console.log(data)
//     return {
//         props: {
//             posts:data
//         } 
//     }
// }

export async function getServerSideProps(context) {
    const res = await fetch(`https://.../data`)
    const data = await res.json()
    // or use context.resolvedUrl for conditional redirect
    // if(context.resolvedUrl == "/")
    if (!data) {
      return {
        redirect: {
          destination: '/hello-nextjs',
          permanent: false,
        },
      }
    }
  
    return {
      props: {}, // will be passed to the page component as props
    }
  }