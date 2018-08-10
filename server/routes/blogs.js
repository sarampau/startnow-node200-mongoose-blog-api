const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

router.get('/', (req, res) => {
  Blog
    .find()
    .then(blogs => {
      res.status(200).json(blogs)
    })
    .catch(err => {
      console.log(err)
    })
});

router.get('/featured', (req, res) => {
  Blog
    .where('featured').equals(true)
    .then(blogs => {
      res.status(200).json(blogs)
    })
    .catch(err => {
      console.log(err)
    })
});

router.get('/:id', (req, res) => {
  Blog
    .findById(req.params.id)
    .then(blogs => {
        if (blogs) {
          res.status(200).json(blogs)
        } else {
          res.status(404).json(blogs)
        }
    })
    .catch(err => {
      res.status(404)
      console.log(err)
    })
});

router.post('/', (req, res) => {
  let dbUser = null;
  console.log('req.body:::::', req.body)
  User
    .findById(req.body.author)
    .then(user => {
      dbUser = user;
      const newBlog = new Blog(req.body);
      newBlog.author = user._id;
      return newBlog.save();
    })
    .then(blog => {
      dbUser.blogs.push(blog);
      dbUser.save().then(() => res.status(201).json(blog));
    })
//   const blog = new Blog(req.body);
//   blog
//     .save(req.params.id)
//     .then(blogs => {
//       res.status(201).json(blogs)
//     })
//     .catch(err => {
//       console.log(err)
//     })
});

router.put('/:id', (req, res) => {
  Blog
    .findByIdAndUpdate(req.params.id)
    .then(blogs => {
      res.status(204).json(blogs)
  })
  .catch(err => {
    console.log(err);
  });
});

router.delete('/:id', (req, res) => {
  Blog
    .findByIdAndRemove(req.params.id)
    .then(blogs => {
      res.status(200).json(blogs)
    })
    .catch(err => {
      res.status(404)
      console.log(err)
    })
});

module.exports = router;