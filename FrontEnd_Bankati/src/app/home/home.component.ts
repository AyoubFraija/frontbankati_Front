import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  animations: [
    trigger('imageAnimation', [
      state('in', style({ transform: 'translateY(0)' })),
      transition('void => *', [
        style({ transform: 'translateY(100%)' }),
        animate('1s ease-out')
      ])
    ]),
    trigger('textAnimation', [
      state('in', style({ transform: 'translateX(0)', opacity: 1 })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('1s 0.5s ease-out')
      ])
    ])
  ]
})
export class HomeComponent implements AfterViewInit {
  constructor() { }

  ngAfterViewInit(): void {
  }
}
