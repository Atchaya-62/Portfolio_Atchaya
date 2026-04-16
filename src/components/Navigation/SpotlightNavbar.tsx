import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import { cn } from "../../utils/helpers";

export interface NavItem {
  label: string;
  href: string;
}

export interface SpotlightNavbarProps {
  items?: NavItem[];
  className?: string;
  onItemClick?: (item: NavItem, index: number) => void;
  defaultActiveIndex?: number;
}

export function SpotlightNavbar({
  items = [
    { label: "Home", href: "#home" },
    { label: "Projects", href: "#projects" },
    { label: "Connect", href: "/connect" },
  ],
  className,
  onItemClick,
  defaultActiveIndex = 0,
}: SpotlightNavbarProps) {
  const navRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const [hoverX, setHoverX] = useState<number | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Refs for the "light" positions so we can animate them imperatively
  const spotlightX = useRef(0);
  const ambienceX = useRef(0);

  // Detect theme changes
  useEffect(() => {
    const updateTheme = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      setIsDarkMode(theme === 'dark');
    };

    updateTheme();

    // Watch for theme changes
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    const nav = navRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = nav.getBoundingClientRect();
      const x = e.clientX - rect.left;
      setHoverX(x);
      spotlightX.current = x;
      nav.style.setProperty("--spotlight-x", `${x}px`);
    };

    const handleMouseLeave = () => {
      setHoverX(null);
      const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`);
      if (activeItem) {
        const navRect = nav.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();
        const targetX = itemRect.left - navRect.left + itemRect.width / 2;
        animate(spotlightX.current, targetX, {
          type: "spring",
          stiffness: 200,
          damping: 20,
          onUpdate: (v) => {
            spotlightX.current = v;
            nav.style.setProperty("--spotlight-x", `${v}px`);
          },
        });
      }
    };

    nav.addEventListener("mousemove", handleMouseMove);
    nav.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      nav.removeEventListener("mousemove", handleMouseMove);
      nav.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [activeIndex]);

  useEffect(() => {
    if (!navRef.current) return;
    const nav = navRef.current;
    const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`);
    if (activeItem) {
      const navRect = nav.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();
      const targetX = itemRect.left - navRect.left + itemRect.width / 2;
      animate(ambienceX.current, targetX, {
        type: "spring",
        stiffness: 200,
        damping: 20,
        onUpdate: (v) => {
          ambienceX.current = v;
          nav.style.setProperty("--ambience-x", `${v}px`);
        },
      });
    }
  }, [activeIndex]);

  const handleItemClick = (item: NavItem, index: number) => {
    setActiveIndex(index);
    onItemClick?.(item, index);
  };

  return (
    <div className={cn("relative flex justify-center", className)}>
      <nav
        ref={navRef}
        className={cn(
          "spotlight-nav",
          "relative h-11 rounded-full transition-all duration-300 overflow-hidden"
        )}
      >
        <ul className="relative flex items-center h-full px-2 gap-0 z-[10]">
          {items.map((item, idx) => (
            <li key={idx} className="relative h-full flex items-center justify-center">
              <a
                href={item.href}
                data-index={idx}
                onClick={(e) => {
                  e.preventDefault();
                  handleItemClick(item, idx);
                }}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                )}
                style={{
                  color: isDarkMode ? '#ffffff' : '#000000',
                  opacity: activeIndex === idx ? 1 : 0.7,
                  fontWeight: activeIndex === idx ? 'bold' : 'medium',
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div
          className="pointer-events-none absolute bottom-0 left-0 w-full h-full z-[1] opacity-0 transition-opacity duration-300"
          style={{
            opacity: hoverX !== null ? 1 : 0,
            background: `radial-gradient(120px circle at var(--spotlight-x) 100%, var(--spotlight-color) 0%, transparent 50%)`,
          }}
        />

        <div
          className="pointer-events-none absolute bottom-0 left-0 w-full h-[2px] z-[2]"
          style={{
            background: `radial-gradient(60px circle at var(--ambience-x) 0%, var(--ambience-color) 0%, transparent 100%)`,
          }}
        />

        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-purple-200 dark:bg-blue-500/20 z-0" />
      </nav>

      <style>{`
        .spotlight-nav {
          --spotlight-color: rgba(155, 135, 245, 0.15);
          --ambience-color: rgba(155, 135, 245, 1);
          background: var(--color-background);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(155, 135, 245, 0.3);
          box-shadow: 0 4px 6px -1px rgba(155, 135, 245, 0.1);
          transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        [data-theme="dark"] .spotlight-nav {
          --spotlight-color: rgba(96, 165, 250, 0.2);
          --ambience-color: rgba(96, 165, 250, 1);
          background: var(--color-background);
          border: 1px solid rgba(96, 165, 250, 0.3);
          box-shadow: 0 4px 6px -1px rgba(96, 165, 250, 0.2);
        }
      `}</style>
    </div>
  );
}
