import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor( private http: HttpClient) { }

  getRegion(region: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/region/${region}`);
  }

  getPokemonDetails(url: string): Observable<any> {
    return this.http.get(url);
  }

  getPokemonByUrls(urls: string[]): Observable<any[]> {
    const requests = urls.map((url) => 
      this.http.get(url).pipe(
        catchError(() => of(null))
      )
    );
    return forkJoin(requests).pipe(
      map((results) => results.filter((p) => p !== null))
    )
    // return forkJoin(urls.map((url) => this.getPokemonDetails(url)));
  }
}
