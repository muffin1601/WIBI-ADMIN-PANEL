import Product from "../models/Product.js";
import Category from "../models/Category.js";
import CatalogueRequest from "../models/CatalogueRequest.js";
import NewsletterEmail from "../models/NewsletterEmail.js";


export const getDashboardStats = async (req, res) => {
  try {
    const [
      totalProducts,
      categories,
      catalogueLeads,
      newsletters,
      recentProducts
    ] = await Promise.all([
      Product.countDocuments({ status: "Active" }),
      Category.countDocuments({ status: "Active" }),
      CatalogueRequest.countDocuments(),
      NewsletterEmail.countDocuments(),
      Product.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("name status createdAt")
    ]);

    const mediaAgg = await Product.aggregate([
      {
        $project: {
          mediaCount: {
            $add: [
              { $size: { $ifNull: ["$data.images", []] } },
              { $size: { $ifNull: ["$data.videos", []] } },
              { $size: { $ifNull: ["$data.catalogues", []] } },
              { $size: { $ifNull: ["$data.documents", []] } },
              { $size: { $ifNull: ["$data.schematics", []] } }
            ]
          }
        }
      },
      { $group: { _id: null, total: { $sum: "$mediaCount" } } }
    ]);

    res.json({
      stats: {
        totalProducts,
        categories,
        mediaFiles: mediaAgg[0]?.total || 0,
        catalogueLeads,
        newsletters
      },
      recentProducts
    });
  } catch (err) {
    res.status(500).json({ message: "Dashboard fetch failed" });
  }
};
