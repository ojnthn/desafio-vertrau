import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

type AppMenuNode = {
  label: string;
  route?: string;
  children?: AppMenuNode[];
};

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  imports: [MenubarModule],
})
export class MenuComponent implements OnInit {
  items: MenuItem[] = [];
  private router = inject(Router);

  private readonly menuSource: AppMenuNode[] = [
    {
      label: 'Usuário',
      children: [
        { label: 'Cadastro', route: '/usuario/cadastro' },
        { label: 'Lista', route: '/usuario/lista' },
      ],
    },
  ];

  ngOnInit(): void {
    this.items = this.toMenuItems(this.menuSource);
  }

  private toMenuItems(nodes: AppMenuNode[]): MenuItem[] {
    return nodes.map((n) => {
      const hasChildren = !!n.children?.length;

      const item: MenuItem = {
        label: n.label,
        items: hasChildren ? this.toMenuItems(n.children!) : undefined,
        command: n.route
          ? (event) => {
              event.originalEvent?.preventDefault?.();
              this.router.navigate([n.route!]);
            }
          : undefined,
      };

      return item;
    });
  }
}
