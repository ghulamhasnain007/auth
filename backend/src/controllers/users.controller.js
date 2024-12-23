const { createHash, compareHash } = require('../utils/hash.utils');
const db = require('../config/db.config.js'); // Import db connection
const { JWT_SECRET } = require('../config/server.config.js');
const jwt = require('jsonwebtoken')

const createUser = async (req, res) => {
    try {
        console.log('Request Body:', req.body);

        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        const hashedPassword = await createHash(password);

        const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        const [result] = await db.query(query, [username, email, hashedPassword]);
        console.log('Insert Success:', result);
        return res.status(201).json({ message: 'User created successfully.' });
    } catch (error) {
        console.error('Server Error:', error.message);
        return res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};



const getUsers = async (req, res) => {
    try {
      const [result] = await db.query('SELECT * FROM users WHERE isAdmin = FALSE');
      return res.status(200).json({ users: result, message: "Users fetched successfully" });
    } catch (error) {
      console.error("Error fetching users:", error.message);
      return res.status(500).json({ message: "An error occurred while fetching users." });
    }
  };
  

const getOneUser = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.query('SELECT * FROM users WHERE id = ?', [id]);

        if (result.length === 0) {
            return res.status(404).json({ message: "No user found with that id" });
        }

        return res.status(200).json({ user: result[0], message: "User fetched successfully" });
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ message: error.message });
    }
};

const updateUser = async(req, res) => {
    try {
        const { id }  = req.params;
        const { username, email} = req.body;
        if(!username && !email) 
        {
            return res.status(404).json({message: "at least one field require to update"})
        }

        let query = 'UPDATE users SET ';
        const values = [];

        if(username){
            query += 'username = ?, '
            values.push(username)
        }
        if(email){
            query += 'email = ?, '
            values.push(email)
        }
        query = query.slice(0, -2);
        query += 'WHERE id = ?';
        values.push(id)

        const [result] = await db.query(query, values)
        if(result.affectedRows === 0){
            return res.status(400).json({message: "user not found"})
        }
        return res.status(200).json({data: result, message: "user updated successfully"})

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const deleteUser = async(req, res) => {
    try {
        const { id } = req.params;
        const query = `DELETE FROM users WHERE id = ?`;
        const [result] = await db.query(query, [id])

        if(result.affectedRows === 0){
            return res.status(404).json({message: `no user find by id ${id}`})
        }
        return res.status(200).json({data: result, message: `user with id ${id} successfully deleted`})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password)
        {
            return res.status(404).json({message: "please provide all fields"})
        }
        const query = "SELECT * FROM users WHERE email = ?"
        const [users] = await db.query(query, [email]);
        const user = users[0]
        if(!user){
            return res.status(401).json({message: "User Not Found"})
        }
    
        const isPasswordValid = await compareHash(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({message: "Invalid Credentials"})
        }
    
        const token = jwt.sign(
            {id: user.id, isAdmin: user.isAdmin},
            JWT_SECRET,
            { expiresIn: '1h'}
        )
        console.log(token);
        
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // Adjust for dev environment
        });

        return res.status(200).json({
            user: { id: user.id, username: user.username, email: user.email, isAdmin: user.isAdmin }, // Exclude sensitive info
            token: {token},
            message: "User logged in successfully",
        });
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const logoutUser = async (req, res) => {
    try {
        // Clear the token cookie
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // Adjust for dev environment'
        });

        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createUser,
    getUsers,
    getOneUser,
    updateUser,
    deleteUser,
    loginUser,
    logoutUser
};
