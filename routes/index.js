const express = require('express');
const user = require('./user.js');
const router = express.Router();

//middleware that is spec to this router that gives us a time
router.use(function timelog (req, res, next) {
  console.log('Time:', Date.now())
  next();
})


// routes for users
router.get('/users', user.get);
router.post('/users', user.post);
router.get("/users/:id", user.getById)
router.delete("/users/:id", user.deleteById)
router.put("/users/:id", user.put)
router.patch("/users/:id", user.patch)



module.exports = router;