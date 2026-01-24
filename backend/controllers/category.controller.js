import Category from "../models/Category.js";
import Subcategory from "../models/Subcategory.js";

export const getAllCategoriesWithSubcategories = async (req, res) => {
  try {
    const categories = await Category.find()
      .sort({ createdAt: -1 })
      .lean();

    const subcategories = await Subcategory.find()
      .populate("category_id", "name")
      .lean();

    const grouped = categories.map(cat => ({
      ...cat,
      subcategories: subcategories.filter(
        sub => String(sub.category_id?._id) === String(cat._id)
      )
    }));

    res.json({ success: true, data: grouped });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to load categories" });
  }
};
