const express = require('express');
const user = require('./user.js');
const router = express.Router();
const post = require('./post.js');
const methods = require('./methods.js');

//middleware that is spec to this router that gives us a time
router.use(function timelog (req, res, next) {
  console.log('Time:', Date.now())
  next();
})

// router.post('/middlewares', body.body)

// routes for users
router.get('/users', user.get);
router.post('/users', user.post);
router.get("/users/:id", user.getById)
router.delete("/users/:id", user.deleteById)
router.put("/users/:id", user.put)
router.patch("/users/:id", user.patch)
// router.put('/:id', user.put);

//routes for posts
router.get('/posts', post.get);
router.post('/posts', post.post);
router.get("/posts/:id", post.getById)
router.delete("/posts/:id", post.deleteById)
router.put("/posts/:id", post.put)
router.patch("/posts/:id", post.patch)


//routes for methods
router.get('/methods', methods.get);
router.post('/methods', methods.post);
router.put('/methods', methods.put);
router.patch('/methods', methods.patch);
router.delete('/methods', methods.del);

module.exports = router;