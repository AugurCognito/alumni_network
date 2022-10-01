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

    return <>
        <Head />
        <Header />
        {messages?.data ?
            <>
                {messages?.data.map(message => {
                    console.log(message)
                    return <>
                        {message.profiles.email}<br/>{message.content}<br/>{(new Date(message.created_at).toLocaleString())}
                    </>
                }
                )
                }
            </>
            :
            <>Loading...</>
        }
    </>
}

export default User_profile