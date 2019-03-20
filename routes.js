const express = require('express');
const posts = require('./data/helpers/postDb');
const users = require('./data/helpers/userDb');
const md = require('./middlewares');

const routes = express.Router();

routes.use(express.json());

module.exports = routes;