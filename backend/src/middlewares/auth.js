import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer "))
        return res.status(401).json({ message: "Token tidak ada" });

    const token = header.slice("Bearer ".length);

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: payload.sub,
            role: payload.role,
        };
        return next();
    } catch (err) {
        return res.status(401).json({ message: "Token tidak valid" });
    }
};