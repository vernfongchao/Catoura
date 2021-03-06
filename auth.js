const db = require('./db/models');

const login = (req, res, user) => {
    req.session.auth = {
        userId: user.id
    };
}

const logout = (req, res) => {
    delete req.session.auth
};

const requireAuth = (req, res, next) => {

    if (!res.locals.authenticated) {
        return res.redirect('/users/login');
    };
    return next();
};

// const requireAuthQuestion= (req,res,next) =>{
//     if (!res.locals.authenticated) {
//         var url = req.originalUrl;
//         res.redirect('/users/login');
//     } else{
//         next()
//     }
// }



const restoreUser = async (req, res, next) => {
    console.log(req.session) // Assist with debugging, delete after
    if (req.session.auth) {
        const { userId } = req.session.auth;

        try {
            const user = await db.User.findByPk(userId);

            if (user) {
                res.locals.authenticated = true;
                res.locals.user = user;
                next();
            }
        } catch (err) {
            res.locals.authenticated = false;
            next(err);
        }
    } else {
        res.locals.authenticated = false;
        next();
    }
}

module.exports = { login, logout, requireAuth, restoreUser };
