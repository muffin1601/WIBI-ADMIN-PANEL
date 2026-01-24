import { useEffect, useState } from "react";
import axios from "../../api/axios";
import {
  ChevronDown,
  ChevronRight,
  MoreVertical,
  Plus,
  Boxes,
  Package
} from "lucide-react";
import styles from "./CategoryList.module.css";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    axios.get("/categories").then(res => {
      setCategories(res.data.data || []);
    });
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2>Categories</h2>
        <button className={styles.addBtn}>
          <Plus size={16} /> Add Category
        </button>
      </div>

      <div className={styles.card}>
        {/* Header row */}
        <div className={styles.headerRow}>
          <span></span>
          <span>Category</span>
          <span>Subcategories</span>
          <span>Products</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {categories.map(cat => {
          const subCount = cat.subcategories?.length || 0;
          const productCount = cat.productCount || 0;

          return (
            <div key={cat._id} className={styles.category}>
              {/* Category Row */}
              <div className={styles.row}>
                <button
                  className={styles.toggle}
                  onClick={() => setOpen(open === cat._id ? null : cat._id)}
                >
                  {open === cat._id ? <ChevronDown /> : <ChevronRight />}
                </button>

                <div className={styles.name}>
                  {cat.name}
                  <span className={styles.slug}>{cat.slug}</span>
                </div>

                <div className={styles.count}>
                  <Boxes size={14} />
                  {subCount}
                </div>

                <div className={styles.count}>
                  <Package size={14} />
                  {productCount}
                </div>

                <span className={`${styles.status} ${styles[cat.status]}`}>
                  {cat.status}
                </span>

                <div className={styles.actions}>
                  <MoreVertical size={18} />
                </div>
              </div>

              {/* Subcategories */}
              {open === cat._id && (
                <div className={styles.subList}>
                  {subCount === 0 && (
                    <div className={styles.empty}>No subcategories</div>
                  )}

                  {cat.subcategories?.map(sub => (
                    <div key={sub._id} className={styles.subRow}>
                      <div className={styles.subName}>
                        {sub.name}
                        <span className={styles.slug}>{sub.slug}</span>
                      </div>

                      <span
                        className={`${styles.status} ${styles[sub.status]}`}
                      >
                        {sub.status}
                      </span>

                      <MoreVertical size={16} />
                    </div>
                  ))}

                  <button className={styles.addSub}>
                    <Plus size={14} /> Add Subcategory
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
