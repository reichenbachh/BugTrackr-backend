const commentModel = require("../models").Comment;

//@todo fix comment uuid

exports.createComment = async (req, res) => {
  try {
    const text = req.body.text;
    const ticketId = req.query.ticketId;

    const newComment = await commentModel.create({
      text,
      ticketId,
    });
    responseCreator(200, "comment added", res, true, "");
  } catch (error) {
    console.log(error.original || error);
    responseCreator(401, "unable to add comment", res, false, "");
  }
};

exports.deleteComment = async (req, res) => {
  try {
    await commentModel.destroy({
      where: {
        id: req.query.commentId,
      },
    });

    responseCreator(200, "comment deleted", res, true, "");
  } catch (error) {
    console.log(error.original);
    responseCreator(400, "unable to delete comment", res, false, "");
  }
};

exports.updateComment = async (req, res) => {
  try {
    await commentModel.update(
      {
        text: req.body.text,
      },
      {
        where: {
          id: req.query.commentId,
        },
      }
    );
    responseCreator(200, "comment updated", res, true, "");
  } catch (error) {
    console.log(error.original);
    responseCreator(400, "unable to update comment", res, false, "");
  }
};

const responseCreator = (statusCode, message, res, success, data) => {
  return res.status(statusCode).json({
    success: success,
    msg: message,
    data: data,
  });
};
