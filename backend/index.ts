import { PrismaClient, } from "@prisma/client";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import auth, { CustomRequest } from "./auth";

const app = express();
app.use(express.json());
const port = 3000;
const prisma = new PrismaClient;

app.listen(port, () => {
	console.log(`Fullstack Final Project listening on port ${port}`);
})

// Account
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

// Products - (Public)
app.get("/products/forsale", async (req, res) => {
    try {
        const result = await prisma.product.findMany({
            where: {
                isForSale: true
            }
        })
        res.status(200).json({products: result});
    } catch (err)
    {
        console.log("error");
        console.log(err);
        res.status(400).json({"message": `${err}`});
    }
});

// Products - (Seller)
app.get("/products", auth, async (req: CustomRequest, res) => {
    const user = req.user;
    try {
		if (!user?.email) throw new Error("Not logged in");

        const result = await prisma.product.findMany({
            where: {
                sellerEmail: user.email,
            }
        })
        res.status(200).json({products: result});
    } catch (err)
    {
        console.log("error");
        console.log(err);
        res.status(400).json({"message": `${err}`});
    }
});
app.post("/products", auth, async (req: CustomRequest, res) => {
	const body = req.body;
	const user = req.user;

	const { name, price, isForSale } = body;
	try {
		if (!name) throw new Error("Name is required");
		if (!price) throw new Error("Price is required");
		if (!user?.email) throw new Error("Not logged in");

		const createdProduct = await prisma.product.create({
			data: {
				name,
				price,
                isForSale: isForSale == true || isForSale == "true",
				sellerEmail: user.email,
			},
			select: {
				id : true
			}
		});

		res.status(200).json({message: `Product with id ${createdProduct.id} created`})
	}catch(error){
		console.log("error");
		console.log(error);
		res.status(400).json({ message: `Error: ${error}`})
	}
});
app.put("/products/:id", auth, async (req: CustomRequest, res) => {
	const body = req.body;
	const user = req.user;
	const id = req.params.id as string;

	const { name, price, isForSale } = body;
	try {
		if (!name) throw new Error("Name is required");
		if (!price) throw new Error("Price is required");
		if (!user?.email) throw new Error("Not logged in");

		const createdProduct = await prisma.product.update({
			where: {
				id
			},
            data: {
				name,
				price,
                isForSale: isForSale == true || isForSale == "true",
				sellerEmail: user.email,
			},
		});

		res.status(200).json({message: `Product with id ${createdProduct.id} updated`})
	}catch(error){
		console.log("error");
		console.log(error);
		res.status(400).json({ message: `Error: ${error}`})
	}
});
app.delete("/products/:id", auth, async (req: CustomRequest, res) => {
	const user = req.user;
	const id = req.params.id as string;

	try {
		if (!id) throw new Error("Id is required");
		if (!user?.email) throw new Error("Not logged in");
		
		await prisma.product.delete({
			where: {
				id
			}
		})

		res.status(200).json({message: `Successfully deleted product with id ${id}`})
	}catch(error){
		console.log("error");
		console.log(error);
		res.status(400).json({ message: `Error: ${error}`})
	}
});

// Orders
app.get("/orders", auth, async (req: CustomRequest, res) => {
    const user = req.user;
    const isSeller = req.query.isSeller === "true";
    try {
		if (!user?.email) throw new Error("Not logged in");

        const result = await prisma.order.findMany({
            where: {
                [isSeller ? "sellerEmail" : "buyerEmail"]: user.email
            }
        })
        res.status(200).json({products: result});
    } catch (err)
    {
        console.log("error");
        console.log(err);
        res.status(400).json({"message": `${err}`});
    }
});
app.post("/orders", auth, async (req: CustomRequest, res) => {
	const body = req.body;
	const user = req.user;

	const { productId, quantity } = body;
	try {
		if (!productId) throw new Error("Product ID is required");
		if (!quantity) throw new Error("Quantity is required");
		if (!user?.email) throw new Error("Not logged in");

        const existingProduct = await prisma.product.findFirst({
            where: {
                id: productId,
            }
        })
        if (!existingProduct) throw new Error(`Could not find a product with id ${productId}`);

		const createdOrder = await prisma.order.create({
			data: {
                productId,
                quantity,
                buyerEmail: user.email,
                sellerEmail: existingProduct.sellerEmail
			},
			select: {
				id : true
			}
		});

		res.status(200).json({message: `Order with id ${createdOrder.id} created`})
	}catch(error){
		console.log("error");
		console.log(error);
		res.status(400).json({ message: `Error: ${error}`})
	}
});