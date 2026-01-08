// Middleware
require('dotenv').config()
const jwt = require('jsonwebtoken');
// const express = require('express');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.userId;
        next();
    } catch {
        res.status(401).json({ error: "Unauthorized" });
    }
};


// Why req.userId Is Important( req.userId = decoded.userId; )

    // This allows you to:

        // Fetch logged-in user data

        // Restrict access to own resources

        // Track who created what