const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: ["id", "product_name", "price", "stock", "category_id"],
      include: [
        { model: Category, attributes: ["id", "category_name"] },
        { model: Tag, through: ProductTag, as: "tags" },
      ],
    });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// get one product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { id: req.params.id },
      include: [
        { model: Category, attributes: ["id", "category_name"] },
        { model: Tag, through: ProductTag, as: "tags" },
      ],
    });
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// create new product
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    if (req.body.tagIds && req.body.tagIds.length > 0) {
      const productTags = req.body.tagIds.map((tagId) => ({
        product_id: product.id,
        tag_id: tagId,
      }));
      await ProductTag.bulkCreate(productTags);
    }
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Bad request" });
  }
});

// update product
router.put("/:id", async (req, res) => {
  try {
    const [numRowsUpdated, productTags] = await Promise.all([
      Product.update(req.body, { where: { id: req.params.id } }),
      ProductTag.findAll({ where: { product_id: req.params.id } }),
    ]);
    const productTagIds = productTags.map(({ tag_id }) => tag_id);
    const newProductTags = req.body.tagIds
      ? req.body.tagIds
          .filter((tag_id) => !productTagIds.includes(tag_id))
          .map((tag_id) => ({
            product_id: req.params.id,
            tag_id: tag_id,
          }))
      : [];
    const productTagsToRemove = productTags
      .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
      .map(({ id }) => id);
    await Promise.all([
      ProductTag.destroy({ where: { id: productTagsToRemove } }),
      ProductTag.bulkCreate(newProductTags),
    ]);
    res.json({ message: "Product updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Bad request" });
  }
});

rrouter.delete("/:id", async (req, res) => {
  try {
    const deletedRowsCount = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (deletedRowsCount === 0) {
      return res
        .status(404)
        .json({ message: "There was no product found with this id." });
    }
    res.json(deletedRowsCount);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});


module.exports = router;