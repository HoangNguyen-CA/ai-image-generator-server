const express = require("express");
const { rateLimit } = require('express-rate-limit');


const openAIRouter = express.Router();
const { httpCreateImage } = require("./openai.controller");
const wrapAsync = require("../../errorHandling/wrapAsync");


const openAILimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 10, // start blocking after 10 requests
    message:
        "Too many requests created from this IP, please try again after an hour"
});



openAIRouter.get("/createimage", openAILimiter, wrapAsync(httpCreateImage));

module.exports = openAIRouter;
