
import { Injectable, signal, computed } from '@angular/core';
import { Order } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private ordersSignal = signal<Order[]>([]);

  orders = computed(() => this.ordersSignal());
  hasOrders = computed(() => this.ordersSignal().length > 0);

  addOrder(order: Order) {
    this.ordersSignal.update(prev => [order, ...prev]);
  }

  getOrderById(id: string) {
    return this.ordersSignal().find(o => o.id === id);
  }
}
