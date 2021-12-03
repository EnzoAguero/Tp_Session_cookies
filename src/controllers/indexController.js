const { validationResult } = require("express-validator");

module.exports = {
    home: (req, res) => {
        return res.render('index')
    },
    userRegister: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let { nombre, colorFondo, email, edad } = req.body;

            if (res.locals.user) {
                res.locals.user.colorFondo = colorFondo;
            }

            if (req.body.recordar) {
                res.cookie("color", req.body.colorFondo, { maxAge: 120000 });
            }
            req.session.user = {
                colorFondo,
                nombre,
                email,
                edad
            };
            return res.render('index', { nombre, colorFondo, email, edad })
        } else {
            return res.render('index', { errors: errors.mapped(), old: req.body })
        }

    },
    userInfo: (req, res) => {
        res.render('user', {
            colorFondo: req.session.user.colorFondo,
            nombre: req.session.user.nombre,
        })
    },
    reset: (req, res) => {
        req.session.destroy();
        res.cookie('color', null, { maxAge: -1 })
        res.redirect("/");
    }
}