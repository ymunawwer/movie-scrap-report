const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const movieController = require('../../controllers/movie.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/Create', movieController.registerMovie);
router.get('/getAll', movieController.getAllMovie);
router.get('/getMovie/:id', movieController.getMovieById);


module.exports = router;
