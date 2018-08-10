const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
  User
    .find()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(error => {
      res.status(404);
      console.log(`404 Error: User ${req.params.id} not found`);
    });
});

router.get('/:id', (req, res) => {
  User
    .findById(req.params.id)
    .then(users => {
      if (users) {
        res.status(200).json(users)
      } else {
        res.status(404).json(users)   
      }
    })
    .catch(error => {
      res.status(404);
      console.log(`404 error: User ${req.params.id} not found`);
    });
});

router.post('/', (req, res) => {
    const user = new User(req.body);
  user
    .save(req.params.id)
    .then(users => {
      res.status(201).json(users);
      console.log('New user created')
    })
    .catch(error => {
      res.status(500);
      console.log(error);
    });
});

router.put('/:id', (req, res) => {
  User
    .findByIdAndUpdate(req.params.id)
    .then(users => {
      res.status(204).json(users)
    })
    .catch(error => {
      console.log(error);
    });
});

router.delete('/:id', (req, res) => {
  User
    .findByIdAndRemove(req.params.id)
    .then(users => {
      res.status(200).json(users)
    })
    .catch(error => {
      res.status(404);
      console.log(`404 error: User ${req.params.id} not found`);
    });
});

module.exports = router;