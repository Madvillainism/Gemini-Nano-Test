import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
  <h2>Chrome Built-in Language Detection API </h2>
  @if (showSetup()) {
    <!-- <app-setup /> -->
  }
  <!-- <app-detect-ai [showUserAgent]="showUserAgent()" /> -->
`,
  styles: `
  :host {
    display: block;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'angular-ai';
  showSetup = signal(false);
  showUserAgent = signal(false);
}
