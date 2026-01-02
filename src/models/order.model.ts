
import { CartItem } from './product.model';

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
  shippingAddress: string;
}
