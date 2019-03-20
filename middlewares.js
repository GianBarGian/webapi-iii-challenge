function checkName(req, res, next) {
    const name = req.query.name;

    name
    ? next()
    : next({
        status: 500,
        message: "I need a name",
    })
}

module.exports = {
    checkName,
}