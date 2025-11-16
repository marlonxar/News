import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

  // Obtener noticias publicadas, ordenadas por fecha descendente
  async getNews(): Promise<any[]> {
    const { data, error } = await this.supabase
      .from('News')
      .select(`
        id,
        title,
        content,
        category,
        slug,
        tags,
        created_at,
        image,
        status
      `)
      .eq('status', 'PUBLISHED')   // 🔹 Filtramos solo las noticias publicadas
      .order('created_at', { ascending: false }); // 🔹 Más recientes primero

    if (error) {
      console.error('Error fetching news:', error);
      throw new Error(error.message);
    }

    return data || [];
  }

  async getNewsBySlug(slug: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('News')
      .select(`
        id,
        title,
        content,
        category,
        slug,
        tags,
        created_at,
        image,
        status
      `)
      .eq('slug', slug)
      .single(); 

    if (error) {
      console.error('Error fetching news detail:', error);
      throw new Error(error.message);
    }

    // Solo devolver si está publicada
    if (data?.status !== 'PUBLISHED') return null;

    return data;
  }
}
