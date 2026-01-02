
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from './services/cart.service';
import { WishlistService } from './services/wishlist.service';
import { AuthService } from './services/auth.service';
import { AuthModalComponent } from './components/auth-modal.component';
import { ScrollToTopComponent } from './components/scroll-to-top.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule, AuthModalComponent, ScrollToTopComponent],
  template: `
    <nav class="sticky top-0 z-50 glass border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <a routerLink="/" class="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              ELECTRONICS STORE
            </a>
            <div class="hidden md:ml-10 md:flex space-x-8">
              <a routerLink="/shop" class="text-slate-600 hover:text-indigo-600 font-medium transition">Shop</a>
              <a routerLink="/journal" class="text-slate-600 hover:text-indigo-600 font-medium transition">Journal</a>
            </div>
          </div>
          <div class="flex items-center space-x-6">
            <a routerLink="/wishlist" class="relative text-slate-600 hover:text-rose-500 transition">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              @if (wishlistCount() > 0) {
                <span class="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {{ wishlistCount() }}
                </span>
              }
            </a>
            <a routerLink="/cart" class="relative text-slate-600 hover:text-indigo-600 transition">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              @if (cartCount() > 0) {
                <span class="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {{ cartCount() }}
                </span>
              }
            </a>
            
            <div class="h-6 w-px bg-slate-200 hidden sm:block"></div>

            @if (authService.isAuthenticated()) {
              <div class="relative group">
                <button class="flex items-center space-x-2 focus:outline-none">
                  <div class="h-9 w-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm ring-2 ring-indigo-50 transition group-hover:ring-indigo-200">
                    {{ authService.userInitials() }}
                  </div>
                  <span class="hidden lg:block text-slate-700 font-medium text-sm">{{ authService.currentUser()?.name }}</span>
                </button>
                
                <div class="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right scale-95 group-hover:scale-100">
                  <div class="px-4 py-2 border-b border-slate-50 mb-1">
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Account</p>
                    <p class="text-xs text-slate-600 truncate">{{ authService.currentUser()?.email }}</p>
                  </div>
                  <a href="#" class="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition">Profile Settings</a>
                  <a routerLink="/orders" class="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition">Order History</a>
                  <button 
                    (click)="authService.signOut()"
                    class="w-full text-left px-4 py-2 text-sm text-rose-500 hover:bg-rose-50 transition"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            } @else {
              <button 
                (click)="showAuthModal.set(true)"
                class="bg-indigo-600 text-white px-5 py-2 rounded-full font-medium hover:bg-indigo-700 transition shadow-sm active:scale-95"
              >
                Sign In
              </button>
            }
          </div>
        </div>
      </div>
    </nav>

    <main class="min-h-screen">
      <router-outlet></router-outlet>
    </main>

    <app-scroll-to-top />

    @if (showAuthModal()) {
      <app-auth-modal (close)="showAuthModal.set(false)" />
    }

    <footer class="bg-slate-900 text-slate-300 py-12 mt-auto">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <p class="text-xl font-semibold text-white mb-4">ELECTRONICS STORE</p>
        <p class="max-w-md mx-auto mb-8 text-slate-400">Defining the future of retail through innovation and curated excellence.</p>
        <div class="flex justify-center space-x-6 mb-8">
          <a href="#" class="hover:text-white transition">Instagram</a>
          <a href="#" class="hover:text-white transition">Twitter</a>
          <a href="#" class="hover:text-white transition">LinkedIn</a>
        </div>
        <p class="text-sm opacity-50">&copy; 2025 Electronics Store. All rights reserved.</p>
      </div>
    </footer>
  `
})
export class AppComponent {
  cartService = inject(CartService);
  wishlistService = inject(WishlistService);
  authService = inject(AuthService);

  cartCount = this.cartService.totalItems;
  wishlistCount = this.wishlistService.totalWishlistItems;
  
  showAuthModal = signal(false);
}
