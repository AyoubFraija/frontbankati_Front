import { AfterViewInit, Component, ElementRef, HostBinding, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent implements OnInit, AfterViewInit {
  @HostBinding('class.collapsed') isCollapsed = false;
  @HostBinding('class.menu-active') isMenuActive = false;
  isMobileView = false;

  constructor(private hostElement: ElementRef) { }

  ngOnInit(): void {
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  ngAfterViewInit() {
    const sidebarToggler = this.hostElement.nativeElement.querySelector(".sidebar-toggler");
    const menuToggler = this.hostElement.nativeElement.querySelector(".menu-toggler");

    if(sidebarToggler){
      sidebarToggler.addEventListener("click", () => this.toggleSidebar());
    }
    if(menuToggler){
      menuToggler.addEventListener("click", () => this.toggleMenu());
    }

  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
    if (this.isMobileView) {
      this.adjustMobileSidebarHeight();
    }
  }

  adjustMobileSidebarHeight() {
    if (this.isMenuActive) {
      this.hostElement.nativeElement.style.height = `${this.hostElement.nativeElement.scrollHeight}px`;
    } else {
      this.hostElement.nativeElement.style.height = '56px';
    }
  }


  checkScreenSize() {
    this.isMobileView = window.innerWidth <= 1024;
    if (this.isMobileView) {
      if (!this.isMenuActive) {
        this.hostElement.nativeElement.style.height = '56px';
      } else {
        this.adjustMobileSidebarHeight();
      }
      this.isCollapsed = false;
    } else {
      this.hostElement.nativeElement.style.height = "calc(100vh - 32px)";
      this.isMenuActive = false;
    }
  }

}
