
import { Injectable, signal, computed } from '@angular/core';
import { Product, CartItem } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  cartItems = signal<CartItem[]>([]);

  totalItems = computed(() => 
    this.cartItems().reduce((acc, item) => acc + item.quantity, 0)
  );

  subtotal = computed(() => 
    this.cartItems().reduce((acc, item) => acc + (item.price * item.quantity), 0)
  );

  addToCart(product: Product, quantity: number = 1) {
    this.cartItems.update(items => {
      const existing = items.find(i => i.id === product.id);
      if (existing) {
        return items.map(i => i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...items, { ...product, quantity }];
    });
  }

  removeFromCart(productId: string) {
    this.cartItems.update(items => items.filter(i => i.id !== productId));
  }

  updateQuantity(productId: string, delta: number) {
    this.cartItems.update(items => {
      return items.map(i => {
        if (i.id === productId) {
          const newQty = Math.max(1, i.quantity + delta);
          return { ...i, quantity: newQty };
        }
        return i;
      });
    });
  }

  clearCart() {
    this.cartItems.set([]);
  }
}
