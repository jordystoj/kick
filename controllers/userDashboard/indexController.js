const User = require('../../models/User');
const moment = require('moment');
const clubs = require('../../public/scripts/teams');
const Post = require('../../models/Post');
const multer = require('multer');
const path = require('path');
const Player = require('../../models/Player');
const Team = require('../../models/Team');
const Club = require('../../models/Club');
const League = require('../../models/League');

getIndexUserDashboard = async (req, res, next) => {
    const user = await User.findById(req.user._id);
    const posts = await Post.find({}).sort({"createdAt": -1}).limit(15);
    // Change the clubs to find the clubs from the database
    res.render('./userDashboard/index', {user: user, moment: moment, clubs: clubs, posts:posts});
}

getPostsPage = async (req, res, next) => {
    const user = await User.findById(req.user._id);
    const posts = await Post.find({ "author.id": user._id})
    res.render('./userDashboard/posts', {user: user, moment: moment, posts: posts });
}

getPostCreateForm = async (req, res, next) => {
    const user = await User.findById(req.user._id);
    res.render('./userDashboard/postCreateForm', {user: user});
}

// const storage = multer.diskStorage({
//     destination: path.join(__dirname, './public/uploads/'),
//     filename: function(req, file, cb){
//         cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
//     }
// })

// const upload = multer({
//     storage: storage
// }).single('thumbnail');

saveNewPost = async (req, res, next) => {
    const user = await User.findById(req.user._id);
    // Get data from form
    console.log(req.body)
    const title = req.body.title;
    const postContent = req.body.postContent;
    let thumbnail = req.body.thumbnail

    // put into new Post object 
    const newPost = {
        author:{
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName
        },
        title: title,
        thumbnail: thumbnail,
        postContent: postContent
    }

    Post.create(newPost, (err, post) => {
        if(err){
            console.log(err);
        } else {
            res.redirect('/user/posts')
        }
    })
}

ajaxPlayerSearch = async (req, res, next) => {
    // Write the query first
    let search = req.body.search;
    // split the search result into array
    let splitSearch = search.split(' ');
    let query;
    // if there are multiple parts to the string, split string into array of words and then run a loop to test for the words
    for(let i = 0; i < splitSearch.length; i++){
        query = {$or: [{$or: [{firstName: {$regex: splitSearch[i], $options: 'i'}}, {lastName: {$regex: splitSearch[i], $options: 'i'}}]}, {$and:[{firstName:{$regex: splitSearch[i], $options: 'i'}},{lastName:{$regex: splitSearch[i], $options: 'i'}}]} ]}
    }
    
    await Player.find(query, (err, data) => {
        if(err){
            console.log(err);
        } 
        // console.log(data);
        res.send(data);
    }).limit(6);
}

