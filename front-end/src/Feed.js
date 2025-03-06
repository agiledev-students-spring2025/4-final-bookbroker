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
            <h1 className="feed-title">
                For You
            </h1>

            {/* Books */}
            <div className="feed-books">
                {SAMPLE_DATA.map((book, index) => (
                    <div key={index} className="feed-book">
                        <img src={book.imgUrl} alt="Book Cover" />
                        
                        <div className="feed-book-text">
                            <h2>{book.title}</h2>
                            <p>{book.year}</p>
                            <p>{book.author}</p>
                        </div>

                        <a href={book.bookUrl} className="feed-book-button">
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