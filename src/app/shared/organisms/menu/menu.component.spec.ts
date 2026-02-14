import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { MenubarModule } from 'primeng/menubar';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { MenuItem } from 'primeng/api';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let navigateCalled: string | null = null;

  const routerMock = {
    navigate: (commands: any[]) => {
      navigateCalled = commands[0];
    }
  };

  beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},      
      removeListener: () => {},  
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
});

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuComponent, MenubarModule],
      providers: [{ provide: Router, useValue: routerMock }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    navigateCalled = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate menu items on ngOnInit', () => {
    expect(component.items.length).toBeGreaterThan(0);
    expect(component.items[0].label).toBe('Usuário');
    expect(component.items[0].items?.length).toBe(2);
  });

  it('should navigate to route when command is executed', () => {
    const firstChild = component.items[0].items![0];
    const mockEvent = { originalEvent: { preventDefault: () => {} } };

    firstChild.command!(mockEvent as any);

    expect(navigateCalled).toBe('/usuario/cadastro');
  });
});
