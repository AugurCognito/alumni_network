import Header from '../components/header'
import Head from '../components/head'

import { RequireAuth, useUser } from '../hooks/authUser'
import { supabase } from '../utils/initSupabase'
import { useState } from 'react'


const Settings = () => {

    const [is_employer, set_is_employer] = useState(false)
    const [uploading, setUploading] = useState(false)

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
    const uploadProfile = async event => {
        setUploading(true)
        event.preventDefault()
        let avatarFile = event.target.profilePicture.files[0]
        console.log(avatarFile)
        //user.id ka ek folder bnega usme photo
        const {data, error} = await supabase.storage
            .from('avatars')
            .upload(`${user.id}/${avatarFile.name}`, avatarFile, {
                upsert: true
            })
            //
        console.log(data)
        const data2 = await supabase.from('profiles')
            .insert([{
                id: user.id, avatar: data.Key 
            }]
                , { upsert: true })
        setUploading(false)
    }
    function toggle_is_employer() {
        set_is_employer(!is_employer)
    }

    return (
        <>
            <Head />
            <Header />
            <main className="mt-4 mx-auto max-w-7xl px-4 sm:mt-10 sm:px-6 md:mt-12 lg:mt-18 lg:px-8 xl:mt-18 pb-10">

                <form className='p-3 border-2 border-info rounded-lg' onSubmit={updateCompany}>
                    Add your company
                    <br />
                    <input type="text" name='name' placeholder="Name Of The Company" class="input input-bordered input-primary w-full max-w-xs m-2" />
                    Created: <input type="date" name="company_creation_date" className='btn btn-primary btn-outline ' />
                    <br />
                    <textarea className="textarea textarea-info resize rounded-md m-2" name="about" placeholder="Write about your company"></textarea>
                    <br />

                    <button type="submit" class='btn btn-primary m-2'>Add</button>
                </form>

                <form className='p-3 rounded-lg border-2 border-info mt-5' onSubmit={uploadProfile} >
                    Add Company Logo
                    <label class="block">
                        <span class="sr-only">Choose File</span>
                        <input name="profilePicture" type="file" class="m-2 block input-bordered input-primary w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                    </label>
                    {!uploading ? <button type='submit' className='btn btn-primary m-2'>Upload</button> : <>
                        <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                        </div>
                    </>}
                </form>

                <form className='p-3 rounded-lg border-2 border-info mt-5' onSubmit={updateUser}>
                    To Change
                    <br />
                    <input type="text" name='first' placeholder="First Name" class="input input-bordered input-primary w-full max-w-xs m-2" />
                    <input type="text" name='last' placeholder="Second Name" class="input input-bordered input-primary w-full max-w-xs m-2" />

                    <label className="label cursor-pointer">
                        <span className="label-text">Potential Employer?</span>
                        <input type="checkbox" name="is_employer" className="toggle toggle-primary xl:mr-auto xl:ml-20 lg:mr-auto lg:ml-20 md:mr-auto md:ml-20" onClick={toggle_is_employer} checked={is_employer} />
                    </label>
                    <textarea className="textarea textarea-info resize rounded-md m-2" name="about" placeholder="Write your bio here"></textarea>
                    <br />
                    <button type="submit" class='btn btn-primary m-2'>Update</button>
                </form>
            </main>
        </>
    )
}

export default Settings