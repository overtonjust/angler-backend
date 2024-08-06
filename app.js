// Dependencies
const express = require('express');
const cors = require('cors');
const app = express();
const session = require('express-session');
const usersController = require('./controllers/usersController');
const indexController = require('./controllers/indexController');
const watchlistController = require('./controllers/watchlistController');
const finderController = require('./controllers/finderController');

// Validation
const { validateUser } = require('./validation/loginValidation');

// Queries
const {
    loginUser,
    createUser,
} = require('./queries/usersQueries');

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(
    session({
        secret: "angler test",
        saveUninitialized: false,
        resave: false,
        cookie: {
            sameSite: 'lax',
            maxAge: (60000 * 60) * 24,
        },
    })
)
app.use('/user', usersController);
app.use('/index', indexController);
app.use('/watchlists', validateUser, watchlistController);
app.use('/finder', finderController);

// Routes
app.get('/', (req, res) => {
    req.session.visited = true;
    res.send('Welcome to Angler!')
});

app.post('/signup', async (req, res) => {
    const newUser = await createUser(req.body);

    if(newUser.id){
        const authLogin = await loginUser(newUser);
        req.session.user = authLogin;
        res.status(201).json({ message: "New user created. Welcome to Angler!"})
    } else {
        res.status(404).json({error: "Something went wrong"})
    }
});

app.post('/login', async (req, res) => {
    const authLogin = await loginUser(req.body);

    if(authLogin.id) {
        req.session.user = authLogin;
        req.session.save( (err) => {
            if(err) return next(err)
        })
        res.status(201).json({ message: "Login successful"})
    } else {
        res.status(401).json({ error: "Invalid username or password"})
    } 
    
});

app.get('/logout', (req, res) => {
    req.session.user = null;
    req.session.save( (err) => {
        if(err) next(err)
        req.session.regenerate( (err) => {
            if(err) next(err)
            res.status(200).json({message: "Successfully logged out"})
        })
    })
})

app.get('/auth/status', async (req, res) => {
    req.sessionStore.get(req.sessionID, (err, session) => {
    })
    req.session.user ? 
    res.status(200).json({message: "Successfuly authorized"}) : 
    res.status(401).json({error: "Not authenticated"})
});

app.get('*', (req, res) => {
    res.status(404).json({error: "Path not found"})
});

module.exports = app;