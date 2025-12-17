import { useEffect, useState } from "react"
import TasksManager from "./components/TasksManager"
import { supabase } from "./supabase-client"




function App() {

  const [session, setSession] = useState<any>(null)

  const fetchSession = async () => {
    const currentSession = await supabase.auth.getSession();
    setSession(currentSession)
  }

  useEffect(() => {
    fetchSession()
    console.log(session)
  }
    , []
  )
  return <>
    <TasksManager />
  </>
}

export default App
