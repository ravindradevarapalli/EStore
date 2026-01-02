
import { Injectable, signal, computed } from '@angular/core';

export interface User {
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSignal = signal<User | null>(null);
  
  // Predefined Admin Credentials
  private readonly ADMIN_EMAIL = 'admin@luminaluxe.com';
  private readonly ADMIN_PASS = 'admin123';

  currentUser = computed(() => this.userSignal());
  isAuthenticated = computed(() => !!this.userSignal());
  isAdmin = computed(() => this.userSignal()?.role === 'admin');
  
  userInitials = computed(() => {
    const user = this.userSignal();
    if (!user) return '';
    return user.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  });

  signIn(email: string, password?: string): boolean {
    // Admin check
    if (email === this.ADMIN_EMAIL && password === this.ADMIN_PASS) {
      this.userSignal.set({
        name: 'System Administrator',
        email: this.ADMIN_EMAIL,
        role: 'admin'
      });
      return true;
    }

    // Default Guest Login (any other credentials)
    this.userSignal.set({
      name: 'Julian Marshall',
      email: email,
      role: 'user'
    });
    return true;
  }

  signUp(name: string, email: string) {
    this.userSignal.set({ 
      name, 
      email, 
      role: 'user' 
    });
  }

  signOut() {
    this.userSignal.set(null);
  }
}
