import Header from '../components/header'
import Head from '../components/head'

import { RequireAuth, useUser } from '../hooks/authUser'
import { supabase } from '../utils/initSupabase'
import { useState } from 'react'


const Settings = () => {
    RequireAuth()
    const [is_employer, set_is_employer] = useState(false)

    const user = useUser().user
    const updateCompany = async event => {
        event.preventDefault()
        console.log(event.target.company_creation_date)

        const { data, error } = await supabase.from('company')
            .insert([
                { user: user.id, name: event.target.name.value, created: event.target.company_creation_date.value },

            ], { upsert: true })
    }
    const updateUser = async event => {
        event.preventDefault()


        const { data, error } = await supabase.from('profiles')
            .insert([
                { id: user.id, first_name: event.target.first.value, last_name: event.target.last.value, is_employer: is_employer, about: event.target.about.value },

            ], { upsert: true })
    }
    function toggle_is_employer() {
        set_is_employer(!is_employer)
    }

    return (
        <>
            <Head />
            <Header />
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 h-screen">

                <form className='p-3 border-2 border-info rounded-lg' onSubmit={updateCompany}>
                    Add your company
                    <br />
                    <input type="text" name='name' placeholder="Name Of The Company" class="input input-bordered input-primary w-full max-w-xs m-2" />
                    Created: <input type="date" name="company_creation_date" className='btn btn-primary' />
                    <br />
                    <textarea className="textarea textarea-info resize rounded-md m-2" name="about" placeholder="Write about your company"></textarea>
                    <br />

                    <button type="submit" class='btn btn-primary btn-outline m-2'>Add</button>
                </form>


                <form className='p-3 rounded-lg border-2 border-info mt-5' onSubmit={updateUser}>
                    To Change
                    <br />
                    <input type="text" name='first' placeholder="First Name" class="input input-bordered input-primary w-full max-w-xs m-2" />
                    <input type="text" name='last' placeholder="Second Name" class="input input-bordered input-primary w-full max-w-xs m-2" />
                    <label className="label cursor-pointer">
                        <span className="label-text">Potential Employer?</span>
                        <input type="checkbox" name="is_employer" className="toggle toggle-primary" onClick={toggle_is_employer} checked={is_employer} />
                    </label>
                    <textarea className="textarea textarea-info resize rounded-md m-2" name="about" placeholder="Write your bio here"></textarea>
                    <br />
                    <button type="submit" class='btn btn-primary btn-outline m-2'>Update</button>
                </form>
            </main>
        </>
    )
}

export default Settings