// const express = require('express'); 
// const mongoose = require('mongoose');
// const app = express();
// import checksignup from './signup'

// // Middleware to parse JSON request bodies
// app.use(express.json());
// const cors = require('cors');


// app.use(cors());
// const PORT = 3001;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// // MongoDB connection
// mongoose.connect('mongodb+srv://spenxu2002:Blair.0713@cluster0.q82c7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
//   .then(() => console.log('Connected to MongoDB!'))
//   .catch((err) => console.error('MongoDB connection error:', err));


//   const [isUser, setisUser] = useState(false);
// // User schema to store email and password
// const userSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true, // Ensures unique emails
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });

// // Create User model from schema
// const User = mongoose.model('User', userSchema);

// console.log('here')
// const createUser = async (email, pw) => {
//   try {
//     // Create a new user document

//     const newUser = new User({ email, password: pw });
    
//     // Save the user to the database
//     await newUser.save();
//     console.log('User saved:', newUser);
//   } catch (error) {
//     console.error('Error saving user:', error.message);
//   }
// };