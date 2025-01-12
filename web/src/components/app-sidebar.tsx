import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Overview",
          url: "#overview",
        },
        {
          title: "Why zuji?",
          url: "#why",
        },
        {
          title: "Installation",
          url: "#installation",
        },
      ],
    },
    {
      title: "Options API Reference",
      url: "#api-reference",
      items: [
        {
          title: "Style Options",
          url: "#style-options",
        },
        {
          title: "Currency Options",
          url: "#currency-options",
        },
        {
          title: "Unit Options",
          url: "#unit-options",
        },
        {
          title: "Digit Options",
          url: "#digit-options",
        },
        {
          title: "Sign Display",
          url: "#sign-display",
        },
        {
          title: "Notation Options",
          url: "#notation-options",
        },
        {
          title: "Grouping Options",
          url: "#grouping-options",
        },
        {
          title: "Rounding Options",
          url: "#rounding-options",
        },
        {
          title: "Localization",
          url: "#localization",
        },
      ],
    },
    {
      title: "Examples",
      url: "#",
      items: [
        {
          title: "Interactive Playground",
          url: "#playground",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-full bg-neutral-900 text-sidebar-primary-foreground text-lg font-normal font-[ui-serif]">
                  千
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-mono font-semibold">zuji</span>
                  <span className="text-xs text-muted-foreground">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
