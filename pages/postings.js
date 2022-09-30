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
        let posts = await supabase.from("post").select("*,company(*),comments(*,profiles(*))")
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

                Companies
                {isLoading ? <p>Loading...</p> :

                    // <Post_container posts={companies} />
                    <>
                        <div className="post-container flex justify-center">
                            <div class=" rounded overflow-hidden border w-full mx-auto lg:w-6/12 md:w-6/12 bg-white md:mx-0 lg:mx-0">
                                <div class="w-full flex justify-between p-3">
                                    <div class="flex">
                                        <div class="rounded-full h-12 w-12 bg-gray-500 flex items-center justify-center overflow-hidden my-auto">
                                            <img src="https://avatars0.githubusercontent.com/u/38799309?v=4" alt="profilepic" />
                                        </div>

                                        <div className='flex flex-col'>
                                            <span class="pt-1 ml-2 font-bold text-black">braydoncoyer</span>
                                            <span className='ml-2 text-gray-700'>CEO, Berzogar Inc.</span>
                                        </div>
                                    </div>

                                </div>
                                <img class="w-full bg-cover" src="https://3.bp.blogspot.com/-Chu20FDi9Ek/WoOD-ehQ29I/AAAAAAAAK7U/mc4CAiTYOY8VzOFzBKdR52aLRiyjqu0MwCLcBGAs/s1600/DSC04596%2B%25282%2529.JPG" />
                                <div class="px-3 pb-2">
                                    <div class="pt-2">
                                        <i class="far fa-heart cursor-pointer"></i>
                                        <span class="text-sm text-gray-400 font-medium">12 likes</span>
                                    </div>
                                    <div class="pt-1">
                                        <div class="mb-2 text-sm">
                                            <span class="font-medium mr-2">braydoncoyer</span> Lord of the Rings is my favorite film-series. One day I'll make my way to New Zealand to visit the Hobbiton set!
                                        </div>
                                    </div>
                                    <div class="text-sm mb-2 text-gray-400 cursor-pointer font-medium">View all 14 comments</div>
                                    <div class="mb-2">
                                        <div class="mb-2 text-sm">
                                            <span class="font-medium mr-2">razzle_dazzle</span> Dude! How cool! I went to New Zealand last summer and had a blast taking the tour! So much to see! Make sure you bring a good camera when you go!
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </>
                }
            </main>
        </>
    )
}