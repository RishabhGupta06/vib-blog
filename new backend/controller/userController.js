const User = require("../modules/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function newUser(req, res) {
    try {

        const { name, email, password } = req.body;
        if (!password || typeof password !== "string") return res.status(400).send("Invalid Password");
        const hashPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashPassword
        });

        res.status(201).send("User Created succesfully");
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        });
    }

};

async function matchUser(req, res) {
    try {
        const { email, password } = req.body;

        if (
            !email ||
            typeof email !== "string" ||
            !password ||
            typeof password !== "string"
        ) {
            return res.status(400).send("Invalid email or password");
        }

        const temp = await User.findOne({ email });

        if (!temp) {
            return res.status(404).send("User not found");
        }

        const isMatch = await bcrypt.compare(
            password,
            temp.password
        );

        if (!isMatch) {
            return res.status(400).send("Password was invalid");
        }

        const token = jwt.sign(
            {id: temp._id},
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        )

        res.status(200).json({
            message: "Login successful",
            token

        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}


module.exports = { newUser, matchUser };