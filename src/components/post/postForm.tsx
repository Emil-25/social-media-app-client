declare const window: any;
export default function PostForm() {
    return (
        <div className="h-[80vh]">
            <input type="checkbox" id="my_modal_6" className="modal-toggle" />

            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">This modal works with a hidden checkbox!</p>
                    <div className="modal-action">
                        <label htmlFor="my_modal_6" className="btn">Close!</label>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
