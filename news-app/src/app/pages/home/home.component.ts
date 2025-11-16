import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredNews: any[] = [];
  additionalNews: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private newsService: NewsService, private router: Router) {}

  async ngOnInit() {
    try {
      const news = await this.newsService.getNews();

      // Filtrar solo noticias publicadas
      const publishedNews = news
        .filter(n => n.status === 'PUBLISHED')
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      // Separar primeras 5 como featured y siguientes 10 como additional
      this.featuredNews = publishedNews.slice(0, 5);
      this.additionalNews = publishedNews.slice(5, 15);

    } catch (err: any) {
      this.error = err.message || 'Error fetching news';
    } finally {
      this.loading = false;
    }
  }

  goToNews(slug: string) {
    this.router.navigate(['/news', slug]);
  }
}
