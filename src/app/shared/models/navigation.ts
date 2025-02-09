export interface NavItem {
  type: NavItemType;
  content?: string;
  route?: string;
  items?: NavItem[];
}

export type NavItemType = 'link' | 'divider' | 'dropdown';
