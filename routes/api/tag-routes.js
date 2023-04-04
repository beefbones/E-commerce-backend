const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const dbTagData = await Tag.findAll({
      attributes: ["id", "tag_name"],
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
          through: ProductTag,
          as: "products",
        },
      ],
    });
    res.json(dbTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const dbTagData = await Tag.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
          through: ProductTag,
          as: "products",
        },
      ],
    });
    if (!dbTagData) {
      res.status(404).json({ message: "There was no tag found with this id." });
      return;
    }
    res.json(dbTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const dbTagData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.json(dbTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const [dbTagData] = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!dbTagData) {
      res.status(404).json({ message: "There was no tag found with this id." });
      return;
    }
    res.json(dbTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const dbTagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!dbTagData) {
      res.status(404).json({ message: "There was no tag found with this id." });
      return;
    }
    res.json(dbTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;