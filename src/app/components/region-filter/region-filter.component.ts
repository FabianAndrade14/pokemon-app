import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-region-filter',
  templateUrl: './region-filter.component.html',
  styleUrls: ['./region-filter.component.scss']
})
export class RegionFilterComponent {

  @Output() regionSelected = new EventEmitter<string>();

  onRegionChange(event: any) {
    this.regionSelected.emit(event.target.value);
  }

}
