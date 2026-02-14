import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent, DataListColumn } from './list.component';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('ListComponent', () => {
  interface TestItem {
    id: number;
    name: string;
  }

  let component: ListComponent<TestItem>;
  let fixture: ComponentFixture<ListComponent<any>>;

  const columns: DataListColumn<TestItem>[] = [
    { label: 'ID', field: 'id' },
    { label: 'Name', field: 'name' }
  ];

  const items: TestItem[] = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListComponent, TableModule, CommonModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    component.columns = columns;
    component.items = items;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render correct number of header columns', () => {
    const headerEls = fixture.debugElement.queryAll(By.css('th'));
    expect(headerEls.length).toBe(columns.length);
    expect(headerEls[0].nativeElement.textContent).toContain('ID');
    expect(headerEls[1].nativeElement.textContent).toContain('Name');
  });

  it('should render correct number of rows', () => {
    const rowEls = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rowEls.length).toBe(items.length);
    expect(rowEls[0].nativeElement.textContent).toContain('Item 1');
    expect(rowEls[1].nativeElement.textContent).toContain('Item 2');
  });
});