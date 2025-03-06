
import './Profile.css'

const Profile = () => {
    const SAMPLE_PROFILE = {
        username: 'username',
        email: 'example@email.com',
        location: 'location',
        ratings: 'ratings',
        profileUrl: '.',

    }
    const SAMPLE_DATA = [
        {
            title: "Book Title",
            year: "Book Year",
            author: "Book Author",
            bookUrl: ".",
            imgUrl: "."
        },
        {
            title: "Book Title",
            year: "Book Year",
            author: "Book Author",
            bookUrl: ".",
            imgUrl: "."
        },
        {
            title: "Book Title",
            year: "Book Year",
            author: "Book Author",
            bookUrl: ".",
            imgUrl: "."
        }
    ]

    return (
        <main className="Profile">
            <h1 class="text-[30px] font-medium">Profile</h1>
            <div class="flex flex-row">
                <img  src={SAMPLE_PROFILE.profileUrl} alt="Profile Img" class="w-120 bg-gray-500"/>
                <div class="p-4">
                    <p class="text-lg">{SAMPLE_PROFILE.username}</p>
                    <p>{SAMPLE_PROFILE.email}</p>
                    <p>{SAMPLE_PROFILE.location}</p>
                    <p>{SAMPLE_PROFILE.ratings}</p>
                </div>
            </div>

            <div>
                <h1 class="text-[24px] font-medium mb-4 mt-4 pl-4">Wishlist</h1>
                <div class="flex flex-col space-y-4 max-sm:items-center">
                {SAMPLE_DATA.map((book, index) => (
                    <div key={index} className="Book" class="border-2 border-solid p-4">
                        <img src={book.imgUrl} alt="Book Cover" />
                        <h2>{book.title}</h2>
                        <p>{book.year}</p>
                        <p>{book.author}</p>
                        
                        <a href={book.bookUrl}>
                            <button>
                                Edit
                            </button>
                        </a>
                    </div>
                ))}
                </div>
            </div>

            <div>
                <h1 class="text-[24px] font-medium mb-4 mt-4 pl-4">Your Listings</h1>
                <div class="flex flex-col space-y-4 max-sm:items-center">
                {SAMPLE_DATA.map((book, index) => (
                    <div key={index} className="Book" class="border-2 border-solid p-4">
                        <img src={book.imgUrl} alt="Book Cover" />
                        <h2>{book.title}</h2>
                        <p>{book.year}</p>
                        <p>{book.author}</p>
                        
                        <a href={book.bookUrl}>
                            <button>
                                Edit
                            </button>
                        </a>
                    </div>
                ))}
                </div>
            </div>
        </main>
    )
}

export default Profile