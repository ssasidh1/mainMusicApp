import express from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import authUsersFromDB from './authUserFromDB';
dotenv.config();
const app = express();
app.use(express.json());
app.get('/playlist', authenticateToken, async (req, res) => {
    const resp = await authUsersFromDB(req.body.email, req.body.password);
    res.send({ 'res': resp });
});
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && (authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1]);
    if (token === null)
        return res.sendStatus(401);
    if (token && process.env.ACCESS_TOKEN) {
        const accessTK = process.env.ACCESS_TOKEN;
        jwt.verify(token, accessTK, (err, username) => {
            if (err)
                return res.sendStatus(403);
            req.user = typeof username === 'object' ? username.name : '';
            next();
        });
    }
}
app.listen(3000, () => {
    console.log("listening 3000");
});
