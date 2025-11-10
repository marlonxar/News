import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  lastNews: any[] = [];
  popularNews: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private newsService: NewsService, private router: Router) {}

  async ngOnInit() {
    try {
      const news = await this.newsService.getNews();

      // Ordena por fecha (últimas noticias)
      this.lastNews = news
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5); // últimas 5 noticias

      // Ordena por visitas o popularidad
      this.popularNews = news
        .sort((a, b) => b.views - a.views)
        .slice(0, 5); // top 5 más populares

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
