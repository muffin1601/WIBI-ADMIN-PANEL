import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Layers,
  Mail,
  Users
} from "lucide-react";
import styles from "./Sidebar.module.css";
import logo from "/logo (3).webp";

const nav = [
  { label: "Dashboard", icon: LayoutDashboard, path: "" },

  { section: "Catalog" },
  { label: "Products", icon: Package, path: "products" },
  { label: "Categories", icon: Layers, path: "categories" },

  { section: "Leads" },
  { label: "Catalogue Requests", icon: Mail, path: "catalogue-requests" },
  { label: "Newsletter Subscribers", icon: Mail, path: "newsletter-subscribers" },

  { section: "System" },
  { label: "Users", icon: Users, path: "users" },
];


export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <img src={logo} alt="Wibi Admin" />
      </div>

      <nav>
        {nav.map((item, i) =>
          item.section ? (
            <div key={i} className={styles.section}>
              {item.section}
            </div>
          ) : (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === ""}
                className={({ isActive }) =>
                  isActive ? styles.active : styles.link
                }
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </NavLink>
          )
        )}
      </nav>
    </aside>
  );
}
