import { ChangeEvent, useContext, useEffect, useState } from 'react'
import profile from '../../images/blank_profile.png';
import { SubmitHandler, useForm, useFormContext } from "react-hook-form";
import axios from 'axios';
import { UserContext } from '@/context/userContext';


interface IFormInput {
    avatar: String,
    fullName: String,
    interests: String,
    bio: String
}

export default function ProfileInfo() {
    const [preview, setPreview] = useState(profile.src)
    const [profilePicture, setProfilePicture] = useState(profile.src)
    const { register, watch, setError, formState: { errors }, handleSubmit } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {

        const rawInterests = data.interests.split(',');
        const interests = rawInterests.map((str) => str.trim())
        
        await axios.post(`${(process.env.NEXT_PUBLIC_SERVER_URL) as String}/users/test`,
            { ...data, avatar: data.avatar[0], interests },
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(({ data }) => {
            setUser({
                ...user,
                fullName: data.fullName,
                interests: data.interests,
                bio: data.bio
            })
        }).catch(err=>console.log(err))
    };
    const watchedAvatar = watch("avatar")

    useEffect(() => {
        if (edit) {
            const avatarFile: any = watchedAvatar[0]
            setPreview(URL.createObjectURL(avatarFile))
        }
    }, [watchedAvatar])


    const [user, setUser] = useContext(UserContext)
    const [edit, setEdit] = useState(false)

    return (
        <div className="hero min-h-screen bg-base-200">
            {!edit && <div className="hero-content flex-col lg:flex-row">
                <img src={profilePicture} className="max-w-sm rounded-lg shadow-2xl" />
                <div className='flex flex-col gap-5'>
                    <h1 className="text-5xl font-bold">Profile Name</h1>
                    <div>
                        <h2 className="card-title">Fullname:</h2><p className="py-3">{user.fullName}</p>
                    </div>
                    <div>
                        <h2 className="card-title">Email:</h2><p className="py-3">{user.email}</p>
                    </div>
                    <div>
                        <h2 className="card-title">Interests:</h2><p className="py-3">{user.interests}</p>
                    </div>
                    <div>
                        <h2 className="card-title">Bio:</h2><p className="py-3">{user.bio}</p>
                    </div>
                    <button className="btn btn-primary" onClick={() => { setEdit(true) }}>Edit</button>
                </div>
            </div>}

            {edit && <form action="" method="post" encType='multipart/form-data' onSubmit={handleSubmit(onSubmit)} className="hero-content flex-col lg:flex-row">
                <div className='flex flex-col gap-5'>
                    <h1 className="text-5xl font-bold">Profile Name</h1>
                    <div className="card card-compact w-96 bg-base-100 shadow-xl">
                        <figure><img src={preview} alt="Profile Picture" /></figure>
                        <div className="card-body">
                            <div className="card-actions justify-start">
                                <h2 className="card-title">Change Profile Picture:</h2>
                                <input type="file" accept='image/*' id="avatar"
                                    className="file-input file-input-bordered file-input-primary w-full max-w-xs file-input-sm"
                                    {...register("avatar")}
                                />
                            </div>
                        </div>
                    </div>

                    <h2 className="card-title">Fullname:</h2>
                    <input type="text"
                        placeholder={user.fullName!}
                        className="input input-bordered w-full max-w-xs"
                        {...register("fullName", { required: true, minLength: 3, pattern: /^$|^[a-zA-ZčČćĆđĐšŠžŽ-]+ [a-zA-ZčČćĆđĐšŠžŽ-]+$/, maxLength: 30 })}
                    />
                    {errors.fullName?.type === 'required' && <p role="alert" className="text-error mt-1">*Fullname is required</p>}
                    {errors.fullName?.type === 'minLength' && <p role="alert" className="text-error mt-1">*Minimum 3 charactes allowed</p>}
                    {errors.fullName?.type === 'maxLength' && <p role="alert" className="text-error mt-1">*Maximum 30 characters allowed</p>}
                    {errors.fullName?.type === 'pattern' && <p role="alert" className="text-error mt-1">*Enter both your Name and Surname</p>}

                    <h2 className="card-title">Interests:</h2>
                    <input type="text"
                        placeholder="No interests yet..."
                        className="input input-bordered w-full max-w-xs"
                        {...register("interests")}
                    />
                    <h2 className="card-title">About:</h2>
                    <textarea
                        className="textarea textarea-bordered"
                        placeholder="Bio (Empty)"
                        {...register("bio")}>
                    </textarea>

                    <button className="btn btn-primary w-full" type='submit'>Save</button>
                    <button className="btn btn-ghost w-full" onClick={() => { setEdit(false); setPreview(profile.src) }}>Cancel</button>
                </div>
            </form>}
        </div>
    )
}
