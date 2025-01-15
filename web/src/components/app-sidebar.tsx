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
        {
          title: "TypeScript",
          url: "#typescript",
        },
        {
          title: "Shortcuts",
          url: "#shortcuts",
        },
        {
          title: "Interactive Playground",
          url: "#playground",
        },
      ],
    },
    {
      title: "API Reference",
      url: "#api-reference",
      items: [
        {
          title: "style",
          url: "#style-option",
        },
        {
          title: "unit",
          url: "#unit-option",
        },
        {
          title: "unitDisplay",
          url: "#unitDisplay-option",
        },
        {
          title: "notation",
          url: "#notation-option",
        },
        {
          title: "compactDisplay",
          url: "#compactDisplay-option",
        },
        {
          title: "minimumIntegerDigits",
          url: "#minimumIntegerDigits-option",
        },
        {
          title: "minimumFractionDigits",
          url: "#minimumFractionDigits-option",
        },
        {
          title: "maximumFractionDigits",
          url: "#maximumFractionDigits-option",
        },
        {
          title: "minimumSignificantDigits",
          url: "#minimumSignificantDigits-option",
        },
        {
          title: "maximumSignificantDigits",
          url: "#maximumSignificantDigits-option",
        },
        {
          title: "signDisplay",
          url: "#signDisplay-option",
        },
        {
          title: "roundingMode",
          url: "#roundingMode-option",
        },
        {
          title: "roundingIncrement",
          url: "#roundingIncrement-option",
        },
        {
          title: "roundingPriority",
          url: "#roundingPriority-option",
        },
        {
          title: "trailingZeroDisplay",
          url: "#trailingZeroDisplay-option",
        },
        {
          title: "currency",
          url: "#currency-option",
        },
        {
          title: "currencyDisplay",
          url: "#currencyDisplay-option",
        },
        {
          title: "currencySign",
          url: "#currencySign-option",
        },
        {
          title: "useGrouping",
          url: "#useGrouping-option",
        },
        {
          title: "locale",
          url: "#locale-option",
        },
      ],
    },
    {
      title: "GitHub",
      url: "https://github.com/gillkyle/zuji",
    },
    {
      title: "Twitter/X",
      url: "https://x.com/gill_kyle",
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
                  <span className="text-xs text-muted-foreground">v1.0.7</span>
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
