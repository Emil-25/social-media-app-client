import Followers from "./followers"
import ProfileInfo from "./profileInfo"

export default function Profile() {

    const handleTab = (event: any) => {
        document.getElementsByClassName('tab-active')[0].classList.remove('tab-active')
        event.target.classList.add('tab-active')
    }

    return (
        <section className="flex flex-col justify-center">
            <ProfileInfo />
                <div className="tabs tabs-boxed justify-center">
                    <a className="tab tab-lg tab-active" onClick={handleTab}>Followers</a>
                    <a className="tab tab-lg" onClick={handleTab}>Following</a>
                </div>
            <Followers />
        </section>
    )
}
