const express = require('express');
const posts = require('./data/helpers/postDb');
const users = require('./data/helpers/userDb');
const md = require('./middlewares');
const err = require('./errors');

const routes = express.Router();

routes.use(express.json());

// POSTS REQUESTS
routes.get('/api/posts', (req, res, next) => {
    posts.get()
        .then(posts => {
            res.json(posts);
        })
        .catch(err => {
            next({
                status: 500,
                message: "The posts information could not be retrieved." 
            })
        });
})

routes.get('/api/posts/:id', (req, res, next) => {
    const { id } = req.params;  
    posts.getById(id)
        .then(post => {
            post
            ? res.json(post)
            : next({
                status: 404,
                message: "The post with the specified ID does not exist." 
            })
        })
        .catch(err => {
            next({
                status: 500,
                message: "The post information could not be retrieved." 
            })
        });
})

// USERS REQUESTS

routes.get('/api/users', (req, res, next) => {
    users.get()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            next({
                status: 500,
                message: "The users information could not be retrieved." 
            })
        });
})

routes.get('/api/users/:id', (req, res, next) => {
    const { id } = req.params;  
    users.getById(id)
        .then(user => {
            user
            ? res.json(user)
            : next({
                status: 404,
                message: "The user with the specified ID does not exist." 
            })
        })
        .catch(err => {
            next({
                status: 500,
                message: "The user information could not be retrieved." 
            })
        });
})

routes.use(err.error);

module.exports = routes;