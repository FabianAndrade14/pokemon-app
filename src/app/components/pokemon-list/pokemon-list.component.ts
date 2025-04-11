import { Component } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent {

  allPokemon: any[] = [];
  filteredPokemon: any[] = [];
  searchTerm: string = '';

  constructor(private pokemonService: PokemonService) { }

  loadRegion(regionId: string) {
    this.pokemonService.getRegion(regionId).subscribe((regionData) => {
      const urls = regionData.pokedexes[0].url;
      fetch(urls)
      .then(res => res.json())
      .then(pokedex => {
        const pokemonEntries = pokedex.pokemon_entries;
        const detailUrls = pokemonEntries.map((p: any) => 
          `https://pokeapi.co/api/v2/pokemon/${p.pokemon_species.name}`
        );
        this.pokemonService.getPokemonByUrls(detailUrls.slice(0, 20)).subscribe(data => {
          this.allPokemon = data;
          this.filteredPokemon = data;
        })
      })
    })
  }

  onSearch( term: string ) {
    this.searchTerm = term.toLowerCase();
    this.filteredPokemon = this.allPokemon.filter( p => 
      p.name.toLowerCase().includes(this.searchTerm)
    )
  }

}
