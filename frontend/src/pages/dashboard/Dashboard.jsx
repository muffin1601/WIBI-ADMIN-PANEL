import { useEffect, useState } from "react";
import {
  Package,
  Layers,
  Image,
  Download,
  Mail,
  RefreshCcw,
  Plus,
  Folder,
  Users
} from "lucide-react";

import styles from "./Dashboard.module.css";
import axios from "../../api/axios";


export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/dashboard");
      setData(res.data);
      setError("");
    } catch (err) {
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) return <DashboardSkeleton />;
  if (error) return <ErrorState message={error} onRetry={loadDashboard} />;

  const { stats, recentProducts } = data;

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.headerTitle}>Dashboard</h1>
          <p className={styles.headerSub}>Overview of your product management system</p>
        </div>

        <button className={styles.refreshBtn} onClick={loadDashboard}>
          <RefreshCcw className={styles.refreshIcon} size={16} />
          <span className={styles.refreshText}>Refresh</span>
        </button>
      </div>

      <div className={styles.statsGrid}>
        <StatCard title="Active Products" value={stats.totalProducts} icon={Package} />
        <StatCard title="Categories" value={stats.categories} icon={Layers} />
        <StatCard title="Media Files" value={stats.mediaFiles} icon={Image} />
        <StatCard title="Catalogue Leads" value={stats.catalogueLeads} icon={Download} />
        <StatCard title="Newsletter Emails" value={stats.newsletters} icon={Mail} />
      </div>

      <div className={styles.mainGrid}>
        <RecentProducts products={recentProducts} />
        <QuickActions />
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon }) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statIcon}>
        <Icon className={styles.statSvg} size={20} />
      </div>
      <div className={styles.statContent}>
        <span className={styles.statTitle}>{title}</span>
        <strong className={styles.statValue}>{value}</strong>
      </div>
    </div>
  );
}

function RecentProducts({ products }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>Recent Products</h3>
      <p className={styles.sub}>Latest products added</p>

      {products.length === 0 ? (
        <div className={styles.empty}>No products found</div>
      ) : (
        <ul className={styles.list}>
          {products.map(product => (
            <li key={product._id} className={styles.listItem}>
              <div className={styles.productInfo}>
                <strong className={styles.productName}>{product.name}</strong>
                <span className={styles.date}>
                  Added {formatDate(product.createdAt)}
                </span>
              </div>
              <StatusBadge status={product.status} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function QuickActions() {
  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>Quick Actions</h3>
      <p className={styles.sub}>Common tasks and shortcuts</p>

      <div className={styles.actions}>
        <Action icon={Plus} title="Add Product" desc="Create a new product" />
        <Action icon={Folder} title="Manage Categories" desc="Edit product categories" />
        <Action icon={Users} title="View Leads" desc="Catalogue requests" />
        <Action icon={Package} title="View Products" desc="Browse all products" />
      </div>
    </div>
  );
}

function Action({ icon: Icon, title, desc }) {
  return (
    <div className={styles.action}>
      <Icon className={styles.actionIcon} size={18} />
      <div className={styles.actionContent}>
        <strong className={styles.actionTitle}>{title}</strong>
        <span className={styles.actionDesc}>{desc}</span>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  return (
    <span className={`${styles.badge} ${styles[status]}`}>
      {status}
    </span>
  );
}

function DashboardSkeleton() {
  return (
    <div className={styles.skeleton}>
      <span className={styles.skeletonText}>Loading dashboard…</span>
    </div>
  );
}

function ErrorState({ message, onRetry }) {
  return (
    <div className={styles.error}>
      <p className={styles.errorText}>{message}</p>
      <button className={styles.errorBtn} onClick={onRetry}>Retry</button>
    </div>
  );
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}
