
import styles from './index.module.scss'
import "../app/globals.css"
import Link from 'next/link'
import Head from 'next/head'

import { getServerSession } from "next-auth/next"
import { authOptions } from "/pages/api/auth/[...nextauth]"
import { useSession } from "next-auth/react"

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Secure({streamerData}) {

    const { data: session } = useSession()
    /* console.log("streamerData");
    console.log(streamerData); */

    if (typeof window === "undefined") return null

    if (session) {
        return (
            <main className={styles.main}>
            <h1>Secured Page</h1>
            <p>{session.user.email}</p>
            <p>Account Type: {streamerData[0].accountType}</p>
              <Link href="/">home</Link>
          </main>
        )
    }



      
      return (
        <main className={styles.main}>
        <Head>
            <title>NOT LOGGED IN</title>
        </Head>
        <h1>Not Logged In - Secured Page</h1>
        <p>go back home and log in first</p>
          <Link href="/">home</Link>
      </main>
    )
}


export async function getServerSideProps(context) {

    let session = await getServerSession(context.req, context.res, authOptions);
    let data = null;
    let resturnedData = null;
    if (session) {
        console.log("fetch data for user id - " + session.user.id);

        const response = await fetch(`http://localhost:3000/api/getDatabaseData`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            //body: JSON.stringify(data)
          }).catch((error) => {
              console.error('Error:', error);
          }); 

          const resturnedData = await response.json().catch((error) => {
            console.error('Error:', error);
        });
        
        return {
            props: {
              session: session,
              streamerData: resturnedData
            },
          }
    } else {

        //Not Signed In...
        return {
            props: {
                session: session,
                streamerData: resturnedData
            },
        }
    }
  }
  
  