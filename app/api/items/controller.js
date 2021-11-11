const { Item } = require("../../db/models");
module.exports = {
  // Pakai Async Await
  create: async (req, res, next) => {
    try {
      const { name, todoId } = req.body;
      const result = await Item.create({ name, todoId });
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
      const result = await Item.findOne(
        {
          where: { id },
          attributes: ["id", "name", "todoId"],
        },
        { _id: 0, numlegs: 1, class: 1, name: 1 }
      );
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
    Item.findOne(
      { where: { id }, attributes: ["id", "name", "todoId"] },
      { _id: 0, numlegs: 1, class: 1, name: 1 }
    )
      .then((item) => {
        item.update({ name }).then(() =>
          res.status(200).json({
            message: "Success Update",
            data: item,
          })
        );
      })
      .catch((err) => next(err));
  },

  destroy: (req, res, next) => {
    const { id } = req.params;
    Item.findOne(
      { where: { id }, attributes: ["id", "name", "todoId"] },
      { _id: 0, numlegs: 1, class: 1, name: 1 }
    )
      .then((item) => {
        item.destroy().then(() =>
          res.status(200).json({
            message: "Success Delete",
            data: item,
          })
        );
      })
      .catch((err) => next(err));
  },

  move: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { targetTodoId } = req.body;
      const result = await Item.findOne(
        {
          attributes: ["id", "name", "todoId"],
          where: { id },
        },
        { _id: 0, numlegs: 1, class: 1, name: 1 }
      );
      result.todoId = targetTodoId;
      console.log(result);

      await result.save();
      res.status(200).json({ message: "Success Move", data: result });
    } catch (err) {
      next(err);
    }
  },
};
