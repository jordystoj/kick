const League = require('../../models/League');

createLeague = (req, res) => {
    // get data from the form 
    var leagueName = req.body.leagueName;
    var gender = req.body.gender;
    var age = req.body.age;
    var state = req.body.state;

    // build a new object to create the new league
    var newLeague = {
        leagueName: leagueName,
        gender: gender,
        age: age,
        state: state,
    };

    // create the league
    League.create(newLeague, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        }
        else {
            //redirect to index page
            res.redirect("/dashboard/leagues");
        }
    });
}

getLeaguesDashboard = async (req, res) => {
    const leagues = await League.find({$and: [{year: "2020", active: true}]})
    res.render('./dashboard/leagues', {leagues, leagues});
}

checkLeagues = async (req, res) => {
    const check = req.params.check;
    const leagues = await League.find({$and: [{year: "2020", active: true}]})
    res.render('./dashboard/leagues', {check: check, leagues: leagues});
}

editLeagueGet = async (req, res) => {
    const leagueid = req.params.leagueid;
    const check = req.params.check;
    const league = await League.find({_id: leagueid});
    res.render('./dashboard/leagues', {check: check, league: league});
}

editLeagueFormGet = async (req, res, next) => {
    const leagueid = req.params.leagueid;

    const check = req.params.check

    const league = await League.findById(leagueid);

    // Edit league form gets rendered in here
    res.render('./dashboard/leagues', { league: league, check: check })

}

editLeagueFormPost = async (req, res, next) => {
    const leagueid = req.params.leagueid

    let active;

    if(req.body.active == 'on'){
        active = true;
    } else if(req.body.active !== 'on'){
        active = false;
    }

    const updateData = {
        leagueName: req.body.leagueName,
        gender: req.body.gender,
        age: req.body.age,
        state: req.body.state,
        active: active
    };

    const updateQuery = { _id: leagueid };

    await League.updateOne(updateQuery, updateData, (err, data) => {
        if (err){
            console.log(err);
        }

        res.redirect('/dashboard/leagues/edit')
    })
}

module.exports = {
    createLeague,
    getLeaguesDashboard,
    checkLeagues,
    editLeagueGet,
    editLeagueFormGet,
    editLeagueFormPost
}