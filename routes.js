const express = require('express');
const posts = require('./data/helpers/postDb');
const users = require('./data/helpers/userDb');
const md = require('./middlewares');

const routes = express.Router();

routes.use(express.json());

// POSTS REQUESTS
routes.get('/api/posts', (req, res) => {
    posts.get()
        .then(posts => {
            res.json(posts);
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The posts information could not be retrieved." });
        });
})

routes.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;  
    posts.getById(id)
        .then(post => {
            post
            ? res.json(post)
            : res
                .status(404)
                .json({ message: "The post with the specified ID does not exist." });
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The post information could not be retrieved." });
        })
})

// USERS REQUESTS

routes.get('/api/users', (req, res) => {
    users.get()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The users information could not be retrieved." });
        });
})

routes.get('/api/users/:id', (req, res) => {
    const { id } = req.params;  
    users.getById(id)
        .then(user => {
            user
            ? res.json(user)
            : res
                .status(404)
                .json({ message: "The user with the specified ID does not exist." });
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The user information could not be retrieved." });
        })
})

module.exports = routes;