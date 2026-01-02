
import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule, CurrencyPipe],
  template: `
    <!-- Hero Section -->
    <div class="relative bg-slate-900 overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div class="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div class="sm:text-center lg:text-left">
              <h1 class="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span class="block">Elevate Your</span>
                <span class="block text-indigo-500">Digital Lifestyle</span>
              </h1>
              <p class="mt-3 text-base text-slate-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Discover our curated collection of high-performance tech and lifestyle essentials designed for the modern innovator.
              </p>
              <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div class="rounded-md shadow">
                  <a routerLink="/shop" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                    Explore Shop
                  </a>
                </div>
                <div class="mt-3 sm:mt-0 sm:ml-3">
                  <a href="#" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
                    Our Story
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full transition-opacity duration-1000" 
             src="https://picsum.photos/id/119/1200/800" 
             loading="eager"
             alt="Hero background">
      </div>
    </div>

    <!-- Featured Section -->
    <div class="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div class="flex justify-between items-end mb-12">
        <div>
          <h2 class="text-3xl font-bold text-slate-900">Featured Curations</h2>
          <p class="mt-2 text-slate-600">Hand-picked by our experts for uncompromising quality.</p>
        </div>
        <a routerLink="/shop" class="text-indigo-600 font-semibold hover:text-indigo-800 flex items-center transition-colors">
          View All Products
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </a>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        @if (isLoading()) {
          @for (i of [1,2,3]; track i) {
            <div class="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm animate-pulse">
              <div class="aspect-square bg-slate-200"></div>
              <div class="p-6 space-y-4">
                <div class="h-3 w-20 bg-slate-200 rounded"></div>
                <div class="h-5 w-48 bg-slate-200 rounded"></div>
                <div class="space-y-2">
                  <div class="h-3 w-full bg-slate-200 rounded"></div>
                  <div class="h-3 w-2/3 bg-slate-200 rounded"></div>
                </div>
                <div class="flex justify-between pt-4">
                  <div class="h-6 w-16 bg-slate-200 rounded"></div>
                  <div class="h-6 w-6 bg-slate-200 rounded-full"></div>
                </div>
              </div>
            </div>
          }
        } @else {
          @for (product of featured(); track product.id) {
            <div class="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div class="relative overflow-hidden aspect-square bg-slate-100">
                <img 
                  [src]="product.image" 
                  (load)="onImageLoad(product.id)"
                  class="w-full h-full object-cover group-hover:scale-105 transition duration-700 opacity-0"
                  [class.opacity-100]="loadedImages().has(product.id)"
                  loading="lazy"
                  [alt]="product.name">
                <div class="absolute top-4 left-4">
                  <span class="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">New Arrival</span>
                </div>
              </div>
              <div class="p-6">
                <p class="text-indigo-600 text-xs font-bold uppercase tracking-wider mb-2">{{ product.category }}</p>
                <h3 class="text-lg font-bold text-slate-900 mb-2">{{ product.name }}</h3>
                <p class="text-slate-500 text-sm mb-4 line-clamp-2">{{ product.description }}</p>
                <div class="flex justify-between items-center">
                  <span class="text-xl font-bold text-indigo-600">{{ product.price | currency }}</span>
                  <a [routerLink]="['/product', product.id]" class="text-slate-400 hover:text-indigo-600 transition transform hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          }
        }
      </div>
    </div>
  `
})
export class HomeComponent implements OnInit {
  productService = inject(ProductService);
  featured = signal<Product[]>([]);
  isLoading = signal(true);
  loadedImages = signal<Set<string>>(new Set());

  ngOnInit() {
    // Simulate loading products
    setTimeout(() => {
      this.featured.set(this.productService.getFeaturedProducts());
      this.isLoading.set(false);
    }, 800);
  }

  onImageLoad(id: string) {
    this.loadedImages.update(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }
}
