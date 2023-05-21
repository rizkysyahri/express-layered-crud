// layer untuk handle request dan response
// biasanya juga handle validasi body

const express = require("express");
const prisma = require("../db");

const {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProductById,
  patchProductById,
  editProductById,
} = require("./product.service");

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await getAllProducts();

  res.send(products);
});

router.post("/", async (req, res) => {
  try {
    const newProductData = req.body;

    const product = await createProduct(newProductData);

    res.send({ data: product, message: "create product success" });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await getProductById(productId);

    res.send(product);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const producId = req.params.id;
    await deleteProductById(producId);

    res.send("product deleted");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//
// klo di put/update, kita ambil (productID) nya dan (productData) nya
//

router.put("/:id", async (req, res) => {
  const productId = req.params.id;
  const productData = req.body;

  if (
    !(
      productData.image &&
      productData.description &&
      productData.price &&
      productData.name
    )
  ) {
    return res.status(400).send("some fields are messing");
  }

  const product = await editProductById(productId, productData);

  res.send({ data: product, message: "update success" });
});

//
// put dan patch berbeda ingat!!
// klo put untuk menUpdate semua body nya by id
// klo patch hanya satu datanya saja misalkan ingin mengganti price nya saja
//

router.patch("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const productData = req.body;

    const product = await editProductById(productId, productData);

    res.send({ data: product, message: "change one worked" });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
