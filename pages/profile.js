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
    let profile = await supabase.from("profiles").select("*").eq('id', user.id)
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
        Profile
        {isLoading ? <p>Loading...</p>
          :
          <>
            {usrprofile ? <>
              <div className='grid-rows-2'>
                <div>Name:{usrprofile[0].first_name}</div>
                <div>Email:</div>
                <div>Date Site Joined:</div>
              </div>
              <div >About:</div>
            </> : <></>}
          </>
        }
      </main>
    </>
  )
}



