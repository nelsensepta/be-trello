const { body, param, validationResult } = require("express-validator");
const { Todo } = require("../../db/models");

const validateCreate = [
  body("name").notEmpty().withMessage("Name is Required"),
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(422).json({
        message: "Error",
        error: error.array(),
      });
    }
    next();
  },
];

const validateOne = [
  param("id")
    .isNumeric()
    .withMessage("Id must be an Integer")
    .bail()
    .notEmpty()
    .withMessage("Param id is Required")
    .bail()
    .custom(async (value, { req }) => {
      console.log(value);
      const checking = await Todo.findOne({ where: { id: value } });
      if (checking === null) {
        return Promise.reject();
      }
    })
    .withMessage("Param Id not found"),
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(422).json({
        message: "Error",
        error: error.array(),
      });
    }
    next();
  },
];

const validateUpdate = [
  param("id")
    .isNumeric()
    .withMessage("Id must be an Integer")
    .bail()
    .notEmpty()
    .withMessage("Param id is Required")
    .bail()
    .custom(async (value) => {
      console.log(value);
      const checking = await Todo.findOne({ where: { id: value } });
      if (checking === null) {
        return Promise.reject();
      }
    })
    .withMessage("Param Id not found"),
  body("name").notEmpty().withMessage("Name is Required"),
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(422).json({
        message: "Error",
        error: error.array(),
      });
    }
    next();
  },
];

module.exports = { validateCreate, validateOne, validateUpdate };
