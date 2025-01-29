import { useState } from "react";
import { House, Users, Phone, Blocks, Headphones, BookOpen } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sidebar,
  SidebarBody,
  SidebarLink
} from "@/components/ui/sidebar"; // Ensure these are React Router compatible
import { cn } from "@/lib/utils";

const items = [
  {
    title: "Home",
    url: "/",
    icon: <House className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
  },
  // ... rest of the items array
];

export function AppSidebar() {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  return (
    <Sidebar open={open} setOpen={setOpen} variant="floating">
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {open ? <Logo /> : <LogoIcon />}
          <div className="mt-8 flex flex-col gap-2">
            {items.map((item) => (
              item.isExternal ? (
                <a
                  key={item.title}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                >
                  {item.icon}
                  {open && <span>{item.title}</span>}
                </a>
              ) : (
                <Link
                  key={item.title}
                  to={item.url}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors",
                    location.pathname === item.url && "bg-neutral-100 dark:bg-neutral-700",
                    !open && "justify-center"
                  )}
                >
                  {item.icon}
                  {open && <span>{item.title}</span>}
                </Link>
              )
            ))}
          </div>
        </div>
      </SidebarBody>
    </Sidebar>
  );
}

// Logo components using React Router's Link
const Logo = () => (
  <Link
    to="/"
    className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
  >
    <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="font-medium text-black dark:text-white whitespace-pre"
    >
      Automation Ally
    </motion.span>
  </Link>
);

const LogoIcon = () => (
  <Link
    to="/"
    className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
  >
    <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
  </Link>
);
