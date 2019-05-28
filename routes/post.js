dotify = require('node-dotify');

get = (req, res, next) => {
  req.models.Post.find().then((posts) => {
      return res.send(posts);
  }).catch((error) => {
      next(error)
  })
}

post = (req, res, next) => {
  console.log(req.body);
  req.models.Post.create({
      post: {
          title: req.body.post.title,
          body: req.body.post.body,
          author: {
              firstName: req.body.author.firstName,
              lastName: req.body.author.lastName
          }
      }
  }).then((post) => {
      return res.status(201).send(post);
  }).catch((error) => {
      next(error);
  })
}

getById = (req, res, next) => {
  req.models.Post.findById(req.params.id).then((post) => {
      return res.send(post);
  }).catch((error) => next(error))
}

deleteById = (req, res, next) => {
  req.models.Post.findByIdAndDelete(req.params.id).then((deleted) => {
      if (deleted)
          return res.send(deleted).status(200)
      res.sendStatus(204)
  }).catch((error) => next(error))
}

put = (req, res, next) => {
  req.models.Post.updateOne({ _id: req.params.id },
      {
        post: {
          title: req.body.post.title,
          body: req.body.post.body,
          author: {
              firstName: req.body.author.firstName,
              lastName: req.body.author.lastName
          }
      },
      }, {
          new: true,
          upsert: true,
          runvalidators: true,

      }).then((status) => {
          console.log("status: ", status)
          if (status.upserted)
              res.status(201)
          else if (status.nModified)
              res.status(200)
          else
              res.status(204)
          res.send()
      }).catch((error) => next(error))
}

patch = (req, res, next) => {
  req.models.Post.findByIdAndUpdate(req.params.id,
      {
          $set: dotify(req.body)
      },
      {
          returnNewDocument: true,
      }).then((post) => {
          console.log(post)
          res.send(post)
      }).catch((error) => next(error))
}


module.exports = {
  get,
  post,
  getById,
  deleteById,
  put,
  patch
}

