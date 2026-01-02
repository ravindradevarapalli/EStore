
import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ComparisonService {
  private compareItems = signal<Product[]>([]);
  private readonly MAX_ITEMS = 4;

  items = computed(() => this.compareItems());
  count = computed(() => this.compareItems().length);

  toggleComparison(product: Product) {
    this.compareItems.update(items => {
      const exists = items.some(i => i.id === product.id);
      if (exists) {
        return items.filter(i => i.id !== product.id);
      }
      if (items.length < this.MAX_ITEMS) {
        return [...items, product];
      }
      // If full, we could show a toast or ignore
      return items;
    });
  }

  isInComparison(productId: string): boolean {
    return this.compareItems().some(i => i.id === productId);
  }

  removeFromComparison(productId: string) {
    this.compareItems.update(items => items.filter(i => i.id !== productId));
  }

  clearComparison() {
    this.compareItems.set([]);
  }
}
