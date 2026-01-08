//***************** JWT tokens for auth *****************//
// import 
const jwt = require('jsonwebtoken'); // jsonwebtoken library
const bcrypt = require('bcrypt')

// create a JWT token
const token = jwt.sign(
    { userId: "123" },
    "secretKey",
    { expiresIn: '1h' }
);

console.log("Generated JWT:", token);

//################## Storing Hashed Passwords ########################

// Hash a password using *** bcrypt ***

async function hashPassword() {
    const password = "mypassword123";
    const hashed = await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashed);

    const isMatch = await bcrypt.compare(
    "mypassword123",
    hashed
);

console.log(isMatch); 
}

hashPassword()





