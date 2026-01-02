
import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  wishlistItems = signal<Product[]>([]);

  totalWishlistItems = computed(() => this.wishlistItems().length);

  toggleWishlist(product: Product) {
    this.wishlistItems.update(items => {
      const exists = items.find(i => i.id === product.id);
      if (exists) {
        return items.filter(i => i.id !== product.id);
      }
      return [...items, product];
    });
  }

  isInWishlist(productId: string): boolean {
    return this.wishlistItems().some(i => i.id === productId);
  }

  removeFromWishlist(productId: string) {
    this.wishlistItems.update(items => items.filter(i => i.id !== productId));
  }
}
