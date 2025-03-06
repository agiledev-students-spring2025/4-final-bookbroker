import './Feed.css'

const Feed = () => {
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
        <main className="Feed">
            <h1>
                For You
            </h1>

            {/* Books */}
            <div>
                {SAMPLE_DATA.map((book, index) => (
                    <div key={index} className="Book">
                        <img src={book.imgUrl} alt="Book Cover" />
                        <h2>{book.title}</h2>
                        <p>{book.year}</p>
                        <p>{book.author}</p>
                        
                        <a href={book.bookUrl}>
                            <button>
                                Show Interest
                            </button>
                        </a>
                    </div>
                ))}
            </div>
        </main>
    )
}

export default Feed