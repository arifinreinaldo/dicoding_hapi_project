const {store} = require('./handler');

const routes = [{
    method: 'GET', path: '/', handler: () => ('gororo'),
}, {
    method: 'POST',
    path: '/books',
    handler: store
}/*, {
    method: 'GET', path: '/about', handler: () => ('aboot'),
}, {
    method: 'GET', path: '/gorom', handler: () => ('Uknown'),
}, {
    method: 'GET', path: '/notes', handler: () => getAllNoteHandler(),
}, {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteHandler,
}, {
    method: 'PUT',
    path: '/notes/{id}',
    handler: updateNoteHandler,
}, {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteHandler,
}, */];

module.exports = routes;
