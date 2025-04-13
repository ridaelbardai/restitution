import { Component, HostListener, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent implements OnInit {
  constructor() {}

  menuOpen = false;

  ngOnInit(): void {
    $('body').addClass('nav_is_viewed');
    $('side-nav-menu').addClass('nav_is_viewed');
    if ($('.js-open-menu').hasClass('nav_is_viewed')) {
      $(document).bind('click', function () {
        $('.js-open-menu').removeClass('nav_is_viewed');
        $('body').removeClass('nav_is_viewed');
      });
    }

    $(document).on('click', '.js-open-menu', function () {
      var elt = this;

      $(elt).toggleClass('nav_is_viewed');
      $('body').delay(500).toggleClass('nav_is_viewed');
      $(document).bind('click', function () {
        $(elt).removeClass('nav_is_viewed');
        $('body').removeClass('nav_is_viewed');
      });

      return false;
    });

    $(document).on('click', '.fields__grp__title', function () {
      $(this).toggleClass('opened');
      return false;
    });

    $(document).on('click', 'nav > ul > li > a', function () {
      if ($(this).parent().hasClass('opened')) {
        $('nav > ul > li').removeClass('opened');
        // console.log("1");
      } else {
        $('nav > ul > li').removeClass('opened');
        $(this).parent().addClass('opened');
        // console.log("2");
      }
      return false;
    });

    $(document).on('click', "[data-cta*='js-toggle']", function () {
      const selectedElt = $(this);
      const ctaAttr = selectedElt.attr('data-cta');

      if (!ctaAttr) return false;

      const parts = ctaAttr.split('_');
      const elem = $('#' + parts[1]);

      if (elem.length) {
        const offset = elem.offset();
        if (!offset) return false; // handle case where offset() returns undefined

        const scrollTo = offset.top;

        if (parts[2] === 'show') {
          elem.slideDown(500, function () {
            $('html, body')
              .stop()
              .animate({ scrollTop: scrollTo - 10 }, 500);
          });
        } else {
          $('html, body')
            .stop()
            .animate({ scrollTop: 200 }, 200, function () {
              elem.slideUp(500);
            });
        }
      }

      return false;
    });
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
      this.closeMenu();
    }

    // if (target.classList.contains('Déclarations')) {
    //   target.classList.add('opened');
    // }
  }
}
