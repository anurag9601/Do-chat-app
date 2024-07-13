const User = require("../models/user.model")

const signup = async (req, res) => {
    try {
        const {fullname, username, password, confirmPassword, gender} = req.body;

        if (password != confirmPassword) {
            return res.status(400).json({error: "Passwords don't match"});
        }

        const user = await User.findOne({username});

        if (user) {
            return res.status(400).json({error: "Username already exists"});
        }

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName: fullname,
            username,
            password,
            gender,
            profilePic: gender === 'male' ? boyProfilePic: girlProfilePic,
        })

        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic,
        })
    } catch (error) {
        console.log("Error in signup method", error.message);
        res.status(500).json({error: error.message})
    }
} 

module.exports = {signup}