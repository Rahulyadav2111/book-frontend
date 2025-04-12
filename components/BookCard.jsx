import React from "react";

const BookCard = ({book, onToggleStatus})=>{
    return(
        <div className=" bg-gray-200 px-6 py-2 rounded-2xl mb-2">
            <h1 className="font-bold text-2xl">{book.title}</h1>
            <p><strong>Author:</strong>{book.author}</p>
            <p><strong>Genre:</strong>{book.genre}</p>
            <p><strong>Location:</strong>{book.location}</p>
            <p><strong>Contact:</strong>{book.email}</p>
            <p><strong>Status:</strong>{book.status}</p>
            {onToggleStatus && (<button className="px-4 py-2 bg-blue-500 cursor-pointer text-white rounded hover:bg-blue-600" onClick={()=>onToggleStatus(book._id, book.status === 'Available' ? 'Rented' : 'Available')}>Toggle status</button>)}
        </div>
    )
};

export default BookCard;