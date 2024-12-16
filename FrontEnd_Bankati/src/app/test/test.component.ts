import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  isExpanded = false;
  constructor() { }

  ngOnInit(): void {
  }


  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }
}
