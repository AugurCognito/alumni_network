import Header from '../components/header'
import Head from '../components/head'

import React, { useState, useEffect } from 'react';
import { RequireAuth, useUser } from '../hooks/authUser'
import { supabase } from '../utils/initSupabase'


export default function profile() {
  const { user, error } = useUser()

  const [usrprofile, setProfile] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    if (user) fetchProfile()
  }, [user])

  const fetchProfile = async () => {
    let profile = await supabase.from("profiles").select("*,branch(*)").eq('id', user.id)
    if (profile.error) {
      console.log('error', error)
      alert('Error:', error)
    }
    setProfile(profile.data)


    setLoading(false)
  }

  return (
    <>
      <Head />

      <Header />
      {console.log(">>", usrprofile)}
      <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 h-screen">
        {isLoading ? <p>Loading...</p>
          :
          <>
            {usrprofile ? <>

              <div className="p-16 flex justify-center">
                <div className="p-8 bg-white shadow mt-18 rounded-lg lg:w-3/5">
                  <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="relative">
                      <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                        {usrprofile[0].avatar ?
                          <img src={`https://hhwsjrpyfypmiacusavr.supabase.co/storage/v1/object/public/${usrprofile[0].avatar}`} height="200" width="200" alt="user profile image" className="rounded-full" />
                          :
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>}
                      </div>
                    </div>


                  </div>

                  <div className="mt-30` text-center border-b pb-12 md:mt-20">
                    <h1 className="text-4xl font-medium text-gray-700">{usrprofile[0].first_name} {usrprofile[0].last_name}</h1>
                    <p className="font-light text-gray-600 mt-3">{usrprofile[0].city}, {usrprofile[0].state}</p>
                    <p className="font-light text-gray-600 mt-3">{usrprofile[0].branch.branch_name}, {usrprofile[0].passing_year}</p>

                    <p className="mt-8 text-gray-500">{usrprofile[0].position}</p>
                    <a href={usrprofile[0].company_website} className="mt-2 text-gray-500">{usrprofile[0].company_name}</a>
                  </div>

                  <div className="mt-12 flex flex-col justify-center">
                    <p className="text-gray-600 text-center font-light lg:px-16">{usrprofile[0].about}</p>
                  </div>

                </div>
              </div>
            </> : <></>}
          </>
        }
      </main>
    </>
  )
}



