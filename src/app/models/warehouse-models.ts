export interface Product {
  id?: string;
  name: string;
  articles: Article[];
}

export interface Article {
  name?: string;
  amountInStock?: number;
  id?: string;
  amountRequired?: number;
  amountToSubtract?: number;
}

export interface Sale {
  productId?: string;
  id?: string;
  amountSold: number;
}