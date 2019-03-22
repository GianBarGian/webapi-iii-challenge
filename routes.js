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

routes.delete('/api/posts/:id', (req, res, next) => {
    const { id } = req.params;
    posts.remove(id)
        .then(removed => {
            removed
            ? posts.get()
                .then(posts => {
                    res.json(posts);
                })
            : next({
                status: 404,
                message: "The post with the specified ID does not exist." 
            })
        })
        .catch(err => {
            next({
                status: 500,
                message: "The post could not be removed." 
            })
        });
})

routes.post('/api/posts/:userId', (req, res, next) => {
    const { userId } = req.params;
    const newPost = {
        text: req.body.text,
        user_Id: userId,
    }

    newPost.text
    ?   users.getById(userId)
        .then(user => {
            user
            ? posts.insert(newPost)
            .then(post => {
                res.json(post)
            })
            .catch(err => {
                next({
                    status: 500,
                    message: "The post could not be posted." 
                })
            })
            : next({
                status: 404,
                message: "The user with the specified ID does not exist." 
            }) 
        })
        
    : next({
        status: 400,
        message: "Provide a text for the post" 
    })
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

routes.delete('/api/users/:id', (req, res, next) => {
    const { id } = req.params;
    users.remove(id)
        .then(removed => {
            removed
            ? users.get()
                .then(users => {
                    res.json(users);
                })
            : next({
                status: 404,
                message: "The user with the specified ID does not exist." 
            })
        })
        .catch(err => {
            next({
                status: 500,
                message: "The user could not be removed." 
            })
        });
})

routes.post('/api/users', md.checkName, (req, res, next) => {
    const name = req.query.name;

    users.insert({ name })
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            next({
                status: 500,
                message: "The user could not be posted." 
            })
        })
})

routes.put('/api/users/:id', md.checkName, (req, res, next) => {
    const { id } = req.params;
    const name = req.query.name;

    users.update(id, { name })
        .then(updated => {
            updated
            ? users.getById(id)
                .then(user => {
                    res.json(user);
                })
            : next({
                status: 400,
                message: "the user with that id doesn't exists"
            })
        })
        .catch(err => {
            next({
                status: 500,
                message: "The user could not be updated"
            })
        })
})

routes.use(err.error);

module.exports = routes;