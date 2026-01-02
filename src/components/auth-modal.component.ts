
import { Component, output, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth-modal',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        (click)="$event.stopPropagation()"
        class="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300"
      >
        <!-- Close Button -->
        <button (click)="close.emit()" class="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition p-2 hover:bg-slate-50 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="p-8 sm:p-12">
          <div class="text-center mb-10">
            <h2 class="text-3xl font-extrabold text-slate-900 tracking-tight">
              {{ isSignIn() ? 'Welcome Back' : 'Join Lumina Luxe' }}
            </h2>
            <p class="text-slate-500 mt-2">
              {{ isSignIn() ? 'Enter your details to access your account.' : 'Start your journey with premium technology.' }}
            </p>
          </div>

          <form (submit)="handleSubmit($event)" class="space-y-5">
            @if (!isSignIn()) {
              <div>
                <label class="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Full Name</label>
                <input 
                  [(ngModel)]="name" 
                  name="name"
                  type="text" 
                  placeholder="Julian Marshall" 
                  required
                  class="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                >
              </div>
            }

            <div>
              <label class="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Email Address</label>
              <input 
                [(ngModel)]="email" 
                name="email"
                type="email" 
                placeholder="julian@lumina.com" 
                required
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              >
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Password</label>
              <input 
                [(ngModel)]="password" 
                name="password"
                type="password" 
                placeholder="••••••••" 
                required
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              >
            </div>

            <button 
              type="submit" 
              [disabled]="isLoading()"
              class="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              @if (isLoading()) {
                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Processing...</span>
              } @else {
                <span>{{ isSignIn() ? 'Sign In' : 'Create Account' }}</span>
              }
            </button>
          </form>

          @if (isSignIn()) {
            <div class="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 text-center">Admin Access Hint</p>
              <div class="flex justify-center space-x-4 text-xs">
                <p><span class="text-slate-400">User:</span> <code class="text-indigo-600 font-bold">admin@luminaluxe.com</code></p>
                <p><span class="text-slate-400">Pass:</span> <code class="text-indigo-600 font-bold">admin123</code></p>
              </div>
            </div>
          }

          <div class="mt-8 pt-8 border-t border-slate-100 text-center">
            <p class="text-slate-500 text-sm">
              {{ isSignIn() ? "Don't have an account?" : "Already have an account?" }}
              <button (click)="toggleMode()" class="text-indigo-600 font-bold hover:underline ml-1">
                {{ isSignIn() ? 'Create one now' : 'Sign in instead' }}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AuthModalComponent {
  authService = inject(AuthService);
  close = output<void>();

  isSignIn = signal(true);
  isLoading = signal(false);

  // Form fields
  email = '';
  name = '';
  password = '';

  toggleMode() {
    this.isSignIn.update(v => !v);
  }

  async handleSubmit(event: Event) {
    event.preventDefault();
    if (!this.email || !this.password) return;

    this.isLoading.set(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (this.isSignIn()) {
      this.authService.signIn(this.email, this.password);
    } else {
      this.authService.signUp(this.name, this.email);
    }

    this.isLoading.set(false);
    this.close.emit();
  }
}
