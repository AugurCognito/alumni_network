import Header from '../components/header'
import Head from '../components/head'

import React, { useState, useEffect } from 'react';
import { RequireAuth, useUser } from '../hooks/authUser'
import { supabase } from '../utils/initSupabase'
import Company_container from '../components/company_container';

export default function companies() {
    const { user, error } = useUser()
    

    const [companies, setCompanies] = useState(null)
    const [is_employer, set_employer_status] = useState(false)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetchCompanies()
        if (user) {
            fetchProfile()
        }
    }, [user])

    const fetchCompanies = async () => {
        let companies = await supabase.from("company").select("*,profiles(*)")
        if (companies.error) console.log('error', error)
        else setCompanies(companies.data)
        setLoading(false)
    }
    const fetchProfile = async () => {
        let profile = await supabase.from("profiles").select("*").eq('id', user.id)
        if (profile.error) {
            alert('Error:', error)
        }

        else set_employer_status(profile.body[0].is_employer)
        setLoading(false)
    }

    return (
        <>
            <Head />

            <Header />

            <main className="mt-4 mx-auto max-w-7xl px-4 sm:mt-10 sm:px-6 md:mt-10 lg:mt-16 lg:px-8 xl:mt-20 h-full">
            
                {/* For uploadfile pop-up */}
                {is_employer ? <>
                    {/* <label htmlFor="my-modal" className="btn modal-button">open modal</label>
                    <input type="checkbox" id="my-modal" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Create Company</h3>
                            <p className="py-4">As you are registered as an employer you can Add your company</p>
                            <div className="modal-action">
                                <label htmlFor="my-modal" className="btn">Create</label>
                            </div>
                        </div>
                    </div> */}
                </> : <></>}

                {isLoading ? <p>Loading...</p> :
                
                <Company_container companies={companies} />
                
                }
            </main>
        </>
    )
}