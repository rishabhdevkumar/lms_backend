const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ ok: false, msg: "Access Denied. No token provided." });
    }

    try {
        const verified = jwt.verify(token, "your_secret_key"); // Replace with actual secret key
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ ok: false, msg: "Invalid Token" });
    }
};
