import cookie from 'cookie'

export default ( req, res ) => {
    console.log('kjdjddddd')
    console.log({token:req.body})
    res.setHeader( "Set-Cookie", cookie.serialize("token", JSON.stringify(req.body.token), {
        httpOnly : true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 60*60,
        sameSite: "strict",
        path: "/"
    } ) )
    
    res.statusCode = 200
    res.json( { success: true } )
}