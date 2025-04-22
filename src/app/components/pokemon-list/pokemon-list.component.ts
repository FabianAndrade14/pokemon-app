import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  allPokemon: any[] = [];
  filteredPokemon: any[] = [];
  searchTerm: string = '';
  isLoading = false;

  // Paginación
  currentPage: number = 1;
  itemsPerPage: number = 20;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.loadRegion('1');
  }

  loadRegion(regionId: string) {
    this.isLoading = true;
    this.pokemonService.getRegion(regionId).subscribe(async (regionData) => {
      const pokedexUrls = regionData.pokedexes.map((p: any) => p.url);

      const allEntries: any[] = [];

      // Cargar todas las entradas de cada Pokédex
      for (let url of pokedexUrls) {
        const res = await fetch(url);
        const data = await res.json();
        allEntries.push(...data.pokemon_entries);
      }

      // Eliminar duplicados por nombre
      const uniqueEntries = Array.from(
        new Map(
          allEntries.map((entry) => [entry.pokemon_species.name, entry])
        ).values()
      );

      const detailUrls = uniqueEntries.map(
        (entry) => `https://pokeapi.co/api/v2/pokemon/${entry.pokemon_species.name}`
        
      );
      console.log(detailUrls)
      this.pokemonService.getPokemonByUrls(detailUrls).subscribe((data) => {
        this.allPokemon = data;
        this.filteredPokemon = data;
        this.currentPage = 1;
        this.isLoading = false;
      })
    })
  }

  onSearch(term: string) {
    this.searchTerm = term.toLowerCase();
    this.filteredPokemon = this.allPokemon.filter(p =>
      p.name.toLowerCase().includes(this.searchTerm)
    )
    this.currentPage = 1;
  }

  get paginatedPokemon() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredPokemon.slice(start, start + this.itemsPerPage);
  }

  totalPages(): number {
    return Math.ceil(this.filteredPokemon.length / this.itemsPerPage);
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

}
