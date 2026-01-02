
import '@angular/compiler';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, Routes } from '@angular/router';
import { AppComponent } from './src/app.component';
import { HomeComponent } from './src/components/home.component';
import { ShopComponent } from './src/components/shop.component';
import { ProductDetailComponent } from './src/components/product-detail.component';
import { CartComponent } from './src/components/cart.component';
import { CheckoutComponent } from './src/components/checkout.component';
import { WishlistComponent } from './src/components/wishlist.component';
import { JournalComponent } from './src/components/journal.component';
import { CompareComponent } from './src/components/compare.component';
import { OrderHistoryComponent } from './src/components/order-history.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'journal', component: JournalComponent },
  { path: 'compare', component: CompareComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'orders', component: OrderHistoryComponent },
  { path: '**', redirectTo: '' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes, withHashLocation())
  ]
}).catch(err => console.error(err));

// AI Studio always uses an `index.tsx` file for all project types.
