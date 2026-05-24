import bcrypt from "bcrypt";
import { User } from "../models/index.js";
import { signAccessToken } from "../utils/jwt.js";
import { Op } from "sequelize";

export const registerUser = async (userData) => {
    const role = userData.role || "user";

    try {
        const passwordHash = await bcrypt.hash(userData.password, 12);

        const user = await User.create({
            name: userData.name,
            email: userData.email,
            password: passwordHash,
            role,
        });

        const token = signAccessToken({
            sub: user.id,
            role: user.role,
            name: user.name,
        })

        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        };
    } catch (error) {
        if (error?.name === "SequelizeUniqueConstraintError") {
            throw new Error("Email sudah terdaftar");
        }
        throw new Error(`Database error: ${error.message}`);
    }
}

export const loginUser = async ({ username, password }) => {
    if (!username || !password)
        throw new Error("Username atau password salah");

    const user = await User.scope("withPassword").findOne({ where: { name: { [Op.iLike]: username } } });
    if (!user) throw new Error("Username atau password salah");

    const comparePass = await bcrypt.compare(password, user.password);
    if (!comparePass) throw new Error("Username atau password salah");

    const token = signAccessToken({
        sub: user.id,
        role: user.role,
        name: user.name,
    });

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            created_at: user.created_at,
        },
    };
};

export const getUserById = async (id) => {
    const user = await User.findByPk(id);
    if (!user)
        throw new Error("User tidak ditemukan");

    return user;
}