import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent {

  @Output() search = new EventEmitter<string>();

  onSearch(event: any) {
    this.search.emit(event.target.value);
  }

}
