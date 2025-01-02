import jwt from "jsonwebtoken";

const checkAuthentication = (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({ message: "Unauthorized", success: false })
        }
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET)
        if (verifyToken) {
            req.id = verifyToken.userId
            next()
        } else {
            return res.status(401).json({ message: "Unauthorized", success: false })
        }
    } catch (error) {

    }
}

export default checkAuthentication;