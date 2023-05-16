import jwt from 'jsonwebtoken';

const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
        const decoded = jwt.verify(token, "random_secret_key123");

        req.userId = decoded._id;

        next();
        } catch (e) {
        return res.status(403).json({
            message: 'Нет доступа',
        });
        }
    } else {
        return res.status(403).json({
        message: 'Нет доступа',
        });
    }
};

export default checkAuth
