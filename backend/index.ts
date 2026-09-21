import { PrismaClient, } from "@prisma/client";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());
const port = 3000;
const prisma = new PrismaClient;

app.listen(port, () => {
	console.log(`Fullstack Final Project listening on port ${port}`);
})

app.post("/signup", async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email) throw new Error("Email missing");
        if (!password) throw new Error("Password missing");

        const salt = await bcrypt.genSalt(8);
        await prisma.user.create({
            data: {
                email,
                password: await bcrypt.hash(password, salt),
            }
        })

        res.status(200).json({message: "User successfully created"});
    } catch (err)
    {
        console.log("error");
        console.log(err);
        res.status(400).json({"message": `${err}`});
    }
});

app.post("/login", async (req, res) => {
    const {email, password} = req.body;
    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
            select: {
                id: true,
                password: true,
            }
        });

        if (!existingUser) throw new Error("No account with that email");
        console.log([password]);
        const passwordIsValid = await bcrypt.compare(password, existingUser.password);
        if (!passwordIsValid) throw new Error("Password doesn't match");

        const token = jwt.sign({id: existingUser.id, email}, process.env.AUTH_SECRET as string);
        res.status(200).json({message: "Successfully logged in", token});
    } catch (err) {
        console.log("error");
        console.log(err);
        res.status(400).json({"message": `${err}`});
    }
});

app.get("/products", async (req, res) => {
    try {
        
    } catch (err)
    {
        console.log("error");
        console.log(err);
        res.status(400).json({"message": `${err}`});
    }
});

app.post("/", async (req, res) => {
    try {

        res.status(200).json({message: ""});
    } catch (err)
    {
        console.log("error");
        console.log(err);
        res.status(400).json({"message": `${err}`});
    }
});

app.post("/", async (req, res) => {
    try {

        res.status(200).json({message: ""});
    } catch (err)
    {
        console.log("error");
        console.log(err);
        res.status(400).json({"message": `${err}`});
    }
});