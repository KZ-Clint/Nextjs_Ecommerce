import { Html, Head, Main, NextScript } from 'next/document'

export default function MyDocument() {
    return (
      <Html lang="en" >
        <Head>
            <meta name="description" content="Dev AT Ecommerce website with Next.js"/>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" />
            <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>
            <script src="https://kit.fontawesome.com/1994f5a4c0.js"></script>
            <script src={`https://www.paypal.com/sdk/js?client-id=${process.env.PAYPAL_CLIENT_ID}&currency=USD`}></script>
        </Head>
        <body>
            <Main/>
            <NextScript/>
        </body>
      </Html>
    )
  }