ajaxTeamSearch = async (req, res, next) => {
    // Write the query first
    let search = req.body.search;
    // split the search result into array
    let splitSearch = search.split(' ');
    // console.log(splitSearch)
    let query;
    // Loop through the search string (words)
    for(let i = 0; i < splitSearch.length; i++){
        // query = {$or: [{$or: [{firstName: {$regex: splitSearch[i], $options: 'i'}}, {lastName: {$regex: splitSearch[i], $options: 'i'}}]}, {$and:[{firstName:{$regex: splitSearch[i], $options: 'i'}},{lastName:{$regex: splitSearch[i], $options: 'i'}}]} ]}
        // Use the search field to find the league or find the club by name
        

        // LEAGUE QUERY
        leagueQuery = {
            $or: [
                {gender: {$regex: splitSearch[i], $options: 'i'}},
                {leagueName: {$regex: splitSearch[i], $options: 'i'}},
                {state: {$regex: splitSearch[i], $options: 'i'}},
                {age: {$regex: splitSearch[i], $options: 'i'}},
                {
                    $and:[
                        {leagueName:{$regex: splitSearch[i], $options: 'i'}},
                        {gender:{$regex: splitSearch[i], $options: 'i'}}
                    ]
                },
                {
                    $and:[
                        {leagueName:{$regex: splitSearch[i], $options: 'i'}},
                        {state:{$regex: splitSearch[i], $options: 'i'}}
                    ]
                },
                {
                    $and:[
                        {leagueName:{$regex: splitSearch[i], $options: 'i'}},
                        {age:{$regex: splitSearch[i], $options: 'i'}}
                    ]
                },
                {
                    $and:[
                        {leagueName:{$regex: splitSearch[i], $options: 'i'}},
                        {age:{$regex: splitSearch[i], $options: 'i'}},
                        {gender:{$regex: splitSearch[i], $options: 'i'}}
                    ]
                },
                {
                    $and:[
                        {age:{$regex: splitSearch[i], $options: 'i'}},
                        {gender:{$regex: splitSearch[i], $options: 'i'}},
                        {state:{$regex: splitSearch[i], $options: 'i'}}
                    ]
                },
                {
                    $and:[
                        {leagueName:{$regex: splitSearch[i], $options: 'i'}},
                        {gender:{$regex: splitSearch[i], $options: 'i'}},
                        {state:{$regex: splitSearch[i], $options: 'i'}}
                    ]
                },
                {
                    $and:[
                        {leagueName:{$regex: splitSearch[i], $options: 'i'}},
                        {age:{$regex: splitSearch[i], $options: 'i'}},
                        {state:{$regex: splitSearch[i], $options: 'i'}}
                    ]
                },
                {
                    $and:[
                        {leagueName:{$regex: splitSearch[i], $options: 'i'}},
                        {age:{$regex: splitSearch[i], $options: 'i'}},
                        {state:{$regex: splitSearch[i], $options: 'i'}},
                        {gender:{$regex: splitSearch[i], $options: 'i'}}
                    ]
                },

            ]
        }

        clubQuery = {clubName: {$regex: splitSearch[i], $options: 'i'}}
    }

    // Gets the league when they are searched 
    await League.find(leagueQuery, (err, league) => {
        if(err) {
            console.log(err);
        }
        // console.log(league)
    })

    await Club.find(clubQuery, (err, club) => {
        if(err) {
            console.log(err);
        }
        // console.log(club)
    })
    
    // await Player.find(query, (err, data) => {
    //     if(err){
    //         console.log(err);
    //     } 
    //     res.send(data);
    // }).limit(6);
}

ajaxClubSearch = async (req, res, next) => {
    // Write the query first
    let search = req.body.search;

    let query = {clubName: {$regex: search, $options: 'i'}};
    
    await Club.find(query, (err, data) => {
        if(err){
            console.log(err);
        }
        res.send(data)
    }).limit(6);
}

ajaxLeagueSearch = async (req, res, next) => {
    // Write the query first
    let search = req.body.search;
    // split the search result into array
    let splitSearch = search.split(' ');
    let query;
    // if there are multiple parts to the string, split string into array of words and then run a loop to test for the words
    for(let i = 0; i < splitSearch.length; i++){
        query = {$or: [{$or: [{firstName: {$regex: splitSearch[i], $options: 'i'}}, {lastName: {$regex: splitSearch[i], $options: 'i'}}]}, {$and:[{firstName:{$regex: splitSearch[i], $options: 'i'}},{lastName:{$regex: splitSearch[i], $options: 'i'}}]} ]}
    }
    
    await Player.find(query, (err, data) => {
        if(err){
            console.log(err);
        } 
        // console.log(data);
        res.send(data);
    }).limit(6);
}

module.exports = {
    getIndexUserDashboard,
    getPostsPage,
    getPostCreateForm,
    saveNewPost,
    ajaxPlayerSearch,
    ajaxTeamSearch,
    ajaxClubSearch,
    ajaxLeagueSearch,
}