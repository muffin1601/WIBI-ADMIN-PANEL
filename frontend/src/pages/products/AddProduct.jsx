import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Plus, Upload, X, GripVertical } from "lucide-react";
import styles from "./AddProduct.module.css";

const SECTION_LABELS = {
  models: "Product Models",
  videos: "Product Videos",
  pressure: "Performance Chart",
  catalogues: "Catalogues",
  dimensions: "Size & Measurements",
  schematics: "Installation Diagrams",
  certificates: "Certificates & Documents"
};

const slugify = text =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function AddProduct() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    name: "",
    slug: "",
    metaTitle: "",
    metaDescription: "",
    description: "",
    category: "",
    subcategory: "",
    images: [],
    features: [""],
    sections: Object.keys(SECTION_LABELS).reduce(
      (a, k) => ({ ...a, [k]: { enabled: false } }),
      {}
    )
  });

  /* ------------------ API ------------------ */
  useEffect(() => {
    axios.get("/categories").then(res => {
      setCategories(res.data.data || []);
    });
  }, []);

  useEffect(() => {
    const cat = categories.find(c => c._id === form.category);
    setSubcategories(cat?.subcategories || []);
  }, [form.category, categories]);

  /* ------------------ HANDLERS ------------------ */
  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleNameChange = e => {
    const name = e.target.value;
    setForm(f => ({
      ...f,
      name,
      slug: slugify(name),
      metaTitle: name
    }));
  };

  const addFeature = () =>
    setForm(f => ({ ...f, features: [...f.features, ""] }));

  const updateFeature = (i, val) => {
    const features = [...form.features];
    features[i] = val;
    setForm({ ...form, features });
  };

  const toggleSection = key =>
    setForm({
      ...form,
      sections: {
        ...form.sections,
        [key]: { enabled: !form.sections[key].enabled }
      }
    });

  /* ------------------ IMAGE UPLOAD ------------------ */
  const handleImages = e => {
    const files = Array.from(e.target.files);
    const previews = files.map(file => ({
      file,
      url: URL.createObjectURL(file)
    }));
    setForm(f => ({ ...f, images: [...f.images, ...previews] }));
  };

  const removeImage = i => {
    const images = [...form.images];
    images.splice(i, 1);
    setForm({ ...form, images });
  };

  const reorderImage = (from, to) => {
    const images = [...form.images];
    const [moved] = images.splice(from, 1);
    images.splice(to, 0, moved);
    setForm({ ...form, images });
  };

  /* ------------------ VALIDATION ------------------ */
  const validate = () => {
    const e = {};
    if (!form.name) e.name = "Product name is required";
    if (!form.category) e.category = "Category is required";
    if (!form.description) e.description = "Description is required";
    if (!form.images.length) e.images = "At least one image is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async status => {
    if (!validate()) return;
    await axios.post("/products", { ...form, status });
  };

  /* ------------------ JSX ------------------ */
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div>
          <h1>Add New Product</h1>
          <p>Create a new product for your catalog</p>
        </div>

        <div className={styles.actions}>
          <button onClick={() => submit("Draft")}>Save Draft</button>
          <button className={styles.primary} onClick={() => submit("Active")}>
            Publish
          </button>
        </div>
      </header>

      {/* PRODUCT DETAILS */}
      <section className={styles.card}>
        <h3>Product Details</h3>

        <label>Product Name *</label>
        <input value={form.name} onChange={handleNameChange} />
        {errors.name && <span className={styles.error}>{errors.name}</span>}

        <label>Slug</label>
        <input name="slug" value={form.slug} onChange={handleChange} />

        <div className={styles.grid2}>
          <div>
            <label>Category *</label>
            <select name="category" onChange={handleChange}>
              <option value="">Select</option>
              {categories.map(c => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <span className={styles.error}>{errors.category}</span>
            )}
          </div>

          <div>
            <label>Subcategory</label>
            <select name="subcategory" onChange={handleChange}>
              <option value="">Select</option>
              {subcategories.map(s => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <label>Description *</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
        />
        {errors.description && (
          <span className={styles.error}>{errors.description}</span>
        )}
      </section>

      {/* IMAGES */}
      <section className={styles.card}>
        <h3>Product Images *</h3>

        <label className={styles.upload}>
          <Upload />
          <p>Upload images</p>
          <input type="file" multiple hidden onChange={handleImages} />
        </label>

        {errors.images && (
          <span className={styles.error}>{errors.images}</span>
        )}

        <div className={styles.imageGrid}>
          {form.images.map((img, i) => (
            <div key={i} className={styles.imageItem}>
              <img src={img.url} />
              <button onClick={() => removeImage(i)}>
                <X size={14} />
              </button>
              {i > 0 && (
                <span
                  onClick={() => reorderImage(i, i - 1)}
                  className={styles.drag}
                >
                  <GripVertical size={14} />
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SEO */}
      <section className={styles.card}>
        <h3>SEO Settings</h3>

        <label>Meta Title</label>
        <input
          name="metaTitle"
          value={form.metaTitle}
          onChange={handleChange}
        />

        <label>Meta Description</label>
        <textarea
          name="metaDescription"
          value={form.metaDescription}
          onChange={handleChange}
        />
      </section>

      {/* FEATURES */}
      <section className={styles.card}>
        <h3>Product Features</h3>

        {form.features.map((f, i) => (
          <input
            key={i}
            value={f}
            onChange={e => updateFeature(i, e.target.value)}
          />
        ))}

        <button className={styles.linkBtn} onClick={addFeature}>
          <Plus size={14} /> Add Feature
        </button>
      </section>

      {/* OPTIONAL SECTIONS */}
      <section className={styles.card}>
        <h3>Additional Information</h3>

        {Object.keys(form.sections).map(k => (
          <div key={k} className={styles.toggleRow}>
            <span>{SECTION_LABELS[k]}</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={form.sections[k].enabled}
                onChange={() => toggleSection(k)}
              />
              <span />
            </label>
          </div>
        ))}
      </section>
    </div>
  );
}
