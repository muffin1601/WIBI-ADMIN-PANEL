import { useEffect, useState } from "react";
import { MoreVertical } from "lucide-react";
import axios from "../../api/axios";
import styles from "./ProductList.module.css";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 10;

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [openMenu, setOpenMenu] = useState(null);
const navigate = useNavigate();


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/products");
        setProducts(res.data.data || res.data); 
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Frontend search
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );


  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setPage(1);
  }, [search]);


  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <div className={styles.top}>
        <div>
          <h2>Manage Products</h2>
          <input
            className={styles.search}
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <button
          onClick={() => navigate("add")}
          className={styles.addBtn}
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Table Card */}
      <div className={styles.card}>
        <div className={styles.headerRow}>
          <span>Product</span>
          <span>Category</span>
          <span>Status</span>
          <span>Last Updated</span>
          <span>Actions</span>
        </div>

        {loading && <div className={styles.empty}>Loading products…</div>}

        {!loading && paginated.map(product => (
          <div className={styles.row} key={product._id}>
            {/* Product Info */}
            <div className={styles.productCell}>
              <img
                src={product.data.images?.[0] || "/placeholder.png"}
                alt={product.name}
                className={styles.thumb}
              />
              <div>
                <div className={styles.name}>{product.name}</div>
                <div className={styles.desc}>
                  {product.description?.slice(0, 80)}…
                </div>
              </div>
            </div>

            {/* Category */}
            <div className={styles.category}>
              {product.category}
            </div>

            {/* Status */}
            <div>
              <span
                className={`${styles.status} ${styles[product.status]}`}
              >
                {product.status}
              </span>
            </div>

            {/* Updated */}
            <div className={styles.date}>
              {new Date(product.updatedAt).toLocaleDateString()}
            </div>

            {/* Actions */}
            <div className={styles.actions}>
              <button
                className={styles.menuBtn}
                onClick={() =>
                  setOpenMenu(openMenu === product._id ? null : product._id)
                }
              >
                <MoreVertical size={18} />
              </button>

              {openMenu === product._id && (
                <div className={styles.menu}>
                  <button className={styles.menuItem}>
                    <Pencil size={16} />
                    <span>Edit</span>
                  </button>

                  <button className={`${styles.menuItem} ${styles.danger}`}>
                    <Trash2 size={16} />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {!loading && filtered.length === 0 && (
          <div className={styles.empty}>No products found</div>
        )}
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button
          disabled={page === 1}
          onClick={() => setPage(p => p - 1)}
        >
          ‹
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(p =>
            p === 1 ||
            p === totalPages ||
            Math.abs(p - page) <= 1
          )
          .reduce((acc, p, i, arr) => {
            if (i > 0 && p - arr[i - 1] > 1) {
              acc.push("...");
            }
            acc.push(p);
            return acc;
          }, [])
          .map((p, i) =>
            p === "..." ? (
              <span key={i} className={styles.dots}>…</span>
            ) : (
              <button
                key={p}
                className={page === p ? styles.active : ""}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            )
          )
        }

        <button
          disabled={page === totalPages}
          onClick={() => setPage(p => p + 1)}
        >
          ›
        </button>
      </div>

    </div>
  );
}
