
import { useEffect, useState } from "react"
import Auth from "./components/Auth"
import TasksManager from "./components/TasksManager"
import { supabase } from "./supabase-client"




function App() {

  const [isSignIn, setSignIn] = useState(true)


  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSignIn(!!session)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSignIn(!!session);
    })

    return () => subscription.unsubscribe();
  }, [])
  return <>
    {/* {!isSignIn ? <Auth /> : <TasksManager />} */}
    <TasksManager />
  </>
}

export default App
