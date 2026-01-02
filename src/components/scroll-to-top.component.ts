
import { Component, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scroll-to-top',
  imports: [CommonModule],
  template: `
    <button
      (click)="scrollToTop()"
      [class.opacity-0]="!isVisible()"
      [class.translate-y-10]="!isVisible()"
      [class.pointer-events-none]="!isVisible()"
      class="fixed bottom-8 right-8 z-[60] group p-4 rounded-full bg-indigo-600 text-white shadow-2xl shadow-indigo-200 transition-all duration-500 transform hover:scale-110 active:scale-95 hover:bg-indigo-700 glass border border-white/20"
      aria-label="Scroll to top"
    >
      <div class="relative">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </div>
      
      <!-- Tooltip -->
      <span class="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        Back to top
      </span>
    </button>
  `,
  host: {
    '(window:scroll)': 'onWindowScroll()'
  }
})
export class ScrollToTopComponent {
  isVisible = signal(false);

  onWindowScroll() {
    // Show button after 400px of scrolling
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isVisible.set(scrollPosition > 400);
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
