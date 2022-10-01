import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { supabase } from "../../utils/initSupabase";

import Header from '../../components/header'
import Head from '../../components/head'
import { useUser } from "../../hooks/authUser";


const User_profile = () => {
    const router = useRouter()
    const { id } = router.query
    const { user, error } = useUser()
    const [messages, setMessages] = useState()

    useEffect(() => {
        fetchMessages()
    }, [user, id]
    )
    async function fetchMessages() {
        const message = await supabase.from("message").select("*,profiles(*)").eq("room", id)
        setMessages(message)
    }
    async function sendMessage(e) {
        e.preventDefault()
        const message = await supabase.from("message").insert([{sender:user.id,content: e.target.chat.value,room:id}])
        fetchMessages()
        alert("Message Sent")
    }
    return <>
        <Head />
        <Header />
        {messages?.data ?
            <>
                {messages?.data.map(message => {
                    console.log(message)
                    return <>
                        <span className="font-bold">{message.profiles.email}</span><br />{message.content}<br /><span className="font-light">{(new Date(message.created_at).toLocaleString())}</span>
                        <hr/>
                    </>
                }
                )
                }
                <form onSubmit={e=>(sendMessage(e))}>
                    <textarea name="chat" className="textarea textarea-info" placeholder="Chat"></textarea>
                    <button className="btn">Submit</button>
                </form>
            </>
            :
            <>Loading...</>
        }
    </>
}

export default User_profile