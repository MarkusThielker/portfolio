export type NavItem = {
    name: string
    path: string
    icon: string
}

export const navItems: NavItem[] = [
    {name: "Blog", path: "/blog", icon: "blog"},
    {name: "Github", path: "https://github.com/markusthielker", icon: "github"},
    {name: "LinkedIn", path: "https://www.linkedin.com/in/markusthielker/", icon: "linkedin"},
]

export const STATS_BADGE = "flex flex-row px-2 bg-gray-200/20 rounded-full"
