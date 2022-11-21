// import {nanoid} from "nanoid";

const books = require('./books');
const {nanoid} = require("nanoid");

const index = (request, rtn) => {
    let {reading, finished,name} = request.query;
    let readingValue = reading == 1;
    let finishValue = finished == 1;

    let mapBooks = books
        // .filter((book) => book.name.includes(name))
        .filter((book) => book.finished === finishValue)
        .filter((book) => book.reading === readingValue)
        .map((value, index1) => {
        return {
            id: value.id,
            name: value.name,
            publisher: value.publisher,
        };
    });
    const response = rtn.response({
        status: 'success',
        data: {
            books: mapBooks,
        }
    });
    response.code(200);
    return response;
};

const get = (request, rtn) => {
    let {id} = request.params;
    const check = books.filter((book) => book.id === id);
    if (check.length === 0) {
        const response = rtn.response({
            status: 'fail',
            message: 'Buku tidak ditemukan'
        });
        response.code(404);
        return response;
    }
    const response = rtn.response({
        status: 'success',
        data: {
            book: check[0],
        }
    });
    response.code(200);
    return response;

};

const update = (request, rtn) => {
    let {id} = request.params;
    let {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;
    if (name === undefined || name === "") {
        const response = rtn.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }
    if (readPage > pageCount) {
        const response = rtn.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }
    const book = books.filter((book) => book.id === id);
    if (book.length === 0) {
        const response = rtn.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan'
        });
        response.code(404);
        return response;
    }
    book[0].name = name;
    book[0].year = year;
    book[0].author = author;
    book[0].summary = summary;
    book[0].publisher = publisher;
    book[0].pageCount = pageCount;
    book[0].readPage = readPage;
    book[0].reading = reading;
    const response = rtn.response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
        data: {
            book: book[0],
        }
    });
    response.code(200);
    return response;

};

const deleteBook = (request, rtn) => {
    let {id} = request.params;
    const index = books.find((book) => book.id === id);
    if (index === undefined) {
        const response = rtn.response({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan'
        });
        response.code(404);
        return response;
    }
    books.splice(index, 1);
    const response = rtn.response({
        status: 'success',
        message: 'Buku berhasil dihapus',
        data: {
            books,
        }
    });
    response.code(200);
    return response;
};
const store = (request, rtn) => {
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;
    if (name === undefined || name === "") {
        const response = rtn.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }
    if (readPage > pageCount) {
        const response = rtn.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    let finished = false;
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
            insertedAt,
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
module.exports = {store, index, get, update, deleteBook};