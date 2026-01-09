// bookshop-backend/routes/book.route.js
const express = require('express');
const router = express.Router();

/**
 * Robust middleware imports with fallbacks to avoid server crash if filename differs.
 * It will try a few common filenames and export names.
 */

// AUTH middleware (try multiple possible files/names)
let authMod = null;
const tryPaths = [
  '../middleware/auth',
  '../middleware/auth.js',
  '../middleware/auth.middleware',
  '../middleware/index'
];
for (const p of tryPaths) {
  try {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    authMod = require(p);
    // console.log('Loaded auth middleware from', p);
    break;
  } catch (err) {
    // ignore and try next
  }
}
if (!authMod) {
  console.error('[WARN] auth middleware not found at tried paths:', tryPaths);
  authMod = {}; // safe fallback so destructuring below doesn't throw
}

// extract possible names (backwards compatible)
const authenticate = authMod.authenticate || authMod.authMiddleware || authMod.authenticateUser || authMod.default || authMod.authMiddleware;
const authorize = authMod.authorize || authMod.authorizeRole || authMod.authorizeFn;
const superAdminOnly = authMod.superAdminOnly || (authorize ? authorize('superadmin') : null);

// UPLOAD middleware (multer) with fallbacks
let upload = null;
const upPaths = [
  '../middleware/upload',
  '../middleware/upload.js',
  '../middleware/uploader',
  '../middleware/multer'
];
for (const p of upPaths) {
  try {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    upload = require(p);
    break;
  } catch (err) {
    // try next
  }
}
if (!upload) {
  console.warn('[WARN] upload middleware not found at tried paths:', upPaths, '\nIf you want file upload, create middleware/upload.js using multer.');
}

/**
 * Controllers
 * Expecting controllers/book.controller.js to exist. If not, the route will return 501 for create.
 */
let bookController = null;
try {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  bookController = require('../controllers/book.controller');
} catch (err) {
  console.warn('[WARN] book.controller not found at ../controllers/book.controller. Using stubs.');
  // stub controller fallback
  bookController = {
    createBook: async (req, res) => res.status(501).json({ success: false, message: 'createBook controller missing' }),
    getBooks: async (req, res) => res.status(501).json({ success: false, message: 'getBooks controller missing' }),
    getBookById: async (req, res) => res.status(501).json({ success: false, message: 'getBookById controller missing' }),
    updateBook: async (req, res) => res.status(501).json({ success: false, message: 'updateBook controller missing' }),
    deleteBook: async (req, res) => res.status(501).json({ success: false, message: 'deleteBook controller missing' })
  };
}

/**
 * ROUTES
 */

// Create a book (images upload if upload middleware present)
if (authenticate && (authorize || superAdminOnly)) {
  if (upload && typeof upload.array === 'function') {
    // keep same signature as your old code: upload.array('images', 4)
    router.post('/', authenticate, authorize ? authorize('admin', 'superadmin') : (req, res, next) => next(), upload.array('images', 4), bookController.createBook);
  } else {
    // if no upload middleware, still allow create (without files)
    router.post('/', authenticate, authorize ? authorize('admin', 'superadmin') : (req, res, next) => next(), bookController.createBook);
  }
} else {
  // If auth not available, create a public (unsafe) route but warn in logs
  console.warn('[WARN] Authentication/authorization middleware missing — creating unprotected POST /api/books for dev only.');
  if (upload && typeof upload.array === 'function') {
    router.post('/', upload.array('images', 4), bookController.createBook);
  } else {
    router.post('/', bookController.createBook);
  }
}

// Read books (public)
router.get('/', bookController.getBooks);

// Read single book
router.get('/:id', bookController.getBookById);

// Update book (protected if auth available)
if (authenticate) {
  router.patch('/:id', authenticate, authorize ? authorize('admin', 'superadmin') : (req, res, next) => next(), upload && upload.array ? upload.array('images', 4) : (req, res, next) => next(), bookController.updateBook);
} else {
  router.patch('/:id', bookController.updateBook);
}

// Delete book (protected if auth available)
if (authenticate) {
  router.delete('/:id', authenticate, authorize ? authorize('admin', 'superadmin') : (req, res, next) => next(), bookController.deleteBook);
} else {
  router.delete('/:id', bookController.deleteBook);
}

module.exports = router;
