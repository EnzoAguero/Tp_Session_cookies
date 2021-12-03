
function checkCookie(req, res, next) {
    if (req.cookies.color != undefined && req.session.user == undefined) {
        req.session.user.colorFondo = req.cookies.color;
    }

    if (req.session.user) {
        res.locals.user = { ...req.session.user }
    }
    next();
}

module.exports = checkCookie;