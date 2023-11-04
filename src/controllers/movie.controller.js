const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const movieModel = require('../models/movie.model');
const { authService, userService, tokenService, emailService } = require('../services');

const registerMovie = catchAsync(async (req, res) => {
  const { movieName, image, cast, date, place, numberOfTheaters, streamingAt,admits } = req.body;
  try {
    // const newGross=
    const newMovie = new movieModel({
      movieName,
      image,
      cast,
      date,
      streamingAt,
      admits,
    });
    await newMovie.save();
    res.status(httpStatus.CREATED).send({ newMovie });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

const getAllMovie = catchAsync(async (req, res) => {
  try {
    const allMovie = await movieModel.find().select("movieName image");
    console.log('object :>> ', allMovie);
    res.status(httpStatus.CREATED).send({data:allMovie});  
  } catch (err) {
    console.log('cant find it :>> ');
  }
});

const getMovieById = catchAsync(async (req, res) => {
  try {
    const id=req.params.id;
    const getMovie = await movieModel.findById({_id:id});
    // console.log('object :>> ', getMovie);
    res.status(httpStatus.CREATED).json({data:[getMovie]});  
  } catch (err) {
    console.log('cant find it :>> ');
  }
});

module.exports = {
  registerMovie,
  getAllMovie,
  getMovieById
};
