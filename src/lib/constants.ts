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
