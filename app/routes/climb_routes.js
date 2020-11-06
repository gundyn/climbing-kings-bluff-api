const express = require('express')

const passport = require('passport')

const Climb = require('../models/climb')

// Custom errors
const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404

const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// Index
router.get('/climbs', (req, res, next) => {
  Climb.find()
    .then(climbs => {
      return climbs.map(climb => climb.toObject())
    })
    .then(climbs => res.status(200).json({ climbs: climbs }))
    .catch(next)
})

// Show
router.get('climbs/:id', requireToken, (req, res, next) => {
  Climb.findById(req.params.id)
    .then(handle404)
    .then(climb => res.status(200).json({ climb: climb.toObject() }))
    .catch(next)
})

// Create
router.post('/climbs', requireToken, (req, res, next) => {
  console.log('req.body ', req.body)
  req.body.climb.owner = req.user.id

  Climb.create(req.body.climb)
    .then(climb => {
      res.status(201).json({ climb: climb.toObject() })
    })
    .catch(next)
})

// Update
router.patch('/climbs/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.climb.owner

  Climb.findById(req.params.id)
    .then(handle404)
    .then(climb => {
      requireOwnership(req, climb)

      return climb.updateOne(req.body.climb)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// Destroy
router.delete('/climbs/:id', requireToken, (req, res, next) => {
  Climb.findById(req.params.id)
    .then(handle404)
    .then(climb => {
      requireOwnership(req, climb)
      climb.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
