import { Component, OnInit } from '@angular/core';
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

  private readonly menuSource: AppMenuNode[] = [
    {
      label: 'Usuário',
      children: [
        { label: 'Cadastro', route: '/usuario/cadastro' },
        { label: 'Lista', route: '/usuario/lista' },
      ],
    },
  ];

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.items = this.toMenuItems(this.menuSource);
  }

  private toMenuItems(nodes: AppMenuNode[]): MenuItem[] {
    return nodes.map((n) => {
      const hasChildren = !!n.children?.length;

      return {
        label: n.label,
        items: hasChildren ? this.toMenuItems(n.children!) : undefined,
        command: !hasChildren && n.route
          ? () => this.router.navigate([n.route!])
          : undefined,
      };
    });
  }
}
