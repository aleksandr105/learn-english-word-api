const joi = require("joi");

const sendMessageDeveloperSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  message: joi.string().required(),
});

module.exports = sendMessageDeveloperSchema;
