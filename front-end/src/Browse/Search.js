import './Search.css'

const Search = () => {
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
        <main className="Search">
            <h1 className="search-title">
                Search
            </h1>

            {/* Search Bar */}
            <div className="search-bar">
                <input type="text" placeholder="Search for books" />
                <button>
                    Search
                </button>
            </div>

            {/* Books */}
            <div className="search-books">
                {SAMPLE_DATA.map((book, index) => (
                    <div key={index} className="search-book">
                        <img src={book.imgUrl} alt="Book Cover" />
                        
                        <div className="search-book-text">
                            <h2>{book.title}</h2>
                            <p>{book.year}</p>
                            <p>{book.author}</p>
                        </div>

                        <a href={book.bookUrl} className="search-book-button">
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

export default Search