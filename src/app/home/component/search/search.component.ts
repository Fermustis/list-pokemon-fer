import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrl: './search.component.scss',
})
export class SearchComponent {
    @Output() item = new EventEmitter<string>();
    buscar(item: string) {
        this.item.emit(item);
    }
}
