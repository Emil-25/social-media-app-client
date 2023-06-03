import { ChangeEvent, useState } from 'react'
import profile from '../../images/blank_profile.png'

export default function ProfileInfo() {
    const [preview, setPreview] = useState(profile.src)
    const [profilePicture, setProfilePicture] = useState(profile.src)
    const [interests, setInterests] = useState('')
    const [about, setAbout] = useState('')

    const [edit, setEdit] = useState(false)

    const handleProfilePicture = (event: ChangeEvent<HTMLInputElement>) => {
        setPreview(URL.createObjectURL(event.target.files![0]))
    }


    return (
        <div className="hero min-h-screen bg-base-200">

            {!edit && <div className="hero-content flex-col lg:flex-row">
                <img src={profilePicture} className="max-w-sm rounded-lg shadow-2xl" />
                <div className='flex flex-col gap-5'>
                    <h1 className="text-5xl font-bold">Profile Name</h1>
                    <div>
                        <h2 className="card-title">Username:</h2><p className="py-3"> elkhnoirug</p>
                    </div>
                    <div>
                        <h2 className="card-title">Email:</h2><p className="py-3"> my name is Bob and I love doing workout</p>
                    </div>
                    <div>
                        <h2 className="card-title">Interests:</h2><p className="py-3"> my name is Bob and I love doing workout</p>
                    </div>
                    <div>
                        <h2 className="card-title">About:</h2><p className="py-3"> my name is Bob and I love doing workout</p>
                    </div>
                    <button className="btn btn-primary" onClick={() => {setEdit(true)}}>Edit</button>
                </div>
            </div>}

            {edit && <form action="" method="post" className="hero-content flex-col lg:flex-row">
                <div className='flex flex-col gap-5'>
                    <h1 className="text-5xl font-bold">Profile Name</h1>
                    <div className="card card-compact w-96 bg-base-100 shadow-xl">
                        <figure><img src={preview} alt="Profile Picture" /></figure>
                        <div className="card-body">
                            <div className="card-actions justify-start">
                                <h2 className="card-title">Change Profile Picture:</h2>
                                <input type="file" accept='.jpg, .gif, .png' onChange={handleProfilePicture} className="file-input file-input-bordered file-input-primary w-full max-w-xs file-input-sm" />
                            </div>
                        </div>
                    </div>
                    <h2 className="card-title">Email:</h2> <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    <h2 className="card-title">Interests:</h2> <input type="text" value={interests} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    <h2 className="card-title">About:</h2> <textarea className="textarea textarea-bordered" placeholder="Bio"></textarea>

                    <button className="btn btn-primary w-full" type='submit'>Save</button>
                    <button className="btn btn-ghost w-full" onClick={() => {setEdit(false)}}>Cancel</button>
                </div>
            </form>}
        </div>
    )
}
