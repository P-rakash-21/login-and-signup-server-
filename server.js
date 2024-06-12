// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Dummy database (for demonstration)
let users = [];

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Signup endpoint
app.post('/signup', (req, res) => {
    const { email, username, password } = req.body;
    
    // Check if user already exists
    if (users.some(user => user.username === username)) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    // Create new user (for demonstration, push to array)
    users.push({ email, username, password });

    // Redirect to login page after successful signup
    res.redirect('/login.html');
});

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check credentials (for demonstration, simple check)
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Redirect to success page after successful login
    res.redirect('/index.html');
});

// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
