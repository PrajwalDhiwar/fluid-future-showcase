
import { useState, useEffect } from "react";
import { House, Users, Phone, Blocks, SquareChevronLeft, SquareChevronRight, Briefcase, MessageCircle } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const items = [
  {
    title: "Home",
    url: "/",
    icon: <House className="text-white h-5 w-5 flex-shrink-0" />
  },
  {
    title: "Services",
    url: "/services",
    icon: <Blocks className="text-white h-5 w-5 flex-shrink-0" />
  },
  {
    title: "Our Work",
    url: "/work",
    icon: <Briefcase className="text-white h-5 w-5 flex-shrink-0" />
  },
  {
    title: "Chat Assistant",
    url: "/chat",
    icon: <MessageCircle className="text-white h-5 w-5 flex-shrink-0" />
  },
  {
    title: "Team",
    url: "/team",
    icon: <Users className="text-white h-5 w-5 flex-shrink-0" />
  },
  {
    title: "Contact",
    url: "/contact",
    icon: <Phone className="text-white h-5 w-5 flex-shrink-0" />
  }
];

export function AppSidebar() {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "fixed top-4 left-4 z-[60] p-2 rounded-md bg-[#9b87f5] hover:bg-[#7E69AB] transition-all",
          open && "left-[270px]"
        )}
      >
        <SquareChevronRight className="h-5 w-5 text-white" />
      </button>

      {/* Sidebar */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-[50] transition-transform duration-300",
          !open && "-translate-x-full"
        )}
        style={{
          width: open ? '280px' : '0',
          overflow: 'hidden'
        }}
      >
        <div className="h-full">
          <Sidebar variant="floating" className="bg-[#9b87f5]">
            <SidebarContent 
              className={cn(
                "justify-between gap-10 transition-all duration-300",
                !open && "opacity-0 pointer-events-none"
              )}
            >
              <SidebarGroup>
                <SidebarGroupContent>
                  <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                    {open ? <Logo /> : <LogoIcon />}
                    <div className="mt-8 flex flex-col gap-2">
                      {items.map((item) => (
                        <Link
                          key={item.title}
                          to={item.url}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#7E69AB] transition-colors",
                            location.pathname === item.url && "bg-[#7E69AB]",
                            !open && "justify-center",
                            "text-white font-semibold"
                          )}
                          onClick={() => setOpen(false)} // Close sidebar when clicking an item
                        >
                          {item.icon}
                          {open && <span>{item.title}</span>}
                        </Link>
                      ))}
                    </div>
                  </div>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
        </div>
      </div>
    </>
  );
}

const Logo = () => (
  <Link
    to="/"
    className="font-bold flex space-x-2 items-center text-sm text-white py-1 relative z-20"
  >
    <div className="h-5 w-6 bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="font-bold text-white whitespace-pre"
    >
      Automation Ally
    </motion.span>
  </Link>
);

const LogoIcon = () => (
  <Link
    to="/"
    className="font-bold flex space-x-2 items-center text-sm text-white py-1 relative z-20"
  >
    <div className="h-5 w-6 bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
  </Link>
);
