// berkomunikasi dengan database
// boleh pake ORM, boleh raw query

const prisma = require("../db");

const findProduct = async () => {
  const product = await prisma.product.findMany();

  return product;
};

const findProductById = async (id) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  return product;
};

const insertProduct = async (newProductData) => {
  const product = await prisma.product.create({
    data: {
      name: newProductData.name,
      price: newProductData.price,
      description: newProductData.description,
      image: newProductData.image,
    },
  });
  return product;
};

const deleteProduct = async (id) => {
   await prisma.product.delete({
    where: {
      id,
    },
  });

};

const editProduct = async (id, productData) => {
  const product = await prisma.product.update({
    where: {
      id,
    },

    data: {
      name: productData.name,
      price: productData.price,
      description: productData.description,
      image: productData.image,
    },
  });

  return product;
};

module.exports = {
  findProduct,
  findProductById,
  insertProduct,
  deleteProduct,
  editProduct
};
