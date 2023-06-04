import { ChangeEvent, useState } from "react";

export default function PostForm() {
    const [preview, setPreview] = useState('')

    const handlePreview = (event: ChangeEvent<HTMLInputElement>) => {
        setPreview(URL.createObjectURL(event.target.files![0]))
    }

    return (
        <div className="h-[80vh]">
            <input type="checkbox" id="my_modal_6" className="modal-toggle" />

            <div className="modal">
                <div className="modal-box">

                    <form action="" method="post" className="hero-content flex-col lg:flex-row">
                        <div className='flex flex-col gap-5'>
                            <h1 className="text-5xl font-bold text-center">Add Post</h1>
                            <div className="card card-compact w-96 bg-base-100 shadow-xl">

                                {preview && <figure><img src={preview} alt="Profile Picture" /></figure>}
                                {!preview && <div className="h-[300px] w-[384px] flex justify-center items-center"><label htmlFor="file" className="text-[5rem] text-center">+</label></div>}

                                <div className="card-body">
                                    <div className="card-actions justify-start">
                                        <h2 className="card-title" >Select Content:</h2>
                                        <input type="file" accept='.jpg, .gif, .png, .mp4, .webm, .ogg' id="file" onChange={handlePreview} className="file-input file-input-bordered file-input-primary w-full max-w-xs file-input-sm" />
                                    </div>
                                </div>
                            </div>
                            <h2 className="card-title">Title:</h2> <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                            <h2 className="card-title">Description:</h2> <textarea className="textarea textarea-bordered" placeholder="Bio"></textarea>

                            <button className="btn btn-primary w-full" type='submit'>Publish</button>

                            <div className="modal-action m-0">
                                <button className="btn w-full">Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
