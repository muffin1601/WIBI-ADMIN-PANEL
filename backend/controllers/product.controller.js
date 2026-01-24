import Product from "../models/Product.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products"
    });
  }
};
