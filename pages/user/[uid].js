import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { supabase } from "../../utils/initSupabase";
import profile from "../profile";

const User_profile = () => {
    const router = useRouter()
    const {uid} = router.query

    const [usrprofile, setProfile] = useState(null)
    const [isLoading, setLoading] = useState(false)
  
    useEffect(() => {
      setLoading(true)
      fetchProfile()
    },[] )
  
    const fetchProfile = async () => {
      let profile = await supabase.from("profiles").select("*,branch(*)").eq('id', uid)
      console.log(">")
      if (profile.error) {
        console.log('error', profile.error)
        alert('Error:', profile.error)
      }
      setProfile(profile.data)
      setLoading(false)
    }
    return <p>Usr: {JSON.stringify(profile.data)}</p>
}

export default User_profile