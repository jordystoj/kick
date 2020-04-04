const Contact = require('../../models/Contact');

getInbox = async (req, res) => {
    const messages = await Contact.find({}).sort({ 'createdAt': -1});
    const unanswered = await Contact.find({answered: false}).countDocuments();
    res.render('./dashboard/inbox', {messages: messages, unanswered: unanswered});
}

messageComplete = async (req, res) => {
    // Get user id from body
    const messageId = req.body.messageId;

    // Update this club admin using userId to active true
    await Contact.updateOne({_id: messageId}, {answered: true}, (err, data) => {
        if(err){
            console.log(err);
        } else {
            res.send('Success');
        }
    })
}


module.exports = {
    getInbox,
    messageComplete
}