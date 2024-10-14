const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/paytm-clone', {replicaSet:"rs"})
// mongoose.connect('mongodb://localhost:27017/paytm-clone?replicaSet=rs').then(res => {
//     console.log('Connected to MongoDB');
// }).catch(err => {
//     console.log('Error connecting to MongoDB', err);
// });
mongoose.connect('mongodb+srv://wahib:wahib22038@cluster0.avydm.mongodb.net/paytm-clone').then(res => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log('Error connecting to MongoDB', err);
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
});

const Users = mongoose.model('Users', userSchema);

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"Users",
    },
    balance:{
        type: Number,
        required: true
    }
})

const Account = mongoose.model('Account', accountSchema);

module.exports = { Users, Account };
