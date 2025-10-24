import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export async function createProduct(req, res) {
    if (!isAdmin(req)) {
        res.status(403).json({
            message: " you are not authorized to create Product"
        })
        return;

    }

    try {
        const productData = req.body;

        const product = new Product(productData)

        await product.save()
        res.status(200).json({
            message: "Product create Successfully",
            product: product
        })


    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: "Failed to create Product"
        })


    }


}

export async function getProducts(req, res) {
    try {
        const products = await Product.find();
        res.json(products)

    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: "Failed to retrive Product"

        })
    }
}

export async function deleteProduct(req, res) {
    if (!isAdmin(req)) {
        res.status(401).json({
            message: "you are not authorized to Delete a product"
        })
        return;
    }


    try {
        const productID = req.params.productID;

        await Product.deleteOne({
            productID: productID

        })
        res.json({
            message: "product Delete Successfully"
        })


    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "failed to delete product"
        })

    }


}
export async function updateProduct(req, res) {

    if (!isAdmin(req)) {
        res.status(401).json({
            message: "you are not authorized to Update a product"
        })
        return;
    }
    try {
        const productID = req.params.productID;
        const updateData = req.body;
        await Product.updateOne({productID : productID},
            updateData
        )
        res.json({
            message:"product update successfully"
        })

    } catch (err) {
         console.error(err);
        res.status(500).json({
            message: "failed to update product"
        })

    }
}
export async function getProductID(req,res){
    try{
        const productID = req.params.productID

        const product= await Product.findOne(
            {
                productID : productID
            }
        )
        if(product ==null){
            res.status(404).json({
                message:"product not found"
            })
        }else{
            res.json(product)

        }


    }catch(err){
        console.error(err);
        res.status(500).json({
            message: "failed to review  product by ID"
        })

    }

}

