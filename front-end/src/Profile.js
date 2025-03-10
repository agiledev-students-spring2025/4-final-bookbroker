import './Profile.css'

const Profile = () => {

    return (
        <main className="profile">
            <h1 className="title">Profile</h1>
            <div className="infoContainer">
                <img className="profilePhoto" src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250" alt="Profile" />
                <ul className="infoList">
                    <li><strong>Username:</strong> abc123</li>
                    <li><strong>Email:</strong> abc123@gmail.com</li>
                    <li><strong>Location:</strong> New York</li>
                    <li><strong>Ratings:</strong> ⭐ 4.1</li>
                </ul>
            </div>

            <div className="wishlistContainer">
                <h2 className="sectionTitle">📚 Wishlist</h2>
                <ul className="wishlist">
                    <li className="wishlistItem">📖 <strong>The Midnight Library</strong> | Matt Haig</li>
                    <li className="wishlistItem">📖 <strong>Dune</strong> | Frank Herbert</li>
                    <li className="wishlistItem">📖 <strong>Educated</strong> | Tara Westover</li>
                    <li className="wishlistItem">📖 <strong>The Silent Patient</strong> | Alex Michaelides</li>
                </ul>
            </div>

            <div className="offeringsContainer">
                <h2 className="sectionTitle">📦 Offerings</h2>
                <ul className="offerings">
                    <li className="offeringItem">📖 <strong>Atomic Habits</strong> | James Clear</li>
                    <li className="offeringItem">📖 <strong>Circe</strong> | Madeline Miller</li>
                    <li className="offeringItem">📖 <strong>Project Hail Mary</strong> | Andy Weir</li>
                    <li className="offeringItem">📖 <strong>The Seven Husbands of Evelyn Hugo</strong> | Taylor Jenkins Reid</li>
                </ul>
            </div>
        </main>
    );
};

export default Profile;