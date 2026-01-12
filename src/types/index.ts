export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  isNew?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}
