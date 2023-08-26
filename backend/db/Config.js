const express = require('express')
const mongoose = require('mongoose')

const Db = process.env.DATABASE

mongoose.connect(Db, {
        useNewUrlParser: true,

        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB Atlas:', error);
    });