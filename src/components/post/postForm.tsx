import axios from "axios";
import { useRouter } from 'next/router';
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserContext } from '@/context/userContext';
import { isImage, isVideo } from "@/utils/checkFileType";
import dynamic from "next/dynamic";

interface IFormInput {
    url: string,
    title: string,
    description: string
}

export default function PostForm() {
    const [imagePreview, setImagePreview] = useState('')
    const [videoPreview, setVideoPreview] = useState('')

    const router = useRouter();

    const [invalid, setInvalid] = useState("")

    const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });
    const { register, watch, setError, formState: { errors }, handleSubmit } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        
        await axios.post(`${(process.env.NEXT_PUBLIC_SERVER_URL) as String}/posts`,
            { ...data, url: data.url[0] },
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(() => router.reload())
        .catch(err=>{console.log(err), alert(err)})
    };
    let watchedUrl = watch("url")
    
    useEffect(() => {
        if (watchedUrl) {
            const postFile: any = watchedUrl[0]

            setImagePreview('');
            setVideoPreview('');

            if (postFile) {
                if (isImage(postFile.name)) setImagePreview(URL.createObjectURL(postFile))
                if (isVideo(postFile.name)) setVideoPreview(URL.createObjectURL(postFile))
            }

        }else {
            setTimeout(() => watchedUrl = watch("url"), 100)
        }
    }, [watchedUrl])

    return (
        <div>
            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">

                    <form action="" method="post" className="hero-content flex-col lg:flex-row" encType='multipart/form-data' onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex flex-col gap-5'>
                            <h1 className="text-5xl font-bold text-center">Add Post</h1>
                            <div className="card card-compact w-96 bg-base-100 shadow-xl">

                                {imagePreview && <figure><img src={imagePreview} alt="Profile Picture" /></figure>}
                                {videoPreview && <figure><ReactPlayer url={videoPreview} /></figure>}
                                {!(imagePreview || videoPreview) && <div className="h-[300px] w-[384px] flex justify-center items-center"><label htmlFor="file" className="text-[5rem] text-center">+</label></div>}

                                <div className="card-body">
                                    <div className="card-actions justify-start">
                                        <h2 className="card-title" >Select Content:</h2>
                                        <input type="file" accept='image/* video/*' 
                                            id="file" 
                                            className="file-input file-input-bordered file-input-primary w-full max-w-xs file-input-sm"
                                            {...register("url", { required: true,})}
                                        />
                                        {errors.url?.type === 'required' && <p role="alert" className="text-error">*Content is required</p>}

                                    </div>
                                </div>
                            </div>
                            <h2 className="card-title">Title:</h2> 
                            <input type="text" placeholder="Title" 
                                className="input input-bordered w-full max-w-xs" 
                                {...register("title", { required: true,})}
                            />
                            {errors.title?.type === 'required' && <p role="alert" className="text-error">*Title is required</p>}


                            <h2 className="card-title">Description:</h2> 
                            <textarea className="textarea textarea-bordered" 
                                placeholder="Description"
                                {...register("description")}
                            >
                            </textarea>

                            <button className="btn btn-primary w-full" type='submit'>Publish</button>

                            <div className="modal-action m-0">
                                <label className="btn w-full" htmlFor="my_modal_6" onClick={() => {setImagePreview(''); setVideoPreview('')}}>Cancel</label>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
