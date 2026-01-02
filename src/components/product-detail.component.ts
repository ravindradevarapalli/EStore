
import { Component, inject, signal, OnInit, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { AIService } from '../services/ai.service';
import { WishlistService } from '../services/wishlist.service';
import { ReviewService } from '../services/review.service';
import { Product } from '../models/product.model';
import { Review } from '../models/review.model';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, RouterLink, CurrencyPipe, DecimalPipe, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      @if (isLoading()) {
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 animate-pulse">
          <div class="aspect-square bg-slate-200 rounded-3xl shadow-inner"></div>
          <div class="space-y-6">
            <div class="h-4 w-32 bg-slate-200 rounded"></div>
            <div class="h-10 w-full bg-slate-200 rounded"></div>
            <div class="h-6 w-48 bg-slate-200 rounded"></div>
            <div class="h-32 w-full bg-slate-100 rounded-2xl"></div>
            <div class="flex gap-4">
              <div class="h-14 flex-1 bg-slate-200 rounded-xl"></div>
              <div class="h-14 flex-1 bg-slate-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      } @else if (product()) {
        @let p = product()!;
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <!-- Advanced Product Image Carousel with Progressive Loading -->
          <div class="space-y-6">
            <div class="group relative aspect-square bg-slate-200 rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              
              <!-- 1. Background Shimmer Layer -->
              <div class="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse"></div>

              <!-- 2. Synchronized Low-Res Placeholder Layer -->
              <img 
                [src]="placeholderImage()" 
                class="absolute inset-0 w-full h-full object-cover blur-2xl transition-opacity duration-700 pointer-events-none z-0"
                [class.opacity-100]="!mainImageLoaded()"
                [class.opacity-40]="mainImageLoaded()"
                alt="">
              
              <!-- 3. High-Res Progressive Image Layer -->
              <img 
                [src]="currentActiveImage()" 
                (load)="onMainImageLoad()"
                class="relative w-full h-full object-cover transition-all duration-1000 z-10" 
                [class.opacity-0]="!mainImageLoaded()"
                [class.opacity-100]="mainImageLoaded()"
                [class.scale-105]="!mainImageLoaded()"
                [class.scale-100]="mainImageLoaded()"
                loading="eager"
                fetchpriority="high"
                [alt]="p.name">

              <!-- Carousel Navigation Overlays with Enhanced Badges -->
              <div class="absolute top-6 left-6 z-30 flex flex-col space-y-2">
                <!-- Premium Hardware Badge -->
                <span class="w-fit bg-indigo-600/90 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg flex items-center space-x-1.5 backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Premium Hardware</span>
                </span>
                
                <!-- Free Shipping Badge -->
                <span class="w-fit bg-emerald-500/90 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg flex items-center space-x-1.5 backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1-1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                  </svg>
                  <span>Free Shipping</span>
                </span>
              </div>

              @if (p.images && p.images.length > 1) {
                <button 
                  (click)="prevImage()"
                  class="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 backdrop-blur-md shadow-lg text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white active:scale-95 z-20"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  (click)="nextImage()"
                  class="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 backdrop-blur-md shadow-lg text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white active:scale-95 z-20"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              }
            </div>

            <!-- Thumbnail Navigation Strip -->
            @if (p.images && p.images.length > 1) {
              <div class="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
                @for (img of p.images; track $index) {
                  <button 
                    (click)="setImage($index)"
                    class="relative w-24 aspect-square rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all duration-300 bg-slate-100"
                    [class]="activeImageIndex() === $index ? 'border-indigo-600 ring-2 ring-indigo-200' : 'border-slate-100 hover:border-indigo-200'"
                  >
                    <img [src]="img" class="w-full h-full object-cover" alt="Product view">
                    @if (activeImageIndex() !== $index) {
                      <div class="absolute inset-0 bg-white/40 group-hover:bg-transparent transition-colors"></div>
                    }
                  </button>
                }
              </div>
            }
          </div>

          <!-- Product Info -->
          <div class="fade-in-up">
            <nav class="mb-4">
              <ol class="flex text-sm text-slate-500 space-x-2">
                <li><a routerLink="/" class="hover:text-indigo-600 transition">Home</a></li>
                <li>/</li>
                <li><a routerLink="/shop" class="hover:text-indigo-600 transition">Shop</a></li>
                <li>/</li>
                <li class="text-indigo-600 font-medium">{{ p.name }}</li>
              </ol>
            </nav>

            <h1 class="text-4xl font-bold text-slate-900 mb-2">{{ p.name }}</h1>
            
            <div class="flex flex-wrap items-center gap-4 mb-6">
              <span class="text-2xl font-bold text-indigo-600">{{ p.price | currency }}</span>
              <div class="h-6 w-px bg-slate-200 hidden sm:block"></div>
              
              <div class="flex items-center">
                <span class="text-yellow-400 font-bold">★ {{ averageRating() | number:'1.1-1' }}</span>
                <span class="ml-2 text-slate-400 text-sm">({{ productReviews().length }} Reviews)</span>
              </div>

              <div class="h-6 w-px bg-slate-200 hidden sm:block"></div>

              <!-- Stock Status Badge (New Section) -->
              <div class="flex items-center">
                @let status = stockStatus();
                <span [class]="'flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ' + status.bgClass + ' ' + status.textClass">
                  <span [class]="'w-1.5 h-1.5 rounded-full ' + status.dotClass + (status.isLow ? ' animate-pulse' : '')"></span>
                  <span>{{ status.label }}</span>
                </span>
              </div>
            </div>

            <p class="text-slate-600 text-lg mb-8 leading-relaxed">
              {{ p.description }}
            </p>

            <!-- AI Insight Section -->
            <div class="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 mb-8 relative overflow-hidden">
              <div class="absolute -right-4 -top-4 opacity-5 rotate-12">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div class="flex items-center mb-4">
                <span class="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm mr-2">AI ASSIST</span>
                <h4 class="text-indigo-900 font-bold uppercase tracking-tight">Lumina Insights</h4>
              </div>
              @if (aiInsight()) {
                <p class="text-indigo-800 italic leading-snug whitespace-pre-wrap">{{ aiInsight() }}</p>
              } @else {
                <div class="flex items-center space-x-2 animate-pulse">
                  <div class="h-4 w-4 bg-indigo-200 rounded-full"></div>
                  <p class="text-indigo-300">Generating premium insight...</p>
                </div>
              }
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col gap-4 mb-10">
              <button 
                (click)="toggleWishlist()"
                [class]="isInWishlist() 
                  ? 'w-full px-8 py-4 border-rose-200 bg-rose-50 text-rose-600 rounded-xl font-bold transition flex items-center justify-center space-x-2 active:scale-95'
                  : 'w-full px-8 py-4 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition flex items-center justify-center space-x-2 active:scale-95'"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" [attr.fill]="isInWishlist() ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{{ isInWishlist() ? 'Saved to Wishlist' : 'Add to Wishlist' }}</span>
              </button>

              <div class="flex gap-4">
                <div class="flex items-center bg-slate-100 rounded-2xl p-1 px-2 border border-slate-200">
                  <button 
                    (click)="updateSelectedQuantity(-1)"
                    [disabled]="selectedQuantity() <= 1 || p.stock === 0"
                    class="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm transition disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                    </svg>
                  </button>
                  <span class="w-12 text-center font-bold text-slate-800">{{ selectedQuantity() }}</span>
                  <button 
                    (click)="updateSelectedQuantity(1)"
                    [disabled]="(p.stock && selectedQuantity() >= p.stock) || p.stock === 0"
                    class="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm transition disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>

                <button 
                  (click)="addToCart()"
                  [disabled]="addedToCart() || p.stock === 0"
                  [class]="addedToCart() 
                    ? 'flex-1 bg-emerald-500 text-white py-4 px-8 rounded-xl font-bold text-lg transition flex items-center justify-center space-x-2'
                    : (p.stock === 0 
                      ? 'flex-1 bg-slate-200 text-slate-400 py-4 px-8 rounded-xl font-bold text-lg cursor-not-allowed flex items-center justify-center space-x-2'
                      : 'flex-1 bg-indigo-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 active:scale-95 flex items-center justify-center space-x-2')"
                >
                  @if (addedToCart()) {
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Added!</span>
                  } @else if (p.stock === 0) {
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                    <span>Out of Stock</span>
                  } @else {
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span>Add to Cart</span>
                  }
                </button>
              </div>
            </div>

            <!-- Social Sharing Section -->
            <div class="mt-8 pt-8 border-t border-slate-100">
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Share this masterpiece</p>
              <div class="flex space-x-3">
                <button 
                  (click)="shareOnFacebook()"
                  class="group p-3 rounded-full bg-slate-100 text-slate-600 hover:bg-[#1877F2] hover:text-white transition-all duration-300 transform hover:scale-110 active:scale-95"
                  aria-label="Share on Facebook"
                >
                  <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                <button 
                  (click)="shareOnTwitter()"
                  class="group p-3 rounded-full bg-slate-100 text-slate-600 hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-110 active:scale-95"
                  aria-label="Share on X"
                >
                  <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.25 2.25h6.663l4.715 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </button>
                <button 
                  (click)="shareOnLinkedIn()"
                  class="group p-3 rounded-full bg-slate-100 text-slate-600 hover:bg-[#0077B5] hover:text-white transition-all duration-300 transform hover:scale-110 active:scale-95"
                  aria-label="Share on LinkedIn"
                >
                  <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.852-1.852 0-2.135 1.445-2.135 2.544v6.877H9.352V9h3.413v1.561h.046c.475-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Information Accordion -->
            <div class="mt-10 border-t border-slate-200 pt-6 space-y-1">
              <div class="border-b border-slate-100">
                <button (click)="toggleAccordion('delivery')" class="w-full flex justify-between items-center py-4 text-left group transition-all">
                  <div class="flex items-center space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1-1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>
                    <span class="font-bold text-slate-900 group-hover:text-indigo-600">Free Delivery</span>
                  </div>
                  <svg [class.rotate-180]="activeAccordion() === 'delivery'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-400 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                </button>
                @if (activeAccordion() === 'delivery') {
                  <div class="pb-4 text-sm text-slate-600 leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
                    Complimentary express shipping on all orders. Items typically arrive within 2-3 business days.
                  </div>
                }
              </div>
            </div>
          </div>
        </div>

        <!-- Recently Viewed Section -->
        @if (recentlyViewedProducts().length > 0) {
          <div class="border-t border-slate-200 pt-16 mb-24">
            <h2 class="text-3xl font-bold text-slate-900 mb-8 tracking-tight">Recently Viewed</h2>
            <div class="relative">
              <div class="flex overflow-x-auto pb-8 space-x-6 scrollbar-hide snap-x">
                @for (rvp of recentlyViewedProducts(); track rvp.id) {
                  <div class="flex-none w-72 snap-start">
                    <a [routerLink]="['/product', rvp.id]" class="group block bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
                      <div class="aspect-square bg-slate-50 overflow-hidden relative">
                        <img [src]="rvp.image" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" [alt]="rvp.name">
                        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
                      </div>
                      <div class="p-6">
                        <p class="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-2">{{ rvp.category }}</p>
                        <h4 class="font-bold text-slate-900 truncate mb-2">{{ rvp.name }}</h4>
                        <p class="text-indigo-600 font-bold text-lg">{{ rvp.price | currency }}</p>
                      </div>
                    </a>
                  </div>
                }
              </div>
              <!-- Visual Gradient Fades for Scroll -->
              <div class="absolute left-0 top-0 bottom-8 w-12 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none opacity-50"></div>
              <div class="absolute right-0 top-0 bottom-8 w-12 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none opacity-50"></div>
            </div>
          </div>
        }

        <!-- Product Reviews Section -->
        <div class="border-t border-slate-200 pt-16">
          <div class="flex flex-col md:flex-row justify-between items-start mb-12 gap-8">
            <div class="md:w-1/3">
              <h2 class="text-3xl font-bold text-slate-900 mb-4">Customer Experiences</h2>
              <div class="flex items-baseline space-x-4">
                <span class="text-6xl font-extrabold text-indigo-600">{{ averageRating() | number:'1.1-1' }}</span>
                <div class="flex flex-col">
                  <div class="flex text-yellow-400">
                    @for (star of [1,2,3,4,5]; track star) {
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" [attr.fill]="star <= averageRating() ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    }
                  </div>
                  <span class="text-slate-500 text-sm mt-1">Based on {{ productReviews().length }} verified reviews</span>
                </div>
              </div>
              
              <button 
                (click)="showReviewForm.set(!showReviewForm())"
                class="mt-8 w-full py-3 px-6 border-2 border-indigo-600 text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition"
              >
                {{ showReviewForm() ? 'Cancel Review' : 'Write a Review' }}
              </button>
            </div>

            <!-- Review Form -->
            @if (showReviewForm()) {
              <div class="flex-1 w-full bg-white p-8 rounded-3xl border border-indigo-100 shadow-xl shadow-indigo-50/50 animate-in fade-in slide-in-from-right-4 duration-500">
                <h3 class="text-xl font-bold text-slate-900 mb-6">Share Your Experience</h3>
                <form (submit)="submitReview($event)" class="space-y-6">
                  <div>
                    <label class="block text-sm font-bold text-slate-700 mb-2">Rating</label>
                    <div class="flex space-x-2">
                      @for (star of [1,2,3,4,5]; track star) {
                        <button 
                          type="button"
                          (click)="newReviewRating.set(star)"
                          [class]="star <= newReviewRating() ? 'text-yellow-400' : 'text-slate-200'"
                          class="hover:scale-110 transition transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                          </svg>
                        </button>
                      }
                    </div>
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-bold text-slate-700 mb-2">Your Name</label>
                      <input 
                        [(ngModel)]="newReviewName" 
                        name="userName" 
                        type="text" 
                        required
                        placeholder="John Doe" 
                        class="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-bold text-slate-700 mb-2">Your Thoughts</label>
                    <textarea 
                      [(ngModel)]="newReviewComment" 
                      name="comment" 
                      required
                      rows="4" 
                      placeholder="What did you love about this product?" 
                      class="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    class="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100"
                  >
                    Post Review
                  </button>
                </form>
              </div>
            }

            <!-- Review List -->
            <div class="flex-[2] space-y-8">
              @for (review of productReviews(); track review.id) {
                <div class="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm transition-hover hover:shadow-md">
                  <div class="flex justify-between items-start mb-4">
                    <div class="flex items-center space-x-4">
                      <div class="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-indigo-600">
                        {{ review.userName[0] }}
                      </div>
                      <div>
                        <h4 class="font-bold text-slate-900">{{ review.userName }}</h4>
                        <div class="flex text-yellow-400">
                          @for (s of [1,2,3,4,5]; track s) {
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" [attr.fill]="s <= review.rating ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          }
                        </div>
                      </div>
                    </div>
                    <span class="text-slate-400 text-xs">{{ review.date }}</span>
                  </div>
                  <p class="text-slate-600 italic leading-relaxed">
                    "{{ review.comment }}"
                  </p>
                </div>
              } @empty {
                <div class="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                  <p class="text-slate-500">No reviews yet. Be the first to share your experience!</p>
                </div>
              }
            </div>
          </div>
        </div>
      } @else {
        <div class="text-center py-20">
          <h2 class="text-2xl font-bold text-slate-900">Product Not Found</h2>
          <a routerLink="/shop" class="mt-4 text-indigo-600 font-bold hover:underline">Return to Shop</a>
        </div>
      }
    </div>

    <style>
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .fade-in-up {
        animation: fadeInUp 0.8s ease-out forwards;
      }
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    </style>
  `
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private aiService = inject(AIService);
  private wishlistService = inject(WishlistService);
  private reviewService = inject(ReviewService);

  private readonly RECENTLY_VIEWED_KEY = 'lumina_recently_viewed';

  product = signal<Product | undefined>(undefined);
  recentlyViewedProducts = signal<Product[]>([]);
  aiInsight = signal<string>('');
  isLoading = signal(true);
  mainImageLoaded = signal(false);
  activeAccordion = signal<string | null>(null);
  showReviewForm = signal(false);
  addedToCart = signal(false);
  selectedQuantity = signal(1);

  // Carousel State
  activeImageIndex = signal(0);

  // New Review Form Signals
  newReviewName = signal('');
  newReviewComment = signal('');
  newReviewRating = signal(5);

  productReviews = computed(() => {
    const p = this.product();
    return p ? this.reviewService.getReviewsByProductId(p.id)() : [];
  });

  averageRating = computed(() => {
    const reviews = this.productReviews();
    if (reviews.length === 0) return 5;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return sum / reviews.length;
  });

  isInWishlist = computed(() => {
    const p = this.product();
    return p ? this.wishlistService.isInWishlist(p.id) : false;
  });

  currentActiveImage = computed(() => {
    const p = this.product();
    if (!p) return '';
    const images = p.images || [p.image];
    return images[this.activeImageIndex()];
  });

  // Derived stock status information
  stockStatus = computed(() => {
    const p = this.product();
    if (!p) return { label: 'Unknown', bgClass: 'bg-slate-100', textClass: 'text-slate-500', dotClass: 'bg-slate-400', isLow: false };
    
    if (p.stock === 0) {
      return { 
        label: 'Out of Stock', 
        bgClass: 'bg-rose-50', 
        textClass: 'text-rose-600', 
        dotClass: 'bg-rose-500',
        isLow: false 
      };
    }
    
    if (p.stock <= 10) {
      return { 
        label: `Low Stock: Only ${p.stock} left`, 
        bgClass: 'bg-amber-50', 
        textClass: 'text-amber-700', 
        dotClass: 'bg-amber-500',
        isLow: true 
      };
    }
    
    return { 
      label: 'In Stock', 
      bgClass: 'bg-emerald-50', 
      textClass: 'text-emerald-700', 
      dotClass: 'bg-emerald-500',
      isLow: false 
    };
  });

  // Advanced: Derives a matching low-res placeholder from the currently active image URL
  placeholderImage = computed(() => {
    const url = this.currentActiveImage();
    if (!url) return '';
    // Transforms '.../800/800' or '.../600/600' into a matching '.../20/20' for the blurry preview
    return url
      .replace('800/800', '20/20')
      .replace('600/600', '20/20')
      .replace('1200/800', '20/20');
  });

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadProduct(id);
      }
    });
  }

  loadProduct(id: string) {
    this.isLoading.set(true);
    const p = this.productService.getProductById(id);
    this.product.set(p);
    this.activeImageIndex.set(0);
    this.mainImageLoaded.set(false);

    if (p) {
      this.updateRecentlyViewed(p.id);
      setTimeout(() => {
        this.isLoading.set(false);
        this.fetchAIInsight(p);
      }, 600);
    } else {
      this.isLoading.set(false);
    }
  }

  private updateRecentlyViewed(productId: string) {
    try {
      const existing = localStorage.getItem(this.RECENTLY_VIEWED_KEY);
      let list: string[] = existing ? JSON.parse(existing) : [];
      
      // Remove if exists and add to front (most recent)
      list = list.filter(id => id !== productId);
      list.unshift(productId);
      
      // Limit to last 10 viewed
      list = list.slice(0, 10);
      
      localStorage.setItem(this.RECENTLY_VIEWED_KEY, JSON.stringify(list));
      this.loadRecentlyViewed(productId);
    } catch (e) {
      console.error('Recently viewed storage error', e);
    }
  }

  private loadRecentlyViewed(currentId: string) {
    try {
      const existing = localStorage.getItem(this.RECENTLY_VIEWED_KEY);
      if (existing) {
        const list: string[] = JSON.parse(existing);
        const products = list
          .filter(id => id !== currentId) // Exclude current product
          .map(id => this.productService.getProductById(id))
          .filter((p): p is Product => !!p);
        this.recentlyViewedProducts.set(products);
      }
    } catch (e) {
      this.recentlyViewedProducts.set([]);
    }
  }

  async fetchAIInsight(p: Product) {
    const insight = await this.aiService.getProductReviewInsight(p);
    this.aiInsight.set(insight);
  }

  onMainImageLoad() {
    this.mainImageLoaded.set(true);
  }

  // Carousel Controls
  nextImage() {
    const p = this.product();
    if (!p || !p.images) return;
    this.mainImageLoaded.set(false);
    this.activeImageIndex.update(idx => (idx + 1) % p.images!.length);
  }

  prevImage() {
    const p = this.product();
    if (!p || !p.images) return;
    this.mainImageLoaded.set(false);
    this.activeImageIndex.update(idx => (idx - 1 + p.images!.length) % p.images!.length);
  }

  setImage(index: number) {
    if (this.activeImageIndex() === index) return;
    this.mainImageLoaded.set(false);
    this.activeImageIndex.set(index);
  }

  updateSelectedQuantity(delta: number) {
    const p = this.product();
    if (!p) return;
    this.selectedQuantity.update(q => {
      const next = q + delta;
      return Math.min(Math.max(1, next), p.stock || 99);
    });
  }

  addToCart() {
    const p = this.product();
    if (p && p.stock > 0) {
      this.cartService.addToCart(p, this.selectedQuantity());
      this.addedToCart.set(true);
      setTimeout(() => this.addedToCart.set(false), 2000);
    }
  }

  toggleWishlist() {
    const p = this.product();
    if (p) this.wishlistService.toggleWishlist(p);
  }

  toggleAccordion(section: string) {
    this.activeAccordion.update(current => current === section ? null : section);
  }

  submitReview(event: Event) {
    event.preventDefault();
    const p = this.product();
    if (!p || !this.newReviewName() || !this.newReviewComment()) return;

    this.reviewService.addReview({
      productId: p.id,
      userName: this.newReviewName(),
      rating: this.newReviewRating(),
      comment: this.newReviewComment()
    });

    this.newReviewName.set('');
    this.newReviewComment.set('');
    this.newReviewRating.set(5);
    this.showReviewForm.set(false);
  }

  // Social Sharing Logic
  shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'noopener,noreferrer');
  }

  shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const p = this.product();
    const text = encodeURIComponent(`Discover the ${p?.name} at Electronics Store. Defining the future of premium tech.`);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'noopener,noreferrer');
  }

  shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'noopener,noreferrer');
  }
}
