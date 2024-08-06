const validateUser = (req, res, next) => {
    if(req.session.user) {
        next();
    } else {
        res.status(401).json({error: "Please log in."})
    }
};

module.exports = { validateUser };