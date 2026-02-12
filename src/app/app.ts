import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<div class="card flex justify-center">
            <p-button label="Submit" />
        </div>`
})
export class App {
  protected readonly title = signal('desafio-vertrau');
}
