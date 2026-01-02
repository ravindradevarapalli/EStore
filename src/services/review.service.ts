
import { Injectable, signal, computed } from '@angular/core';
import { Review } from '../models/review.model';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private reviewsState = signal<Review[]>([
    {
      id: 'r1',
      productId: '1',
      userName: 'Julian M.',
      rating: 5,
      comment: 'Absolutely phenomenal soundstage. The noise cancellation is eerie in how well it works. Worth every penny.',
      date: 'Feb 12, 2025'
    },
    {
      id: 'r2',
      productId: '1',
      userName: 'Sophie T.',
      rating: 4,
      comment: 'Very comfortable for long sessions, though the case is a bit bulkier than I expected.',
      date: 'Jan 28, 2025'
    },
    {
      id: 'r3',
      productId: '2',
      userName: 'Alex Rivers',
      rating: 5,
      comment: 'The OLED display is crisp even in direct sunlight. Tracking accuracy is spot on.',
      date: 'Mar 02, 2025'
    }
  ]);

  getReviewsByProductId(productId: string) {
    return computed(() => this.reviewsState().filter(r => r.productId === productId));
  }

  addReview(review: Omit<Review, 'id' | 'date'>) {
    const newReview: Review = {
      ...review,
      id: Math.random().toString(36).substring(2, 9),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    };
    this.reviewsState.update(reviews => [newReview, ...reviews]);
  }
}
