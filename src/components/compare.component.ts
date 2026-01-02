
import { Component, inject, computed } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ComparisonService } from '../services/comparison.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-compare',
  imports: [CommonModule, RouterLink, CurrencyPipe],
  template: `
    <div class="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
        <div>
          <h1 class="text-4xl font-extrabold text-slate-900 tracking-tight">Product Comparison</h1>
          <p class="text-slate-500 mt-2">Unbiased side-by-side analysis for your technical needs.</p>
        </div>
        <button (click)="clearAll()" class="text-indigo-600 font-bold hover:text-indigo-800 transition flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Clear Selection
        </button>
      </div>

      @if (items().length === 0) {
        <div class="text-center py-32 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <h2 class="text-2xl font-bold text-slate-900 mb-4">No products selected for comparison</h2>
          <p class="text-slate-500 mb-8">Go back to the shop to select items you'd like to analyze side-by-side.</p>
          <a routerLink="/shop" class="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100">
            Browse Catalog
          </a>
        </div>
      } @else {
        <div class="overflow-x-auto pb-8">
          <div class="min-w-[800px] grid" [style.grid-template-columns]="gridColumns()">
            <!-- Headers / Sidebar Labels -->
            <div class="space-y-4 pr-8 border-r border-slate-100">
              <div class="h-80 flex items-end pb-8">
                <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">General</span>
              </div>
              <div class="py-4 font-bold text-slate-900">Price</div>
              <div class="py-4 font-bold text-slate-900">Category</div>
              <div class="py-4 font-bold text-slate-900">User Rating</div>
              <div class="pt-8 pb-4">
                <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Specifications</span>
              </div>
              @for (key of allSpecKeys(); track key) {
                <div class="py-4 font-bold text-slate-900 border-t border-slate-50">{{ key }}</div>
              }
              <div class="py-12"></div>
            </div>

            <!-- Product Columns -->
            @for (product of items(); track product.id) {
              <div class="px-8 space-y-4 border-r border-slate-100 last:border-0 relative group">
                <button 
                  (click)="remove(product.id)" 
                  class="absolute top-0 right-4 p-1 rounded-full bg-slate-100 text-slate-400 opacity-0 group-hover:opacity-100 transition hover:bg-rose-100 hover:text-rose-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <!-- Product Card Area -->
                <div class="h-80">
                  <div class="aspect-square rounded-2xl bg-slate-50 mb-4 overflow-hidden border border-slate-100 shadow-sm">
                    <img [src]="product.image" class="w-full h-full object-cover" [alt]="product.name">
                  </div>
                  <h3 class="text-lg font-bold text-slate-900 leading-tight">{{ product.name }}</h3>
                </div>

                <!-- Basic Info -->
                <div class="py-4 text-indigo-600 font-bold text-xl">{{ product.price | currency }}</div>
                <div class="py-4 text-slate-600">{{ product.category }}</div>
                <div class="py-4 flex items-center text-yellow-400">
                  <span class="font-bold mr-1">{{ product.rating }}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>

                <div class="pt-8 pb-4 h-12"></div> <!-- Spacer -->

                <!-- Dynamic Specs -->
                @for (key of allSpecKeys(); track key) {
                  <div class="py-4 text-slate-600 border-t border-slate-50 h-14 overflow-hidden text-ellipsis whitespace-nowrap">
                    {{ product.specs?.[key] || '—' }}
                  </div>
                }

                <!-- CTA -->
                <div class="py-12">
                  <button 
                    (click)="addToCart(product)"
                    class="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 active:scale-95"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            }
          </div>
        </div>
      }
    </div>
  `
})
export class CompareComponent {
  comparisonService = inject(ComparisonService);
  cartService = inject(CartService);

  items = this.comparisonService.items;

  gridColumns = computed(() => {
    const itemCount = this.items().length;
    return `200px repeat(${itemCount}, minmax(0, 1fr))`;
  });

  allSpecKeys = computed(() => {
    const keys = new Set<string>();
    this.items().forEach(p => {
      if (p.specs) {
        Object.keys(p.specs).forEach(k => keys.add(k));
      }
    });
    return Array.from(keys);
  });

  remove(id: string) {
    this.comparisonService.removeFromComparison(id);
  }

  clearAll() {
    this.comparisonService.clearComparison();
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
}
