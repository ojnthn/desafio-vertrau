import { Component, Input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { NgForOf } from "../../../../../node_modules/@angular/common/types/_common_module-chunk";

export interface DataListColumn<T> {
  label: string;
  field: keyof T;
  width?: string;
}

export interface DataListAction<T> {
  label: string;
  icon?: string;
  onClick: (item: T) => void;
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
  @Input() columns: Array<{ label: string; field: keyof T }> = [];
  @Input() actionLabel = 'Ação';
  @Input() action!: (item: T) => void;
}
