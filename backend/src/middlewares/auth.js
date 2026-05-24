import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

export const auth = async (req, res, next) => {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer "))
        return res.status(401).json({ message: "Token tidak ada" });

    const token = header.slice("Bearer ".length);

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findByPk(payload.sub);
        if (!user) return res.status(401).json({ message: "Token tidak valid" });
        req.user = {
            id: user.id,
            role: user.role,
            name: user.name,
        };
        return next();
    } catch (err) {
        return res.status(401).json({ message: "Token tidak valid" });
    }
};