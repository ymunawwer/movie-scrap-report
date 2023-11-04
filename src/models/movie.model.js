const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const movieSchema = mongoose.Schema(
  {
    movieName: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: Object,
      default: {
        url: 'https://image.shutterstock.com/image-illustration/thin-line-black-camera-logo-600w-1418371295.jpg',
      },
    },
    cast: [
      {
        name: {
          type: String,
          required: true,
        },
        role: {
          type: String,
          required: true,
        },
      },
    ],
    date: {
      type: String,
      required: true,
    },

    streamingAt: [
      {
        place: {
          type: String,
          required: true,
        },
        numberOfTheaters: {
          type: Number,
          required: true,
        },
        numberOfShows: {
          type: Number,
          required: true,
        },
        admits: {
          type: Number,
          required: true,
        },
        // gross: {
        //   type: Number,
        //   required: true,
        // },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
