import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabsComponent, TabItem } from './tabs.component';
import { TabsModule } from 'primeng/tabs';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({ standalone: true, template: '' })
class DummyComponent {}

describe('TabsComponent', () => {
    let component: TabsComponent;
    let fixture: ComponentFixture<TabsComponent>;

    const tabItems: TabItem[] = [
        { value: 'tab1', label: 'Tab 1', component: DummyComponent },
        { value: 'tab2', label: 'Tab 2', component: DummyComponent },
        { value: 'tab3', label: 'Tab 3', component: DummyComponent, disabled: true }
    ];

    beforeAll(() => {
        (window as any).ResizeObserver = class {
            observe() {}
            unobserve() {}
            disconnect() {}
        };
    });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TabsComponent, TabsModule, CommonModule, DummyComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TabsComponent);
        component = fixture.componentInstance;
        component.tabs = [...tabItems];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should return activeTab correctly', () => {
        component.activeIndex = 1;
        expect(component.activeTab?.value).toBe('tab2');
    });

    it('should select tab if not disabled', () => {
        component.selectTab(1);
        expect(component.activeIndex).toBe(1);
    });

    it('should not select tab if disabled', () => {
        component.selectTab(2);
        expect(component.activeIndex).not.toBe(2);
    });

    it('should set activeIndex to 0 on ngOnChanges if null', () => {
        component.activeIndex = null as any;
        component.ngOnChanges({
            tabs: { currentValue: component.tabs, previousValue: [], firstChange: true, isFirstChange: () => true }
        });
        expect(component.activeIndex).toBe(0);
    });
});
