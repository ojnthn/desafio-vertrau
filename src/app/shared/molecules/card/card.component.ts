import { Component, Input } from "@angular/core";
import { CardModule } from "primeng/card";

@Component({
    selector: 'app-card',
    standalone: true,
    templateUrl: './card.component.html',
    imports: [CardModule]
})

export class CardComponent {
    @Input() header?: string;
}