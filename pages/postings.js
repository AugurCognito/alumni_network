import Header from '../components/header'
import Head from '../components/head'

import React, { useState, useEffect } from 'react';
import { RequireAuth, useUser } from '../hooks/authUser'
import { supabase } from '../utils/initSupabase'

export default function profile() {
  const { user, error } = useUser()

  const [usrprofile, setProfile] = useState("bruh ffs chal ja")
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    if (user) fetchProfiles()
  }, [user])

  const fetchProfiles = async () => {
    let { profiles, error } = await supabase.from("profiles").select("*").eq('id', user.id)
    if (error) console.log('error', error)
    else setProfile(profiles)
    setLoading(false)
  }

  return (
    <>
      <Head />

      <Header />
      {usrprofile}
      <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 h-screen">
        Profile
        {isLoading? <p>Loading...</p>:<br/>}
      </main>
    </>
  )
}