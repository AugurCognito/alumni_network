import Header from '../components/header'
import Head from '../components/head'

import React, { useState, useEffect } from 'react';
import { RequireAuth, useUser } from '../hooks/authUser'
import { supabase } from '../utils/initSupabase'
import Post_container from '../components/post_container';
import profile from './profile';

export default function posts() {
    const { user, error } = useUser()

    const [companies, setCompanies] = useState(null)
    const [is_employer, set_employer_status] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [profile, setProfile] = useState(null)

    useEffect(() => {
        setLoading(true)
        fetchPosts()
        if (user) {
            fetchProfile()
        }
    }, [user])

    const fetchPosts = async () => {
        let posts = await supabase.from("post").select("*,company(*),comments(*,profiles(*)),profiles(*)")
        if (posts.error) console.log('error', error)
        else setCompanies(posts.data)
        setLoading(false)
    }
    const fetchProfile = async () => {
        let profile = await supabase.from("profiles").select("*,company(*)").eq('id', user.id)
        if (profile.error) {
            alert('Error:', error)
        }

        else set_employer_status(profile.body[0].is_employer)
        setProfile(profile)
        setLoading(false)
    }
    const createPost = async event => {
        event.preventDefault()
        console.log(event.target)
        console.log(profile)
    }

    return (
        <>
            <Head />

            <Header />

            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 h-screen">

                {/* For create post pop-up */}
                {is_employer ? <>
                    <label htmlFor="my-modal-4" className="btn modal-button">Create Post</label>

                    <input type="checkbox" id="my-modal-4" className="modal-toggle" />
                    <label htmlFor="my-modal-4" className="modal cursor-pointer  modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Create Post</h3>
                            <form className='p-3 ' onSubmit={createPost}>
                                <br />
                                <select className="select select-primary w-full max-w-xs" name="company">
                                    <option disabled selected>Select you company?</option>
                                    {profile.data[0].company.map((company) => {
                                        return <>
                                            <option value={company.id}>{company.name}</option>
                                        </>
                                    })}
                                </select>
                                <label class="block">
                                    <span class="sr-only">Choose File</span>
                                    Media:<input name="media" type="file" class="m-2 block input-bordered input-primary w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                                </label>
                                <br />
                                <textarea className="textarea textarea-info w-3/4 resize rounded-md m-1" name="about" placeholder="Content of Your Post"></textarea>
                                <br />
                                <button type="submit" className='btn btn-primary m-1'>Create</button>
                            </form>

                        </div>
                    </label>
                </> : <></>
                }

                {isLoading ? <p>Loading...</p> :

                    <>
                        <Post_container posts={companies} />
                    </>
                }
            </main>
        </>
    )
}