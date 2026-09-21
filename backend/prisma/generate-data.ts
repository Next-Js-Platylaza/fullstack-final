import { Prisma } from "@prisma/client";
import { faker } from "@faker-js/faker";

export type UserData = Prisma.UserCreateInput;
export function generateUserData(): UserData {
    return {
            email: faker.internet.email(),
            password: faker.internet.password(),
            products: {
                create: generateProductsData(),
            },
            soldOrders: {
                create: generateOrdersData(),
            },
            boughtOrders: {
                create: generateOrdersData(),
            }
        };
};

export type ProductData = Omit<Prisma.ProductCreateInput, "seller">;
export function generateProductData(): ProductData {
    return {
            name: faker.commerce.productName(),
            price: parseFloat(faker.commerce.price()),
            isForSale: faker.datatype.boolean(),
            /*seller: {
                connect: {
                    email: faker.internet.email(),
                }
            }*/
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

export type OrderData = Prisma.OrderCreateInput //Omit<Prisma.OrderCreateInput, "product" | "buyer" | "seller">;
export function generateOrderData(): OrderData {
    return {
            quantity: faker.number.int({min: 1, max: 50}),
            product: {
                connect: {
                    id: faker.number.int({min: 1, max: 5}).toString(),
                }
            },
            buyer: {
                connect: {
                    email: faker.internet.email(),
                }
            },
            seller: {
                connect: {
                    email: faker.internet.email(),
                }
            }
        };
};
export function generateOrdersData(): OrderData[] {
    const ordersData: OrderData[] = []
    const length = faker.number.int({min: 1, max: 5});
    for (let i = 0; i < length; i++) {
        const orderData = generateOrderData();
        ordersData.push(orderData);
    }

    return ordersData;
};