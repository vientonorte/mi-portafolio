import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import type { NavItem } from "../../lib/nav-types";

interface NavMoreMenuProps {
  label: string;
  items: NavItem[];
  onSelect: (item: NavItem) => void;
}

export function NavMoreMenu({ label, items, onSelect }: NavMoreMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="hover:text-primary hover:bg-primary/10 gap-1"
          aria-haspopup="menu"
        >
          {label}
          <ChevronDown className="h-4 w-4 opacity-70" aria-hidden />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[11rem]">
        {items.map((item) => (
          <DropdownMenuItem
            key={item.href}
            onSelect={() => onSelect(item)}
            className="cursor-pointer"
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}