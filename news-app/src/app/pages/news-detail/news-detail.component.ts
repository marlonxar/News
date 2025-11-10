import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {

  article: any;
  recentArticles: any[] = [];
  loading = true;
  error: string | null = null;
  linkCopied = false;

  constructor(
    private route: ActivatedRoute, 
    private newsService: NewsService,
    private router: Router
  ) {}

  async ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug')!;

    try {
      // Cargar artículo actual
      this.article = await this.newsService.getNewsBySlug(slug);

      // Cargar todas las noticias para recientes
      const news = await this.newsService.getNews();

      // Filtrar actuales y tomar últimas
      this.recentArticles = news
        .filter(n => n.slug !== slug)     // excluye la actual
        .slice(0, 5);                     // top 5
    } 
    catch (err: any) {
      this.error = err.message || 'Error loading article';
    } 
    finally {
      this.loading = false;
    }
  }

  goToNews(slug: string) {
    this.router.navigate(['/news', slug]);
  }

  copyLink() {
    navigator.clipboard.writeText(window.location.href);

    this.linkCopied = true;

    setTimeout(() => {
      this.linkCopied = false;
    }, 2000);
  }
}
