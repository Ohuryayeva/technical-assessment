import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./components/list-view/list-view.component")
        .then((m) => m.ListViewComponent),
  },
];
