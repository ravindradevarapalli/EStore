
import { Injectable, signal } from '@angular/core';
import { Article } from '../models/article.model';

@Injectable({ providedIn: 'root' })
export class JournalService {
  private articlesData: Article[] = [
    {
      id: 'art-1',
      title: 'The Future of Spatial Audio: Beyond the Earbuds',
      excerpt: 'How immersive sound technology is reshaping our daily interaction with digital media and professional environments.',
      content: 'In the last decade, we have moved from simple stereo to complex spatial environments. This shift is not just about entertainment; it is about how we perceive space in remote work and digital collaboration...',
      category: 'Innovation',
      author: 'Elena Vance',
      date: 'March 15, 2025',
      image: 'https://picsum.photos/id/1/1200/800',
      readTime: '6 min read'
    },
    {
      id: 'art-2',
      title: 'Minimalism in Tech: Why Less is More',
      excerpt: 'Exploring the philosophy of essentialism in product design and how it leads to better user experiences.',
      content: 'True minimalism is not the absence of something, but the perfect amount of everything. At Lumina, we believe that removing the unnecessary reveals the extraordinary...',
      category: 'Design',
      author: 'Marcus Aurel',
      date: 'March 12, 2025',
      image: 'https://picsum.photos/id/10/800/600',
      readTime: '4 min read'
    },
    {
      id: 'art-3',
      title: 'Sustainable Innovation: Our 2025 Pledge',
      excerpt: 'A deep dive into our commitment to carbon neutrality and the use of recycled oceanic plastics in our latest accessories.',
      content: 'Sustainability is no longer a feature; it is a foundation. Our roadmap for 2025 includes a 40% reduction in packaging waste and a new lifecycle management program...',
      category: 'Sustainability',
      author: 'Sarah Chen',
      date: 'March 08, 2025',
      image: 'https://picsum.photos/id/28/800/600',
      readTime: '8 min read'
    },
    {
      id: 'art-4',
      title: 'The Art of the Perfect Workspace',
      excerpt: 'How lighting, ergonomics, and tactile hardware can significantly boost your creative output and mental clarity.',
      content: 'Your environment is the silent partner in your productivity. We explore how specifically calibrated lighting and mechanical feedback can trigger flow states...',
      category: 'Lifestyle',
      author: 'David Wright',
      date: 'March 01, 2025',
      image: 'https://picsum.photos/id/20/800/600',
      readTime: '5 min read'
    }
  ];

  articles = signal<Article[]>(this.articlesData);

  getArticleById(id: string): Article | undefined {
    return this.articlesData.find(a => a.id === id);
  }

  getFeaturedArticle(): Article {
    return this.articlesData[0];
  }

  getSecondaryArticles(): Article[] {
    return this.articlesData.slice(1);
  }
}
