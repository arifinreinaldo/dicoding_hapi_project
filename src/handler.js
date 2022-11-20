// import {nanoid} from "nanoid";

const books = require('./books');
const {nanoid} = require("nanoid");


const store = (request, rtn) => {
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
    } = request.payload;
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const book =
        {
            id, name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            finished,
            reading,
            createdAt,
            updatedAt
        }
    ;
    books.push(book);
    const check = books.filter((book) => book.id === id);
    const isSuccess = check.length > 0;
    if (!isSuccess) {
        const response = rtn.response({
            status: 'fail',
            message: 'Gagal menyimpan buku',
        });
        response.code(500);
        return response;
    }
    const response = rtn.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
            "bookId": id
        },
    });
    response.code(201);
    return response;
};
module.exports = {store};