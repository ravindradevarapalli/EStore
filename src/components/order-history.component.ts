
import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-history',
  imports: [CommonModule, CurrencyPipe, RouterLink],
  template: `
    <div class="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8 min-h-[70vh]">
      <div class="mb-10">
        <h1 class="text-4xl font-extrabold text-slate-900 tracking-tight">Order History</h1>
        <p class="text-slate-500 mt-2">Manage your past purchases and track current shipments.</p>
      </div>

      @if (orderService.hasOrders()) {
        <div class="space-y-6">
          @for (order of orderService.orders(); track order.id) {
            <div class="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden transition hover:shadow-md">
              <!-- Order Header -->
              <div class="bg-slate-50 px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-slate-100">
                <div class="flex gap-8">
                  <div>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Order Placed</p>
                    <p class="text-sm font-semibold text-slate-700">{{ order.date }}</p>
                  </div>
                  <div>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Amount</p>
                    <p class="text-sm font-semibold text-slate-900">{{ order.total | currency }}</p>
                  </div>
                  <div class="hidden sm:block">
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Order ID</p>
                    <p class="text-sm font-mono text-slate-500">#{{ order.id }}</p>
                  </div>
                </div>
                <div class="flex items-center">
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">
                    <span class="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-2"></span>
                    {{ order.status }}
                  </span>
                </div>
              </div>

              <!-- Order Items -->
              <div class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  @for (item of order.items; track item.id) {
                    <div class="flex items-center space-x-4">
                      <div class="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border border-slate-100">
                        <img [src]="item.image" class="h-full w-full object-cover" [alt]="item.name">
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-sm font-bold text-slate-900 truncate">{{ item.name }}</p>
                        <p class="text-xs text-slate-500">{{ item.quantity }} × {{ item.price | currency }}</p>
                      </div>
                      <a [routerLink]="['/product', item.id]" class="text-indigo-600 hover:text-indigo-800 p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </a>
                    </div>
                  }
                </div>
                
                <div class="mt-8 pt-6 border-t border-slate-50 flex justify-end space-x-4">
                  <button class="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-lg transition">View Invoice</button>
                  <button class="px-4 py-2 text-sm font-bold text-indigo-600 hover:bg-indigo-50 rounded-lg transition">Track Shipment</button>
                </div>
              </div>
            </div>
          }
        </div>
      } @else {
        <div class="bg-white rounded-3xl border-2 border-dashed border-slate-200 py-24 text-center px-4">
          <div class="inline-flex items-center justify-center w-20 h-20 bg-slate-50 rounded-full text-slate-300 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-slate-900 mb-2">No orders found</h2>
          <p class="text-slate-500 mb-8 max-w-sm mx-auto">You haven't placed any orders yet. Visit our shop to explore our latest tech collections.</p>
          <a routerLink="/shop" class="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100">
            Start Shopping
          </a>
        </div>
      }
    </div>
  `
})
export class OrderHistoryComponent {
  orderService = inject(OrderService);
}
