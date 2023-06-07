
export default function Settings() {

    return (
        <section className="h-[90vh] p-3">
            <h1 className="text-[2rem]">Settings</h1>
            <div className="card w-full bg-base-100 shadow-xl border border-primary h-20 justify-center my-10">
                <div className="card-body flex flex-row">
                    <h2 className="card-title">Private account (No one will see your content unless they follow you)</h2>
                    <div className="card-actions place-content-center justify-center">
                        <input type="checkbox" className="toggle toggle-primary ml-5" />
                    </div>
                    <button className="btn btn-primary ml-auto">Save</button>
                </div>
            </div>
            <div className="card w-full bg-base-100 shadow-xl border border-primary h-20 justify-center my-10">
                <div className="card-body flex flex-row">
                    <h2 className="card-title">Online Hidden</h2>
                    <div className="card-actions place-content-center justify-center">
                        <input type="checkbox" className="toggle toggle-primary ml-5" />
                    </div>
                    <button className="btn btn-primary ml-auto">Save</button>
                </div>
            </div>
            <div className="card w-full bg-base-100 shadow-xl border border-primary h-20 justify-center my-10">
                <div className="card-body flex flex-row">
                    <h2 className="card-title">Just toggle</h2>
                    <div className="card-actions">
                        <input type="checkbox" className="toggle toggle-primary ml-5" />
                    </div>
                </div>
            </div>
            <div className="card w-full bg-base-100 shadow-xl border border-error h-20 justify-center my-10">
                <div className="card-body flex flex-row">
                    <h2 className="card-title">Delete Your account</h2>
                    <div className="card-actions">
                        <button className="btn btn-error ml-5">Delete</button>
                    </div>
                </div>
            </div>
        </section>
    )
}