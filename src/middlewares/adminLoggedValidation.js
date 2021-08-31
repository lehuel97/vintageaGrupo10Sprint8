function adminLoggedValidation(req, res, next) {
    if(req.session.userLogged){
    if(req.session.userLogged != false){
     
    if (req.session.userLogged.isAdmin != 1) {
        return res.redirect('/users/inicio-sesion')
    }
}
}else{
    return res.redirect('/users/inicio-sesion')
}

    next();
}

module.exports = adminLoggedValidation;