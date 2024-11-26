import { Component } from '@angular/core';
import { CustomDropdownComponent } from '../custom-dropdown/custom-dropdown.component';
import { RouterLink, RouterModule } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CustomDropdownComponent,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
