
export type User = {
  id: string,
  email: string,
}

export type Product = {
  id:        string,
  name:      string,
  price:     number,
  isForSale: boolean,
  sellerEmail: string,
}

export type Order = {
  id: string,
  productId: string,
  quantity:  number,
  buyerEmail: string,
  sellerEmail: string,
}