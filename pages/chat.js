import Header from '../components/header'
import Head from '../components/head'

import { RequireAuth, useUser } from '../hooks/authUser'
import { supabase } from '../utils/initSupabase'
import { useEffect, useState } from 'react'
import Link from 'next/link'


const Settings = () => {
    const { user, error } = useUser()
    const [sentChat, setSentChat] = useState()
    const [recChat, setRecChat] = useState()

    useEffect(() => {
        chatFetch()
    }, [user])
    async function chatFetch() {
        let rec = await supabase.from("chat").select("*,profiles!sender(*)").eq("receiver", user.id)
        let sen = await supabase.from("chat").select("*,profiles!receiver(*)").eq("sender", user.id)
        setSentChat(sen)
        setRecChat(rec)
    }
    return (
        <>
            <Head />
            <Header />
            <main className="mt-4 mx-auto max-w-7xl px-4 sm:mt-10 sm:px-6 md:mt-12 lg:mt-18 lg:px-8 xl:mt-18 pb-10">
                Recieved Chat:
                <div>
                {recChat?.data != null ?
                        recChat?.data.map(chat => {
                            console.log(chat)
                            return <>
                                This conversation was started by {chat.profiles.email}
                                <br />
                                <Link className='btn btn-info' href={`/chat/${chat.id}`}>Click here to continue your chat</Link>
                            </>
                        })
                        :
                        <>No Chat</>
                    }
                </div>
                Sent Chat
                <div>
                    {sentChat?.data != null ?
                        sentChat?.data.map(chat => {
                            console.log(chat)
                            return <>
                                You started this conversation with {chat.profiles.email}
                                <br />
                                <Link className='btn btn-info' href={`/chat/${chat.id}`}>Click here to continue your chat</Link>
                            </>
                        })
                        :
                        <>No Chat</>
                    }
                </div>
            </main>
        </>
    )
}

export default Settings