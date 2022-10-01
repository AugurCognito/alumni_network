import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { supabase } from "../../utils/initSupabase";

import Header from '../../components/header'
import Head from '../../components/head'
import Post_card from "../../components/post_container/post";

const User_profile = () => {
    const router = useRouter()
    const { id } = router.query

    const [post, setPost] = useState()
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        fetchPost()
    }, [id])
    const fetchPost = async () => {
        console.log(id)
        let post = await supabase.from("post").select("*,company(*),comments(*,profiles(*)),profiles(*)").eq("id", id)
        console.log(post)
        setPost(post)
    }


    return <>
        <Head />
        <Header />
        {post ?

            <>{post.data ?
                < Post_card post={post.data[0]} />
                :
                <>{post.error.message}</>}
            </>
            :
            <>Loading...</>
        }
    </>
}

export default User_profile