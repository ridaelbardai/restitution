import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Subscription } from 'rxjs';
import { MenuToggleService } from 'src/app/core/services/menu.service';

@Component({
  selector: 'nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent implements OnInit, OnDestroy {
  menuSubscription!: Subscription;
  constructor(private menuToggleService: MenuToggleService) {}

  menuOpen = false;

  ngOnInit(): void {
    this.menuSubscription = this.menuToggleService.toggleMenu$.subscribe(() => {
      this.toggleMenu();
    });

    this.initMenuToggle();
    this.bindOverlayClick();
    //pour les sous-menu
    // this.bindFieldsToggle();
    // this.bindNavClick();
    // this.bindToggleCta();
  }

  // -------------------------
  // Init side menu toggle
  // -------------------------
  private initMenuToggle(): void {
    const $menuButton = $('.js-open-menu');

    $('side-nav-menu').addClass('nav_is_viewed');

    if ($menuButton.hasClass('nav_is_viewed')) {
      $(document).on('click', () => {
        $menuButton.removeClass('nav_is_viewed');
        $('body').removeClass('nav_is_viewed');
      });
    }

    $(document).on('click', '.js-open-menu', function () {
      $('html, body').animate({ scrollTop: 0 }, 'fast');
      $(this).toggleClass('nav_is_viewed');
      $('body').delay(500).toggleClass('nav_is_viewed');
      return false;
    });
  }

  // -------------------------
  // Overlay click handler
  // -------------------------
  private bindOverlayClick(): void {
    $(document).on('click', '.overlay', () => {
      $('.js-open-menu').toggleClass('nav_is_viewed');
      $('body').delay(500).toggleClass('nav_is_viewed');
      return false;
    });
  }

  // -------------------------
  // Toggle group open class
  // -------------------------
  private bindFieldsToggle(): void {
    $(document).on('click', '.fields__grp__title', function () {
      $(this).toggleClass('opened');
      return false;
    });
  }

  // -------------------------
  // Open/Close navigation
  // -------------------------
  private bindNavClick(): void {
    $(document).on('click', 'nav > ul > li > a', function () {
      const $parent = $(this).parent();
      $('nav > ul > li').removeClass('opened');

      if (!$parent.hasClass('opened')) {
        $parent.addClass('opened');
      }

      return false;
    });
  }

  // -------------------------
  // CTA toggle (show/hide sections)
  // -------------------------
  private bindToggleCta(): void {
    $(document).on('click', "[data-cta*='js-toggle']", function () {

      const ctaAttr = $(this).attr('data-cta');
      if (!ctaAttr) return false;

      const [_, targetId, action] = ctaAttr.split('_');
      const $target = $('#' + targetId);
      if (!$target.length) return false;

      const offset = $target.offset();
      if (!offset) return false;

      if (action === 'show') {
        $target.slideDown(500, () => {
          $('html, body').animate({ scrollTop: offset.top - 10 }, 500);
        });
      } else {
        $('html, body').animate({ scrollTop: 200 }, 200, () => {
          $target.slideUp(500);
        });
      }

      return false;
    });
  }

  ngOnDestroy(): void {
    this.menuSubscription.unsubscribe();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: Event) {
    const target = event.target as HTMLElement;

    if (this.menuOpen && target.classList.contains('overlay')) {
      console.log(target.classList);
      this.closeMenu();
    }
  }
}
