
import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterLink, CurrencyPipe],
  template: `
    <div class="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-extrabold text-slate-900 mb-10">Your Bag</h1>

      @if (cartItems().length > 0) {
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- Items List -->
          <div class="lg:col-span-2 space-y-8">
            @for (item of cartItems(); track item.id) {
              <div class="flex items-center bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <img [src]="item.image" class="w-24 h-24 object-cover rounded-xl" [alt]="item.name">
                <div class="ml-6 flex-1">
                  <div class="flex justify-between">
                    <h3 class="font-bold text-slate-900 text-lg">{{ item.name }}</h3>
                    <button (click)="removeItem(item.id)" class="text-slate-400 hover:text-red-500 transition">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <p class="text-slate-500 text-sm mb-4">{{ item.category }}</p>
                  <div class="flex justify-between items-center">
                    <div class="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                      <button (click)="updateQty(item.id, -1)" class="px-3 py-1 bg-slate-50 hover:bg-slate-100">-</button>
                      <span class="px-4 py-1 font-medium text-slate-700">{{ item.quantity }}</span>
                      <button (click)="updateQty(item.id, 1)" class="px-3 py-1 bg-slate-50 hover:bg-slate-100">+</button>
                    </div>
                    <span class="font-bold text-slate-900">{{ (item.price * item.quantity) | currency }}</span>
                  </div>
                </div>
              </div>
            }
          </div>

          <!-- Order Summary -->
          <div class="lg:col-span-1">
            <div class="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm sticky top-24">
              <h2 class="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>
              <div class="space-y-4 mb-6">
                <div class="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>{{ subtotal() | currency }}</span>
                </div>
                <div class="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span class="text-green-600 font-medium">FREE</span>
                </div>
                <div class="flex justify-between text-slate-600">
                  <span>Tax (EST)</span>
                  <span>{{ (subtotal() * 0.08) | currency }}</span>
                </div>
                <div class="pt-4 border-t border-slate-100 flex justify-between">
                  <span class="text-lg font-bold text-slate-900">Total</span>
                  <span class="text-lg font-bold text-indigo-600">{{ (subtotal() * 1.08) | currency }}</span>
                </div>
              </div>
              <a routerLink="/checkout" class="block w-full text-center bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100">
                Proceed to Checkout
              </a>
              <div class="mt-6 flex items-center justify-center space-x-2 text-xs text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                </svg>
                <span>Secure SSL Encrypted Checkout</span>
              </div>
            </div>
          </div>
        </div>
      } @else {
        <div class="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
          <div class="mb-6 flex justify-center">
            <div class="p-6 bg-slate-50 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
          </div>
          <h2 class="text-2xl font-bold text-slate-900 mb-2">Your bag is empty</h2>
          <p class="text-slate-500 mb-8">Looks like you haven't added anything yet.</p>
          <a routerLink="/shop" class="inline-block bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition">
            Start Shopping
          </a>
        </div>
      }
    </div>
  `
})
export class CartComponent {
  cartService = inject(CartService);
  cartItems = this.cartService.cartItems;
  subtotal = this.cartService.subtotal;

  updateQty(id: string, delta: number) {
    this.cartService.updateQuantity(id, delta);
  }

  removeItem(id: string) {
    this.cartService.removeFromCart(id);
  }
}
