import { Search, User } from "lucide-react";
import styles from "./Topbar.module.css";

export default function Topbar() {
  return (
    <header className={styles.topbar}>
      <div className={styles.breadcrumb}>
        Dashboard
      </div>

      <div className={styles.actions}>
        {/* <div className={styles.search}>
          <Search size={16} />
          <input placeholder="Search..." />
        </div> */}

        <div className={styles.profile}>
          <User size={18} />
          <span>Admin</span>
        </div>
      </div>
    </header>
  );
}
