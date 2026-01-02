
import { Component, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, CurrencyPipe, RouterLink],
  template: `
    <div class="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      @if (orderSuccess()) {
        <div class="text-center py-20 animate-in fade-in zoom-in duration-500">
          <div class="inline-flex items-center justify-center w-24 h-24 bg-green-100 text-green-600 rounded-full mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 class="text-4xl font-extrabold text-slate-900 mb-4">Payment Confirmed</h1>
          <p class="text-slate-500 text-xl mb-10">Order #LL-{{ orderNumber() }} has been placed successfully. Check your email for confirmation.</p>
          <div class="flex justify-center space-x-4">
            <a routerLink="/" class="bg-white border border-slate-200 text-slate-600 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition">
              Back to Home
            </a>
            <a routerLink="/orders" class="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition">
              View My Orders
            </a>
          </div>
        </div>
      } @else {
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <!-- Form -->
          <div class="space-y-8">
            <div>
              <h2 class="text-2xl font-bold text-slate-900 mb-6">Shipping Details</h2>
              <div class="grid grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" class="col-span-1 bg-white border border-slate-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500">
                <input type="text" placeholder="Last Name" class="col-span-1 bg-white border border-slate-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500">
                <input type="email" placeholder="Email Address" class="col-span-2 bg-white border border-slate-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500">
                <input type="text" placeholder="Street Address" class="col-span-2 bg-white border border-slate-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500">
              </div>
            </div>

            <div>
              <h2 class="text-2xl font-bold text-slate-900 mb-6">Payment Method</h2>
              
              <!-- Admin Restriction Notice -->
              @if (!authService.isAdmin()) {
                <div class="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start space-x-3 animate-in slide-in-from-top-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-amber-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <p class="text-sm font-bold text-amber-900">Privileged Action Required</p>
                    <p class="text-xs text-amber-700 leading-relaxed">
                      Placing orders is restricted to <strong>Administrator</strong> accounts. Please sign in with admin credentials to proceed.
                    </p>
                  </div>
                </div>
              }

              <div class="p-6 border-2 border-indigo-600 rounded-2xl bg-indigo-50 relative overflow-hidden">
                <div class="flex justify-between items-center mb-6">
                  <span class="font-bold text-indigo-900">Credit or Debit Card</span>
                  <div class="flex space-x-2">
                    <div class="w-8 h-5 bg-slate-300 rounded"></div>
                    <div class="w-8 h-5 bg-slate-300 rounded"></div>
                  </div>
                </div>
                <div class="space-y-4">
                  <div class="relative">
                    <input type="text" placeholder="Card Number" class="w-full bg-white border border-indigo-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute right-3 top-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div class="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="MM / YY" class="bg-white border border-indigo-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500">
                    <input type="text" placeholder="CVC" class="bg-white border border-indigo-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500">
                  </div>
                </div>
              </div>
            </div>

            <div class="space-y-4">
              <button 
                (click)="processPayment()"
                [disabled]="isProcessing() || !authService.isAdmin()"
                class="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-black transition flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                @if (isProcessing()) {
                  <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Authorizing...</span>
                } @else if (!authService.isAdmin()) {
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-400 group-hover:text-slate-300 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Admin Access Required</span>
                } @else {
                  <span>Pay {{ (cartService.subtotal() * 1.08) | currency }}</span>
                }
              </button>
              
              @if (!authService.isAdmin()) {
                <p class="text-center text-xs text-slate-400">
                  Login as <span class="font-bold">admin@luminaluxe.com</span> with <span class="font-bold">admin123</span> to enable this button.
                </p>
              }
            </div>
          </div>

          <!-- Order Summary Small -->
          <div class="bg-slate-50 p-8 rounded-3xl border border-slate-100 h-fit">
            <h3 class="text-lg font-bold text-slate-900 mb-6">Review Order</h3>
            <div class="space-y-4 mb-8">
              @for (item of cartItems(); track item.id) {
                <div class="flex justify-between items-center text-sm">
                  <div class="flex items-center space-x-3">
                    <span class="text-slate-500 font-medium">{{ item.quantity }}x</span>
                    <span class="text-slate-900 font-medium">{{ item.name }}</span>
                  </div>
                  <span class="text-slate-600">{{ (item.price * item.quantity) | currency }}</span>
                </div>
              }
            </div>
            <div class="space-y-3 pt-6 border-t border-slate-200">
              <div class="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span>{{ cartService.subtotal() | currency }}</span>
              </div>
              <div class="flex justify-between text-slate-500">
                <span>Estimated Tax</span>
                <span>{{ (cartService.subtotal() * 0.08) | currency }}</span>
              </div>
              <div class="flex justify-between text-lg font-bold text-slate-900 pt-3">
                <span>Total</span>
                <span>{{ (cartService.subtotal() * 1.08) | currency }}</span>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `
})
export class CheckoutComponent {
  cartService = inject(CartService);
  authService = inject(AuthService);
  orderService = inject(OrderService);
  router = inject(Router);
  
  cartItems = this.cartService.cartItems;
  isProcessing = signal(false);
  orderSuccess = signal(false);
  orderNumber = signal('');

  processPayment() {
    if (!this.authService.isAdmin()) return;
    
    this.isProcessing.set(true);
    // Simulate API delay
    setTimeout(() => {
      const generatedOrderNumber = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Save the order to OrderService
      this.orderService.addOrder({
        id: generatedOrderNumber,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        items: [...this.cartItems()],
        subtotal: this.cartService.subtotal(),
        tax: this.cartService.subtotal() * 0.08,
        total: this.cartService.subtotal() * 1.08,
        status: 'Processing',
        shippingAddress: '123 Tech Lane, Innovation City' // Mocked address
      });

      this.isProcessing.set(false);
      this.orderSuccess.set(true);
      this.orderNumber.set(generatedOrderNumber);
      this.cartService.clearCart();
    }, 2000);
  }
}
