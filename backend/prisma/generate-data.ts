import { Prisma } from "@prisma/client";
import { faker } from "@faker-js/faker";

const generatedEmails: string[] = ["1@gmail.com"];
const generatedProductIDs: string[] = [];

export type UserData = Prisma.UserCreateInput;
export function generateUserData(): UserData {
    const email = faker.internet.email();
    const data = {
            email,
            password: faker.internet.password(),
            products: {
                create: generateProductsData(),
            },
            soldOrders: {
                create: generateSoldOrdersData(),
            },
            boughtOrders: {
                create: generateBoughtOrdersData(),
            }
        };
    generatedEmails.push(email);
    return data;
};

export type ProductData = Omit<Prisma.ProductCreateInput, "seller">;
export function generateProductData(): ProductData {
    const id = faker.database.mongodbObjectId();
    generatedProductIDs.push(id);
    return {
            id,
            name: faker.commerce.productName(),
            price: parseFloat(faker.commerce.price()),
            isForSale: faker.datatype.boolean(),
        };
};
export function generateProductsData(): ProductData[] {
    const productsData: ProductData[] = []
    const length = faker.number.int({min: 1, max: 5});
    for (let i = 0; i < length; i++) {
        const productData = generateProductData();
        productsData.push(productData);
    }

    return productsData;
};

export type SoldOrderData = Omit<Prisma.OrderCreateInput, "seller">;
export function generateSoldOrderData(): SoldOrderData {
    const otherEmail = generatedEmails[Math.floor(Math.random() * generatedEmails.length)];
    const productID = generatedProductIDs[Math.floor(Math.random() * generatedProductIDs.length)];
    return {
            quantity: faker.number.int({min: 1, max: 50}),
            product: {
                connect: {
                    id: productID,
                }
            },
            buyer: {
                connect: {
                    email: otherEmail,
                }
            },
        };
};
export function generateSoldOrdersData(): SoldOrderData[] {
    const ordersData: SoldOrderData[] = []
    const length = faker.number.int({min: 1, max: 5});
    for (let i = 0; i < length; i++) {
        const orderData = generateSoldOrderData();
        ordersData.push(orderData);
    }

    return ordersData;
};

export type BoughtOrderData = Omit<Prisma.OrderCreateInput, "buyer">;
export function generateBoughtOrderData(): BoughtOrderData {
    const otherEmail = generatedEmails[Math.floor(Math.random() * generatedEmails.length)];
    const productID = generatedProductIDs[Math.floor(Math.random() * generatedProductIDs.length)];
    return {
            quantity: faker.number.int({min: 1, max: 50}),
            product: {
                connect: {
                    id: productID,
                }
            },
            seller: {
                connect: {
                    email: otherEmail,
                }
            },
        };
};
export function generateBoughtOrdersData(): BoughtOrderData[] {
    const ordersData: BoughtOrderData[] = []
    const length = faker.number.int({min: 1, max: 5});
    for (let i = 0; i < length; i++) {
        const orderData = generateBoughtOrderData();
        ordersData.push(orderData);
    }

    return ordersData;
};