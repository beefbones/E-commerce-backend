const router = require("express").Router();
const { Category, Product } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll({
      attributes: ["id", "category_name"],
      include: [{ model: Product, attributes: ["id", "product_name", "price", "stock", "category_id"] }],
    });
    res.json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findOne({
      where: { id: req.params.id },
      include: [{ model: Product, attributes: ["id", "product_name", "price", "stock", "category_id"] }],
    });
    if (!category) {
      res.status(404).json({ message: "There was no category found for this id." });
      return;
    }
    res.json(category);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const category = await Category.create({ category_name: req.body.category_name });
    res.json(category);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const [numRowsAffected, [updatedCategory]] = await Category.update(
      { category_name: req.body.category_name },
      { where: { id: req.params.id }, returning: true }
    );
    if (numRowsAffected === 0) {
      res.status(404).json({ message: "There was no category found with this id." });
      return;
    }
    res.json(updatedCategory);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const numRowsAffected = await Category.destroy({ where: { id: req.params.id } });
    if (numRowsAffected === 0) {
      res.status(404).json({ message: "There was no category found with this id." });
      return;
    }
    res.json({ message: "The category has been deleted successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
