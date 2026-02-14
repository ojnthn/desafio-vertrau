import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { By } from '@angular/platform-browser';
import { CardModule } from 'primeng/card';

describe('CardComponent', () => {
    let fixture: ComponentFixture<CardComponent>;
    let component: CardComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
        imports: [CardComponent, CardModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CardComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
});
