
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { JournalService } from '../services/journal.service';
import { Article } from '../models/article.model';

@Component({
  selector: 'app-journal',
  imports: [CommonModule, RouterLink],
  template: `
    <div class="bg-white min-h-screen">
      <!-- Header -->
      <div class="max-w-7xl mx-auto px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <h1 class="text-5xl font-extrabold text-slate-900 tracking-tight mb-4">The Journal</h1>
        <p class="text-xl text-slate-500 max-w-2xl leading-relaxed">
          Exploring the intersection of technology, design, and human potential. Insights from the Electronics Store editorial team.
        </p>
      </div>

      <!-- Featured Article -->
      <div class="max-w-7xl mx-auto px-4 pb-16 sm:px-6 lg:px-8">
        @if (isLoading()) {
          <div class="animate-pulse flex flex-col lg:flex-row gap-8 lg:gap-16">
            <div class="w-full lg:w-2/3 aspect-[16/9] bg-slate-100 rounded-3xl"></div>
            <div class="w-full lg:w-1/3 flex flex-col justify-center space-y-4">
              <div class="h-4 w-24 bg-slate-100 rounded"></div>
              <div class="h-10 w-full bg-slate-100 rounded"></div>
              <div class="h-20 w-full bg-slate-100 rounded"></div>
            </div>
          </div>
        } @else {
          @let featured = featuredArticle();
          @if (featured) {
            <div class="group relative flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
              <div class="w-full lg:w-2/3 overflow-hidden rounded-3xl bg-slate-100 shadow-sm transition-shadow hover:shadow-xl">
                <img 
                  [src]="featured.image" 
                  (load)="onImageLoad(featured.id)"
                  class="w-full h-full object-cover aspect-[16/9] group-hover:scale-105 transition-transform duration-1000 opacity-0"
                  [class.opacity-100]="loadedImages().has(featured.id)"
                  loading="eager"
                  [alt]="featured.title">
              </div>
              <div class="w-full lg:w-1/3">
                <span class="text-indigo-600 font-bold uppercase tracking-widest text-sm mb-4 block">{{ featured.category }}</span>
                <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight hover:text-indigo-600 transition-colors cursor-pointer">
                  {{ featured.title }}
                </h2>
                <p class="text-slate-500 text-lg mb-8 leading-relaxed">
                  {{ featured.excerpt }}
                </p>
                <div class="flex items-center space-x-4">
                  <div class="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                    {{ featured.author[0] }}
                  </div>
                  <div>
                    <p class="text-sm font-bold text-slate-900">{{ featured.author }}</p>
                    <p class="text-xs text-slate-400">{{ featured.date }} • {{ featured.readTime }}</p>
                  </div>
                </div>
              </div>
              <a href="#" class="absolute inset-0 z-0"></a>
            </div>
          }
        }
      </div>

      <!-- Secondary Articles Grid -->
      <div class="bg-slate-50 border-t border-slate-100 py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            @if (isLoading()) {
              @for (i of [1,2,3]; track i) {
                <div class="space-y-6 animate-pulse">
                  <div class="aspect-[4/3] bg-slate-200 rounded-2xl"></div>
                  <div class="h-4 w-20 bg-slate-200 rounded"></div>
                  <div class="h-6 w-full bg-slate-200 rounded"></div>
                  <div class="h-12 w-full bg-slate-200 rounded"></div>
                </div>
              }
            } @else {
              @for (article of secondaryArticles(); track article.id) {
                <article class="group">
                  <div class="relative overflow-hidden rounded-2xl bg-white mb-6 aspect-[4/3] border border-slate-100 shadow-sm transition-all group-hover:shadow-md">
                    <img 
                      [src]="article.image" 
                      (load)="onImageLoad(article.id)"
                      class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-0"
                      [class.opacity-100]="loadedImages().has(article.id)"
                      loading="lazy"
                      [alt]="article.title">
                  </div>
                  <span class="text-indigo-600 text-xs font-bold uppercase tracking-widest block mb-3">{{ article.category }}</span>
                  <h3 class="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors cursor-pointer">
                    {{ article.title }}
                  </h3>
                  <p class="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-6">
                    {{ article.excerpt }}
                  </p>
                  <div class="flex items-center justify-between text-xs text-slate-400 font-medium pt-4 border-t border-slate-100">
                    <span>{{ article.author }}</span>
                    <span>{{ article.date }}</span>
                  </div>
                  <a href="#" class="block mt-4 text-indigo-600 text-sm font-bold hover:underline">Read Full Insight &rarr;</a>
                </article>
              }
            }
          </div>
        </div>
      </div>

      <!-- Newsletter CTA -->
      <div class="max-w-4xl mx-auto px-4 py-24 text-center">
        <h2 class="text-3xl font-bold text-slate-900 mb-4">Never miss an insight.</h2>
        <p class="text-slate-500 mb-10">Join 50,000+ innovators receiving our weekly digest on technology and design.</p>
        <div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input type="email" placeholder="email@electronicsstore.com" class="flex-1 px-6 py-4 bg-slate-100 border border-transparent rounded-xl focus:bg-white focus:border-indigo-500 outline-none transition-all">
          <button class="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition">Subscribe</button>
        </div>
      </div>
    </div>
  `
})
export class JournalComponent implements OnInit {
  private journalService = inject(JournalService);
  
  featuredArticle = signal<Article | null>(null);
  secondaryArticles = signal<Article[]>([]);
  isLoading = signal(true);
  loadedImages = signal<Set<string>>(new Set());

  ngOnInit() {
    // Simulate loading
    setTimeout(() => {
      this.featuredArticle.set(this.journalService.getFeaturedArticle());
      this.secondaryArticles.set(this.journalService.getSecondaryArticles());
      this.isLoading.set(false);
    }, 800);
  }

  onImageLoad(id: string) {
    this.loadedImages.update(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }
}
