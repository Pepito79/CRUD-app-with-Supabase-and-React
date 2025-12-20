import { Routes, Route, Navigate } from "react-router-dom"
import SignUp from "./components/SignUp"
import Login from "./components/Login"
import { ToastContainer } from "react-toastify"
import TasksManager from "./components/TasksManager"
import { useEffect, useState } from "react"
import { supabase } from "./supabase-client"
import { type User } from "@supabase/supabase-js"


function App() {

  const [user, setUser] = useState<User | null>(null);


  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null)
    })

    const { data: listner } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => {
      listner.subscription.unsubscribe()
    }
  }, function App() {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
      supabase.auth.getSession().then(({ data }) => {
        setUser(data.session?.user || null)
      })

      const { data: listner } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setUser(session?.user ?? null)
        }
      )

      return () => {
        listner.subscription.unsubscribe()
      }
    }, [])

    return <>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable

      />

      <Routes>
        <Route path={"/"} element={<SignUp />} />
        <Route path={"/login"} element={<Login setUser={setUser} />} />
        <Route path={"/todoBoard"}
          element={user ? <TasksManager userData={user} /> : <Navigate to="/login" />} />
      </Routes>

    </>
  }

  )

  return <>
    <ToastContainer
      position="bottom-left"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnHover
      draggable

    />

    <Routes>
      <Route path={"/"} element={<SignUp />} />
      <Route path={"/login"} element={<Login setUser={setUser} />} />
      <Route path={"/todoBoard"}
        element={user ? <TasksManager userData={user} /> : <Navigate to="/login" />} />
    </Routes>

  </>
}

export default App
