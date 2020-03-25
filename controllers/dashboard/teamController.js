const express = require("express");
const router = express.Router();
const Team = require("../../models/Team");
const League = require("../../models/League");
const Club = require("../../models/Club");

// Index route for the teams dashboard page
getIndexTeams = async (req, res, next) => {
    const teamsNumberNPL1 = await Team.countDocuments({ leagueid: '5e3ff1062345ebe5f4ddefcb' });
    const newTeams = await Club.find({}).sort({ createdAt: -1 }).limit(4);

    res.render('./dashboard/teams', 
        {
            teamsNumberNPL1: teamsNumberNPL1
        }
    )
}

// Add team routes
getTeamsCheck = async (req, res, next) => {
    const check = req.params.check;
    const leagues = await League.find({});
    const clubs = await Club.find({});
    res.render('./dashboard/teams', { check: check, leagues: leagues, clubs, clubs});
}

// Add team routes
postTeamsAdd =  async (req, res, next) => {
    const clubid = req.body.clubid;
    const leagueid = req.body.leagueid;

    // Build Team Name: Club name + age + gender
    const club = await Club.findById(clubid);
    const league = await League.findById(leagueid);
    const clubName = club.clubName;
    const leagueAge = league.age.toUpperCase();
    const leagueGender = league.gender.toUpperCase();
    const teamName = clubName + " " + leagueAge + " " + leagueGender;

    // Creating a new team object to be put into the database
    const newTeam = {
        clubid: clubid,
        leagueid: leagueid,
        teamName: teamName
    };

    // Adding the team object to the Team collection
    Team.create(newTeam, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect("/dashboard/teams/add");
        }
    });
}

module.exports = {
    getIndexTeams,
    getTeamsCheck,
    postTeamsAdd,
}