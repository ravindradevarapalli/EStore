
import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import { WishlistService } from '../services/wishlist.service';
import { ComparisonService } from '../services/comparison.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-shop',
  imports: [CommonModule, RouterLink, CurrencyPipe],
  template: `
    <div class="bg-slate-50 min-h-screen pb-12">
      <!-- Page Header -->
      <div class="bg-white border-b border-slate-200">
        <div class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-extrabold text-slate-900">The Electronics Store Catalog</h1>
          <p class="mt-2 text-slate-600">Browse our full range of innovative products.</p>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- Sidebar Filters -->
          <aside class="w-full lg:w-64 space-y-8">
            <div>
              <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Search</h3>
              <div class="relative">
                <input 
                  type="text" 
                  (input)="onSearch($event)"
                  placeholder="Find something..." 
                  class="w-full bg-white border border-slate-200 rounded-lg py-2 pl-4 pr-10 focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute right-3 top-2.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <div>
              <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Categories</h3>
              <div class="space-y-2">
                @for (cat of categories; track cat) {
                  <label class="flex items-center space-x-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="category" 
                      (change)="onCategoryChange(cat)"
                      [checked]="selectedCategory() === cat"
                      class="h-4 w-4 text-indigo-600 border-slate-300 focus:ring-indigo-500"
                    >
                    <span class="text-slate-600 group-hover:text-indigo-600 transition">{{ cat }}</span>
                  </label>
                }
              </div>
            </div>
          </aside>

          <!-- Product Grid -->
          <div class="flex-1">
            <div class="flex justify-between items-center mb-6">
              <span class="text-slate-500 text-sm">Showing {{ filteredProducts().length }} results</span>
              <select class="bg-white border border-slate-200 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                <option>Sort by: Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 pb-24">
              @if (isLoading()) {
                @for (i of [1,2,3,4,5,6]; track i) {
                  <div class="bg-white rounded-xl border border-slate-200 overflow-hidden animate-pulse">
                    <div class="aspect-square bg-slate-100"></div>
                    <div class="p-5 space-y-3">
                      <div class="h-4 w-3/4 bg-slate-100 rounded"></div>
                      <div class="h-3 w-1/2 bg-slate-100 rounded"></div>
                    </div>
                  </div>
                }
              } @else {
                @for (product of filteredProducts(); track product.id) {
                  <div class="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all relative">
                    <!-- Actions Overlay -->
                    <div class="absolute top-4 right-4 z-20 flex flex-col space-y-2">
                      <button 
                        (click)="toggleWishlist(product)"
                        class="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm transition hover:scale-110 active:scale-95"
                        [class.text-rose-500]="isInWishlist(product.id)"
                        [class.text-slate-400]="!isInWishlist(product.id)"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" [attr.fill]="isInWishlist(product.id) ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                      <button 
                        (click)="toggleCompare(product)"
                        class="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm transition hover:scale-110 active:scale-95"
                        [class.text-indigo-600]="isInComparison(product.id)"
                        [class.text-slate-400]="!isInComparison(product.id)"
                        title="Compare Product"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </button>
                    </div>

                    <div class="relative aspect-square bg-slate-100">
                      <img 
                        [src]="product.image" 
                        (load)="onImageLoad(product.id)"
                        class="w-full h-full object-cover group-hover:scale-105 transition duration-700 opacity-0" 
                        [class.opacity-100]="loadedImages().has(product.id)"
                        loading="lazy"
                        [alt]="product.name">
                      <a [routerLink]="['/product', product.id]" class="absolute inset-0 z-10"></a>
                    </div>
                    <div class="p-5">
                      <h3 class="font-bold text-slate-900">{{ product.name }}</h3>
                      <p class="text-slate-500 text-sm mb-3">{{ product.category }}</p>
                      <div class="flex justify-between items-center">
                        <span class="text-lg font-bold text-indigo-600">{{ product.price | currency }}</span>
                        <div class="flex items-center text-yellow-400">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span class="ml-1 text-slate-500 text-xs font-medium">{{ product.rating }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                } @empty {
                  <div class="col-span-full py-20 text-center">
                    <p class="text-slate-500 text-lg">No products found matching your criteria.</p>
                    <button (click)="resetFilters()" class="mt-4 text-indigo-600 font-bold hover:underline">Clear all filters</button>
                  </div>
                }
              }
            </div>
          </div>
        </div>
      </div>

      <!-- Sticky Comparison Bar -->
      @if (compareCount() > 0) {
        <div class="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom duration-300">
          <div class="max-w-4xl mx-auto glass border border-white/50 rounded-2xl shadow-2xl p-4 flex items-center justify-between">
            <div class="flex items-center space-x-6 overflow-hidden">
              <div class="hidden sm:block">
                <span class="text-sm font-bold text-slate-900 block">Compare ({{ compareCount() }})</span>
                <span class="text-xs text-slate-500">Maximum 4 items</span>
              </div>
              <div class="flex -space-x-3">
                @for (item of compareItems(); track item.id) {
                  <div class="w-12 h-12 rounded-xl border-2 border-white overflow-hidden shadow-sm relative group">
                    <img [src]="item.image" class="w-full h-full object-cover">
                    <button 
                      (click)="toggleCompare(item)" 
                      class="absolute inset-0 bg-rose-500/80 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                }
              </div>
            </div>
            <div class="flex space-x-3">
              <button (click)="clearCompare()" class="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-700">Clear</button>
              <a routerLink="/compare" class="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
                Compare Now
              </a>
            </div>
          </div>
        </div>
      }
    </div>
  `
})
export class ShopComponent implements OnInit {
  productService = inject(ProductService);
  wishlistService = inject(WishlistService);
  comparisonService = inject(ComparisonService);
  
  categories = ['All', 'Audio', 'Wearables', 'Accessories', 'Tablets', 'Power', 'Computing', 'Photography', 'Mobile', 'Storage', 'Gaming', 'Smart Home'];
  selectedCategory = signal('All');
  searchQuery = signal('');
  isLoading = signal(true);
  loadedImages = signal<Set<string>>(new Set());

  compareCount = this.comparisonService.count;
  compareItems = this.comparisonService.items;

  ngOnInit() {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 1000);
  }

  filteredProducts = computed(() => {
    let prods = this.productService.products();
    if (this.selectedCategory() !== 'All') {
      prods = prods.filter(p => p.category === this.selectedCategory());
    }
    if (this.searchQuery()) {
      prods = prods.filter(p => p.name.toLowerCase().includes(this.searchQuery().toLowerCase()));
    }
    return prods;
  });

  onImageLoad(id: string) {
    this.loadedImages.update(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }

  onCategoryChange(cat: string) {
    this.selectedCategory.set(cat);
  }

  onSearch(event: any) {
    this.searchQuery.set(event.target.value);
  }

  resetFilters() {
    this.selectedCategory.set('All');
    this.searchQuery.set('');
  }

  toggleWishlist(product: Product) {
    this.wishlistService.toggleWishlist(product);
  }

  isInWishlist(productId: string): boolean {
    return this.wishlistService.isInWishlist(productId);
  }

  toggleCompare(product: Product) {
    this.comparisonService.toggleComparison(product);
  }

  isInComparison(productId: string): boolean {
    return this.comparisonService.isInComparison(productId);
  }

  clearCompare() {
    this.comparisonService.clearComparison();
  }
}
