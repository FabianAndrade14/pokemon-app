import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent {

  @Input() pokemon: any;

  // Con este método se trae el color de los tipos de pokémon
  getTypeColor(type: string): string {
    const colors: any = {
      fire: '#f08030',
      grass: '#78c850',
      poison: '#a040a0',
      water: '#6890f0',
      electric: '#f8d030',
      normal: '#a8a878',
    };
    return colors[type] || '#ccc';
  }

}
