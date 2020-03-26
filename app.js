const   express = require('express');
const   bodyParser = require('body-parser');
const   fileUpload = require('express-fileupload');
const   mongoose = require('mongoose');
const   passport = require('passport');
const   port = 3000;
const   path = require('path');
const   cookieParser = require('cookie-parser');


// Defining express as the app
let app = express();

// Connecting MongoDB to the application
if(process.env.NODE_ENV == 'development'){
    mongoose.connect("mongodb://localhost/kick", {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    });
}

if (process.env.NODE_ENV == 'production') {
    mongoose.connect("mongodb+srv://jordan:0kWUADlxPLvdrsjV@kickdb-py2ed.mongodb.net/test?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    });
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("The database is connected")
});

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'pug'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

const cookieSecret = "secret";
app.use(cookieParser(cookieSecret))

app.use(passport.initialize())
require('./authentication/passport');

const   authFunctions = require('./authentication/userCheck')

const getHomePage = require('./routes/index');
const getSignInPage = require('./routes/signin');
const registerRoute = require('./routes/register');
const dashboard = require('./routes/dashboard/dashboard');
const clubsDashboard = require('./routes/dashboard/clubs');
const leaguesDashboard = require('./routes/dashboard/leagues')
const teamsDashboard = require('./routes/dashboard/team');
const verifyDashboard = require('./routes/dashboard/verify');
const fixtureDashboard = require('./routes/dashboard/fixture')
const userIndexDashboard = require('./routes/userDashboard/index');
const playerDashboard = require('./routes/dashboard/player');
const infoRoutes = require('./routes/info/info');
// Not Secure
const clubIndexRoutes = require('./routes/club/index');

const clubRoutes = require('./routes/club/dashboard')

// routes for the app
app.use(getHomePage);
app.use(getSignInPage);
app.use(registerRoute);

// Info Routes
app.use('/info', infoRoutes);

// Club dashboard routes
app.use('/club', clubIndexRoutes);

// Club dashboard routes
app.use('/clubs' , passport.authenticate('jwt', {session: false }), authFunctions.isClubAdmin, clubRoutes);

// Admin Routes
app.use('/dashboard',passport.authenticate('jwt', {session: false }), authFunctions.isWebsiteAdmin, dashboard);
app.use('/dashboard',passport.authenticate('jwt', {session: false }), authFunctions.isWebsiteAdmin, clubsDashboard);
app.use('/dashboard',passport.authenticate('jwt', {session: false }), authFunctions.isWebsiteAdmin,leaguesDashboard);
app.use('/dashboard',passport.authenticate('jwt', {session: false }), authFunctions.isWebsiteAdmin, teamsDashboard);
app.use('/dashboard',passport.authenticate('jwt', {session: false }), authFunctions.isWebsiteAdmin, fixtureDashboard);
app.use('/dashboard',passport.authenticate('jwt', {session: false }), authFunctions.isWebsiteAdmin, playerDashboard);
app.use('/dashboard',passport.authenticate('jwt', {session: false }), authFunctions.isWebsiteAdmin, verifyDashboard);

// User Routes
app.use("/user", passport.authenticate('jwt', {session: false }), authFunctions.isUser, userIndexDashboard);

// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
    console.log(process.env.NODE_ENV);
});