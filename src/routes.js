const {store, index, get, update, deleteBook} = require('./handler');

const routes = [{
    method: 'GET', path: '/', handler: () => ('gororo'),
}, {
    method: 'POST',
    path: '/books',
    handler: store
}, {
    method: 'GET', path: '/books', handler: index,
}, {
    method: 'GET',
    path: '/books/{id}',
    handler: get,
}, {
    method: 'PUT',
    path: '/books/{id}',
    handler: update,
}, {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBook,
}/*, {
    method: 'GET', path: '/about', handler: () => ('aboot'),
}, {
    method: 'GET', path: '/gorom', handler: () => ('Uknown'),
}, */];

module.exports = routes;
