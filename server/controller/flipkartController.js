const axios = require('axios');
const Product = require('../models/product');


// Fetch products from Flipkart and optionally store/update them in MongoDB
// const getProducts = async (__, res) => {
//     try {
//         const response = await axios.get(`${process.env.FLIPKART_BASE_URL}/listings`, {
//             headers: {
//                 'Authorization': `Bearer ${process.env.FLIPKART_API_KEY}`,
//                 'Content-Type': 'application/json'
//             }
//         });

//         const listings = response.data.listings;

//         // Optional: Update MongoDB with the latest listings
//         // This ensures your database is in sync with Flipkart
//         for (let listing of listings) {
//             await Product.findOneAndUpdate(
//                 { listingId: listing.listingId },
//                 {
//                     title: listing.title,
//                     price: listing.price,
//                     quantity: listing.quantity,
//                     sellerId: listing.sellerId
//                 },
//                 { upsert: true, new: true }
//             );
//         }

//         res.status(200).json({ listings });
//     } catch (error) {
//         console.error('Error fetching products from Flipkart:', error.message);
//         res.status(500).json({ error: 'Failed to fetch products from Flipkart.' });
//     }
// };

const getProducts = async (__, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Insert a new product into MongoDB
const insertProduct = async (req, res) => {
    try {
        const { listingId, title, price, quantity, sellerId } = req.body;

        // Create a new product
        const product = new Product({
            listingId,
            title,
            price,
            quantity,
            sellerId
        });

        // Save the product to MongoDB
        await product.save();

        res.status(201).json({ message: 'Product inserted successfully!', product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Fetch listings from Flipkart
const migrateListings = async (req, res) => {
    try {
        const response = await axios.get(`${process.env.FLIPKART_BASE_URL}`, {
            headers: {
                'Authorization': `Bearer ${process.env.FLIPKART_API_KEY}`
            }
        });

        const listings = response.data.listings;

        // Save listings to MongoDB
        for (let listing of listings) {
            const product = new Product({
                listingId: listing.listingId,
                title: listing.title,
                price: listing.price,
                quantity: listing.quantity,
                sellerId: listing.sellerId
            });

            await product.save();
        }

        res.status(200).json({ message: 'Listings migrated successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Unlist a product from Flipkart
const unlistProduct = async (req, res) => {
    const { id } = req.params;

    try {
        // API call to unlist from Flipkart
        // await axios.delete(`${process.env.FLIPKART_BASE_URL}/${listingId}`, {
        //     headers: {
        //         'Authorization': `Bearer ${process.env.FLIPKART_API_KEY}`
        //     }
        // });

        // Remove from MongoDB
        console.log(id);
        await Product.findByIdAndDelete({ _id: id })
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getProducts, insertProduct, migrateListings, unlistProduct };