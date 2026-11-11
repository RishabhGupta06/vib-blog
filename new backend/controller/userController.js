const User = require("../modules/user");
const bcrypt = require("bcrypt");


async function newUser(req,res) {
 try{   
    
    const {name, email, password} = req.body;


    const hashPassword = await bcrypt.hash(password,10);

    await User.create({
        name,
        email,
        password : hashPassword
    });

    res.status(201).send("User Created succesfully");
}
catch(error){
    res.status(500).json({
            error: error.message
        });
}

};