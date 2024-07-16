const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const logger = require('../logger');
const { where } = require('sequelize');
const { log } = require('winston');

const prisma = new PrismaClient();

const signUp = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const [isEmailPresent, isUserPresent] = await Promise.all([
            prisma.user.findUnique({ where: { email } }),
            prisma.user.findUnique({ where: { username } })
        ]);
        if (isEmailPresent) {
            logger.info('Email is already present', email)
            return res.status(400).json({ message: 'Email is already registered' });
        }
        if (isUserPresent) {
            logger.info('Username is already present', email)
            return res.status(400).json({ message: 'Username is already registered' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                role,
            },
        });
        logger.info('User signed up: %s', email);
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        logger.error('Error signing up user: %O', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET);
        logger.info('User logged in: %s', email);
        res.status(200).json({ token });
    } catch (error) {
        logger.error('Error logging in user: %O', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    signUp,
    login,
};
