const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' })
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyparser = require('body-parser')
const UserModel = require('./db/Model'); // Import the UserModel

const routes = require('./router/route'); // Import the routes module
const bodyParser = require('body-parser')
require('./db/Config')

app.use(cors());
const PORT = process.env.PORT
const JWT_SECRET = process.env.JWT_SECRET;
require('./db/Model')

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', routes);

app.post('/signup', async(req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("Error registering user:", error.message);

        res.status(500).json({ error: 'An error occurred' });
    }
});

app.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});


app.get('/userprofile', async(req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);

    } catch (err) {
        console.error('Error fetching data from MongoDB:', err);
        res.status(500).json({ message: 'Error fetching data from MongoDB' });
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});