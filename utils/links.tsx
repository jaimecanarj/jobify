import { AreaChart, Layers, AppWindow } from "lucide-react";

type NavLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const links: NavLink[] = [
  {
    href: "/add-job",
    label: "añadir trabajo",
    icon: <Layers />,
  },
  {
    href: "/jobs",
    label: "todos los trabajos",
    icon: <AppWindow />,
  },
  {
    href: "/stats",
    label: "estadísticas",
    icon: <AreaChart />,
  },
];

export default links;
