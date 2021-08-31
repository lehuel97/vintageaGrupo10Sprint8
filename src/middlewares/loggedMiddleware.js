function loggedMiddleware(req, res, next) {
    console.log('aca va a ir el session ')
    console.log(req.session.userLogged)
    if (req.session.userLogged) {

        //console.log('entre al coso del session, deberia estar en locals ahora...')
        res.locals.userLogged = req.session.userLogged
        return res.redirect('/users/profile')
    }
    next();
}

module.exports = loggedMiddleware;