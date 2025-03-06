
import './Profile.css'

const Profile = () => {
    const SAMPLE_PROFILE = {
        username: 'username',
        email: 'email',
        location: 'location',
        ratings: 'ratings',
        profileUrl: '.',

    }

    return (
        <main className="Profile">
            <h1>Profile</h1>
            <div>
                <img src={SAMPLE_PROFILE.profileUrl} alt="Profile Img" class="w-120"/>
                <p class="text-lg">{SAMPLE_PROFILE.username}</p>
                <p>{SAMPLE_PROFILE.email}</p>
                <p>{SAMPLE_PROFILE.location}</p>
                <p>{SAMPLE_PROFILE.ratings}</p>
            </div>
        </main>
    )
}

export default Profile