import { useEffect, useState } from "react"
import { supabase } from "../supabase-client"
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";



function TasksManager({ userData }: any) {

    interface Task {
        id: number;
        title: string;
        description: string;
        created_at: string;
        user_id: string;
    }

    const navigate = useNavigate();
    const emptyTask = { title: "", description: "" }
    const [newTask, setNewTask] = useState(emptyTask)
    const [tasks, setTasks] = useState<Task[]>([])
    const [newDescription, setNewDescription] = useState("");



    const fetchTasks = async () => {
        const { error, data } = await supabase
            .from("tasks")
            .select("*")
            .eq('user_id', userData.id)
        if (error) {
            console.error("An errur occured while trying to select the tasks to the db", error.message)
        } else {
            setTasks(data)
        }
    }

    const deleteTask = async (id: number) => {

        const { error } = await supabase.from("tasks").delete().eq("id", id).eq("user_id", userData.id);
        if (error) {
            console.error("Error deleting task : ", error.message)
        } else {
            setTasks((prev) => prev.filter((task) => task.id !== id));
        }
    }

    useEffect(() => {
        if (!userData) return;
        fetchTasks();
    }, [userData]);

    console.log(tasks)

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const { error, data } = await supabase.from("tasks").insert({ ...newTask, user_id: userData.id }).select().single()
        if (error) {
            console.error("An orrur occured while trying to insert the task to the db", error.message)
            return
        } else {
            setNewTask(emptyTask)
            setTasks(prev => [...prev, data])
        }
    }


    const updateTask = async (id: number) => {
        const { error } = await supabase
            .from('tasks')
            .update({ description: newDescription }).eq("id", id).eq("user_id", userData.id)
        if (error) {
            console.error("Erro trying to update the description ", error)
        } else {

            setTasks(prev =>
                prev.map((task) => task.id === id ? { ...task, description: newDescription } : task)
            )
            setNewDescription("");
        }
    }


    const handleLogOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            toast.error("Error " + error)
        }
        toast.success("Log out successfully !")
        navigate(-1);
        navigate("/login")
    }
    return <>

        <div className="  max-w-full p-16 h-200 flex flex-col  justify-center items-center gap-8 ">
            <h1 className="text-5xl font-bold  ">Task manager of {userData.user_metadata?.name} </h1>
            <form
                className=" w-80  space-y-5"
                onSubmit={handleSubmit}>

                <input type="text"
                    className="border rounded-md h-9 w-full pl-2 "
                    placeholder="Task Title"
                    onChange={(e) =>
                        setNewTask((prev) => ({ ...prev, title: e.target.value }))

                    } />

                <textarea
                    className="border rounded-sm h-15 w-full pl-2 p-0.5 "
                    placeholder="Task description"
                    onChange={(e) =>
                        setNewTask((prev) => ({ ...prev, description: e.target.value }))
                    } />

                <div className=" flex flex-row justify-center gap-7">
                    <button className="btn btn-primary" type="submit">
                        Add task
                    </button>
                    <button className="btn btn-error" type="button"
                        onClick={handleLogOut}>
                        Logout
                    </button>
                </div>


            </form>

            <ul className="max-w-5xl mx-auto  flex flex-row gap-5 ">
                {tasks.map((task, key) => {

                    return <li key={key} className="card bg-black shadow-xl border border-base-200 mb-6 w-full ">
                        <div className="card-body p-15">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="card-title text-2xl font-bold text-primary">{task.title}</h3>
                                    <p className="text-base-content/70 mt-1">{task.description}</p>
                                </div>

                            </div>

                            <div className="divider"></div>

                            <div className="flex flex-col gap-4">
                                <textarea
                                    className="textarea textarea-bordered textarea-primary w-full leading-relaxed"
                                    placeholder="Updated description ..."
                                    onChange={(e) => setNewDescription(e.target.value)}
                                />

                                {/* Actions */}
                                <div className="card-actions justify-end gap-2 mt-2">
                                    <button className="btn btn-primary btn-outline flex-1 sm:flex-none"
                                        onClick={() => updateTask(task.id)}>
                                        Edit
                                    </button>
                                    <button className="btn btn-error flex-1 sm:flex-none"
                                        onClick={() => deleteTask(task.id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                })}

            </ul>
        </div>


    </>
}
export default TasksManager
