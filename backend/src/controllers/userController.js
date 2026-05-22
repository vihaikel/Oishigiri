import { registerUser, loginUser, getUserById } from "../services/userService.js";

export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "name, email dan password wajib diisi",
            });
        }

        const user = await registerUser({ name, email, password, role });

        return res.status(201).json({
            message: "Register berhasil",
            data: user,
        })
    } catch (err) {
        const status = err.message.includes("Email sudah terdaftar") ? 409 : 500;
        return res.status(status).json({ message: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password)
            return res.status(400).json({ message: "username dan password wajib diisi" });

        const result = await loginUser({ username, password });

        return res.status(200).json({
            message: "Login berhasil",
            data: result,
        });
    } catch (err) {
        const status = err.message.includes("Username atau password salah") ? 401 : 500;
        return res.status(status).json({ message: err.message });
    }
};

export const getProfile = async (req, res) => {
    try {
        const user = await getUserById(req.user.id);
        return res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
}