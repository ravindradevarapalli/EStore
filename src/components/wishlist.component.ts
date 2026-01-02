
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../services/wishlist.service';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-wishlist',
  imports: [CommonModule, RouterLink, CurrencyPipe],
  template: `
    <div class="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center mb-10">
        <div>
          <h1 class="text-3xl font-extrabold text-slate-900">Your Wishlist</h1>
          <p class="text-slate-500 mt-1">Items you've saved for later.</p>
        </div>
        <a routerLink="/shop" class="text-indigo-600 font-bold hover:underline flex items-center transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Continue Shopping
        </a>
      </div>

      @if (isLoading()) {
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          @for (i of [1,2,3,4]; track i) {
            <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden animate-pulse">
              <div class="aspect-square bg-slate-100"></div>
              <div class="p-6 space-y-3">
                <div class="h-5 w-3/4 bg-slate-100 rounded"></div>
                <div class="h-3 w-1/3 bg-slate-100 rounded"></div>
                <div class="flex justify-between pt-4">
                  <div class="h-6 w-16 bg-slate-100 rounded"></div>
                  <div class="h-8 w-8 bg-slate-100 rounded-lg"></div>
                </div>
              </div>
            </div>
          }
        </div>
      } @else if (wishlistItems().length > 0) {
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          @for (product of wishlistItems(); track product.id) {
            <div class="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div class="relative aspect-square bg-slate-50">
                <img 
                  [src]="product.image" 
                  (load)="onImageLoad(product.id)"
                  class="w-full h-full object-cover opacity-0 transition-opacity duration-700"
                  [class.opacity-100]="loadedImages().has(product.id)"
                  loading="lazy"
                  [alt]="product.name">
                <button 
                  (click)="removeFromWishlist(product.id)"
                  class="absolute top-3 right-3 p-2 bg-white/90 rounded-full text-rose-500 shadow-sm hover:bg-rose-500 hover:text-white transition active:scale-90"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                <a [routerLink]="['/product', product.id]" class="absolute inset-0 z-0"></a>
              </div>
              <div class="p-6">
                <h3 class="font-bold text-slate-900 text-lg mb-1">{{ product.name }}</h3>
                <p class="text-indigo-600 text-xs font-bold uppercase tracking-widest mb-4">{{ product.category }}</p>
                <div class="flex justify-between items-center">
                  <span class="text-xl font-bold text-slate-900">{{ product.price | currency }}</span>
                  <button 
                    (click)="moveToCart(product)"
                    class="bg-indigo-600 text-white p-2.5 rounded-lg hover:bg-indigo-700 transition shadow-sm active:scale-95"
                    title="Move to Cart"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          }
        </div>
      } @else {
        <div class="text-center py-32 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <div class="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full text-slate-300 mb-6 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-slate-900 mb-2">Your wishlist is empty</h2>
          <p class="text-slate-500 mb-10 max-w-xs mx-auto">Explore our catalog and save your favorite tech for later.</p>
          <a routerLink="/shop" class="bg-indigo-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 active:scale-95">
            Discover Products
          </a>
        </div>
      }
    </div>
  `
})
export class WishlistComponent implements OnInit {
  wishlistService = inject(WishlistService);
  cartService = inject(CartService);
  
  wishlistItems = this.wishlistService.wishlistItems;
  isLoading = signal(true);
  loadedImages = signal<Set<string>>(new Set());

  ngOnInit() {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 600);
  }

  onImageLoad(id: string) {
    this.loadedImages.update(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }

  removeFromWishlist(id: string) {
    this.wishlistService.removeFromWishlist(id);
  }

  moveToCart(product: Product) {
    this.cartService.addToCart(product);
    this.wishlistService.removeFromWishlist(product.id);
  }
}
