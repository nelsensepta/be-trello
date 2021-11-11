const { Todo, Item } = require("../../db/models");
module.exports = {
  // Pakai Async Await
  getAll: async (req, res, next) => {
    try {
      const result = await Todo.findAll({
        attributes: ["id", "name"], // Find Column Tabel Spesifik
        include: { model: Item, attributes: ["id", "name", "todoId"] }, // Relasi Antar Tabel
      });
      res.status(200).json({
        message: "Success GetAll",
        menit: "1.46.27 Item Controller",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },
  create: async (req, res, next) => {
    try {
      const { name } = req.body;
      const result = await Todo.create({ name });
      res.status(201).json({
        message: "Success Create",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },

  getOne: async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await Todo.findOne({
        where: { id },
      });
      res.status(200).json({
        message: "Success GetOne",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },

  // Pakai Promise Then
  update: (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    Todo.findOne({ where: { id } })
      .then((todo) => {
        todo.update({ name }).then(() =>
          res.status(200).json({
            message: "Success Update",
            data: todo,
          })
        );
      })
      .catch((err) => next(err));
  },

  destroy: (req, res, next) => {
    const { id } = req.params;
    Todo.findOne({ where: { id } })
      .then((todo) => {
        todo.destroy().then(() =>
          res.status(200).json({
            message: "Success Delete",
            data: todo,
          })
        );
      })
      .catch((err) => next(err));
  },
};
