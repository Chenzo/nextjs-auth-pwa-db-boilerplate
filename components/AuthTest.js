import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect } from "react"
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function AuthTest() {


  if (typeof window === "undefined") return null

  const { data: session } = useSession();

  useEffect(() => {
    console.log('sessioned');
    console.log(session);
  }, [session]);

  /* useEffect(() => {
    console.log('make DB call now');
  }, []); */

  const { data, error } = useSWR('/api/getDatabaseData', fetcher);

  if (error) {
    console.log("ERROR SOMEWHERE");
    console.log(error);
  }

  if (data) {
   /*  console.log("DATA");
    console.log(data); */
  } else {
    console.log("NO DATA - still loading");
    /* if (!data) return <div>Loading...</div> */
  }

  useEffect(() => {
    console.log('DATADATADATADATA');
  }, [data]);
  
  if (session) {

    console.log('session');
    console.log(session);
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
      {data && <div>{data[0].name}</div>}
    </>
  )
}