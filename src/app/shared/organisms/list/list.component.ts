import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TableModule } from 'primeng/table';

export interface DataListColumn<T> {
  label: string;
  field: keyof T;
  width?: string;
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [TableModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent<T> {
  @Input() items: T[] = [];
  @Input() columns: DataListColumn<T>[] = [];
}
