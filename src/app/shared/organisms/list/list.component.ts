import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TableModule } from 'primeng/table';

export interface DataListColumn<T> {
  label: string;
  field: keyof T;
  width?: string;
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent<T> {
  @Input() items: T[] = [];
  @Input() columns: DataListColumn<T>[] = [];
}
