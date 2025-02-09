import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavItem } from '../models/navigation';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="navbar navbar-expand-sm navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <h2>Simply Recipe</h2>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            @for (navItem of navItems; track navItem) {
            <li class="nav-item {{ navItem.items ? 'dropdown' : '' }}">
              @if (navItem.items) {
              <ng-container
                *ngTemplateOutlet="navDropdown; context: { navItem }"
              ></ng-container>
              } @else {
              <ng-container
                *ngTemplateOutlet="navLink; context: { navItem }"
              ></ng-container>
              }
            </li>
            }
          </ul>
          <form class="d-flex">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>

    <ng-template #navLink let-navItem="navItem">
      <a class="nav-link" [routerLink]="navItem.route">{{ navItem.content }}</a>
    </ng-template>

    <ng-template #navDropdown let-navItem="navItem">
      <div class="dropdown__menu">
        <a
          class="nav-link dropdown-toggle"
          [routerLink]="navItem.route"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ navItem.content }}
        </a>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
          @for (dropdownItem of navItem.items; track dropdownItem) {
          <li>
            @switch (dropdownItem.type) { @case ('link') {
            <a class="dropdown-item" [routerLink]="dropdownItem.route">{{
              dropdownItem.content ?? ''
            }}</a>
            } @case ('divider') {
            <hr class="dropdown-divider" />
            } @case ('dropdown') {
            <ng-container
              *ngTemplateOutlet="navSubDropdown; context: { dropdownItem }"
            ></ng-container>
            } }
          </li>
          }
        </ul>
      </div>
    </ng-template>

    <ng-template #navSubDropdown let-navItem="dropdownItem">
      <div class="dropdown__menu dropdown__subMenu">
        <a
          class="dropdown-item dropdown-toggle"
          [routerLink]="navItem.route"
          id="navbarDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ navItem.content }}
        </a>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
          @for (dropdownItem of navItem.items; track dropdownItem) {
          <li>
            @switch (dropdownItem.type) { @case ('link') {
            <a class="dropdown-item" [routerLink]="dropdownItem.route">{{
              dropdownItem.content ?? ''
            }}</a>
            } @case ('divider') {
            <hr class="dropdown-divider" />
            } }
          </li>
          }
        </ul>
      </div>
    </ng-template>
  `,
  styles: `
    .dropdown__menu {
      &>ul {
        display: none;
      }
    }

    .dropdown__menu:hover {
      &>ul {
        display: block;
        position: fixed;
        
        li {
          display: block;
        }
      }
    }

    .dropdown__menu .dropdown__subMenu {
      &>ul {
        transform:translate(100%, -2rem);
      }
    }
  `,
})
export class NavigationComponent {
  navItems: NavItem[] = [
    {
      type: 'link',
      content: 'Home',
      route: '',
    },
    {
      type: 'dropdown',
      content: 'Categories',
      route: 'categories',
      items: [
        {
          type: 'link',
          content: 'Breakfast',
          route: 'breakfast',
        },
        {
          type: 'link',
          content: 'Lunch',
          route: 'lunch',
        },
        {
          type: 'dropdown',
          content: 'Dinner',
          route: 'dinner',
          items: [
            {
              type: 'link',
              content: 'Poultry',
              route: 'poultry',
            },
            {
              type: 'link',
              content: 'Beef',
              route: 'beef',
            },
            {
              type: 'link',
              content: 'Seafood',
              route: 'seafood',
            },
          ],
        },
        {
          type: 'divider',
        },
        {
          type: 'link',
          content: 'Vegetarian',
          route: 'vegetarian',
        },
        {
          type: 'link',
          content: 'Vegan',
          route: 'vegan',
        },
      ],
    },
  ];
}
