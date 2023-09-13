"use client"
import { useEffect, useState } from 'react'
type TODO = {
    _id?: string,
    task: string,
    desc: string,
    createAt?: string,
    updateAt?: string,
    _v?: string
}

const TodoTable = () => {

    const [allTodos, setAllTodos] = useState<TODO[]>([])
    const getTodo = async () => {
        const res = await fetch("/api/todo", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const { result } = await res.json()
        console.log(result);
        setAllTodos(result)

    }
    useEffect(() => {
        getTodo()
    }, [])

    const deleteTodo = async () => {
        const [deleted, setDeleted] = useState([])
        const res = await fetch("/api/todo", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const { result } = await res.json()
        console.log(result);
        setDeleted(result)

    }
    useEffect(() => {
        deleteTodo()
    }, [])

    return <>
        {
            allTodos.map(item => <div className='flex gap-5 ' key={item._id}>
                <h1> {item.task}</h1>
                <button >delete</button>
            </div>)
        }
    </>
}

export default TodoTable