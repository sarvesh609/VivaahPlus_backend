const mongoose = require('mongoose');

// 1. Database Connection (Use your existing Connection String)
const mongoURI = "mongodb+srv://sarveshsssr2569_db_user:VivaahPlus_admin24@vivaahpluscluster.ylek4bi.mongodb.net/vivaah_plus_db?appName=VivaahPlusCluster"; 

// 2. Define the Schema (Must match your server.js)
const OutfitCatalog = mongoose.model('OutfitCatalog', new mongoose.Schema({
    id: Number,
    category: String,
    type: String,
    name: String,
    cost: Number,
    color: String,
    sizes: [String],
    img: String
}));

// 3. The Data from oufitDetails.txt
const outfitData = {
    bride: [
        { id: 101, type: 'Lehenga', name: 'Royal Zardosi Bridal Set', cost: 185000, color: 'Red', sizes: ['S', 'M', 'L', 'XL', 'XXL'], img: '../../images/outfits/lehenga_img1.jpg' },
        { id: 102, type: 'Lehenga', name: 'Mirror Work Pastel Dream', cost: 95000, color: 'Red', sizes: ['M', 'L', 'XL', 'XXL'], img: '../../images/outfits/lehenga_img2.jpg' },
        { id: 103, type: 'Lehenga', name: 'Heritage Velvet Maharani', cost: 254000, color: 'Red', sizes: ['S', 'M', 'L', 'XL'], img: '../../images/outfits/lehenga_img3.jpg' },
        { id: 104, type: 'Lehenga', name: 'Gota Patti Classic', cost: 125000, color: 'Pink', sizes: ['S', 'M', 'L', 'XL', 'XXL'], img: '../../images/outfits/lehenga_img4.jpg' },
        { id: 105, type: 'Lehenga', name: 'Deep Wine Sequin Art', cost: 190000, color: 'Red', sizes: ['M', 'XL', 'XXL'], img: '../../images/outfits/lehenga_img5.jpg' },
        { id: 106, type: 'Lehenga', name: 'Midnight Sparkle Set', cost: 145000, color: 'Pink', sizes: ['S', 'L', 'XL'], img: '../../images/outfits/lehenga_img6.jpg' },
        { id: 107, type: 'Lehenga', name: 'Golden Thread Luxury', cost: 210000, color: 'Pink', sizes: ['S', 'M', 'L', 'XL', 'XXL'], img: '../../images/outfits/lehenga_img7.jpg' },
        { id: 108, type: 'Lehenga', name: 'Rose Petal Silk Lehenga', cost: 88000, color: 'Pink', sizes: ['S', 'M', 'XXL'], img: '../../images/outfits/lehenga_img8.jpg' },
        { id: 109, type: 'Lehenga', name: 'Ruby Floral Embroidery', cost: 175000, color: 'Maroon', sizes: ['L', 'XL', 'XXL'], img: '../../images/outfits/lehenga_img9.jpg' },
        { id: 110, type: 'Lehenga', name: 'Champagne Shimmer Look', cost: 132000, color: 'Maroon', sizes: ['S', 'M', 'L'], img: '../../images/outfits/lehenga_img10.jpg' },
        { id: 111, type: 'Lehenga', name: 'Blush Pink Chikankari', cost: 115000, color: 'Red', sizes: ['M', 'L', 'XL', 'XXL'], img: '../../images/outfits/lehenga_img11.jpg' },
        { id: 112, type: 'Lehenga', name: 'Imperial Maroon Velvet', cost: 285000, color: 'Pink', sizes: ['S', 'M', 'L', 'XL', 'XXL'], img: '../../images/outfits/lehenga_img12.jpg' },
        { id: 113, type: 'Lehenga', name: 'Enchanted Mint Forest', cost: 160000, color: 'Pink', sizes: ['S', 'XL', 'XXL'], img: '../../images/outfits/lehenga_img13.jpg' },

        // --- GOWNS (8 Records) ---
        { id: 114, type: 'Gown', name: 'Ethereal Tulle Trail', cost: 120000, color: 'Ivory', sizes: ['S', 'M', 'L'], img: '../../images/outfits/gown_img1.jpg' },
        { id: 115, type: 'Gown', name: 'Vintage Lace Majesty', cost: 58000, color: 'Ivory', sizes: ['S', 'M', 'L', 'XL'], img: '../../images/outfits/gown_img2.jpg' },
        { id: 116, type: 'Gown', name: 'Crimson Night Gala', cost: 48500, color: 'Ivory', sizes: ['M', 'L', 'XL', 'XXL'], img: '../../images/outfits/gown_img3.jpg' },
        { id: 117, type: 'Gown', name: 'Sequin Mermaid Flare', cost: 75000, color: 'Ivory', sizes: ['S', 'M', 'XXL'], img: '../../images/outfits/gown_img4.jpg' },
        { id: 118, type: 'Gown', name: 'Pearlescent Satin Gown', cost: 92000, color: 'Ivory', sizes: ['L', 'XL', 'XXL'], img: '../../images/outfits/gown_img5.jpg' },
        { id: 119, type: 'Gown', name: 'Midnight Velvet Evening', cost: 64000, color: 'Pink', sizes: ['S', 'M', 'L'], img: '../../images/outfits/gown_img6.jpg' },
        { id: 120, type: 'Gown', name: 'Orchid Pink Ballgown', cost: 110000, color: 'Pink', sizes: ['S', 'M', 'L', 'XL', 'XXL'], img: '../../images/outfits/gown_img7.jpg' },
        { id: 121, type: 'Gown', name: 'Maroon Cascade Gown', cost: 89000, color: 'Pink', sizes: ['M', 'L', 'XXL'], img: '../../images/outfits/gown_img8.jpg' },

        // --- SAREES (8 Records) ---
        { id: 122, type: 'Saree', name: 'Kanjeevaram Silk Heritage', cost: 65000, color: 'Pink', sizes: [], img: '../../images/outfits/saree_img1.jpg' },
        { id: 123, type: 'Saree', name: 'Classic Red Banarasi', cost: 46500, color: 'Red', sizes: [], img: '../../images/outfits/saree_img2.jpg' },
        { id: 124, type: 'Saree', name: 'Maroon Patola Silk', cost: 52000, color: 'Maroon', sizes: [], img: '../../images/outfits/saree_img3.jpg' },
        { id: 125, type: 'Saree', name: 'Fuschia Organza Drap', cost: 38000, color: 'Pink', sizes: [], img: '../../images/outfits/saree_img4.jpg' },
        { id: 126, type: 'Saree', name: 'Hand-Painted Floral', cost: 44500, color: 'Pink', sizes: [], img: '../../images/outfits/saree_img5.jpg' },
        { id: 127, type: 'Saree', name: 'Golden Zari Chiffon', cost: 28000, color: 'Pink', sizes: [], img: '../../images/outfits/saree_img6.jpg' },
        { id: 128, type: 'Saree', name: 'Midnight Black Georgette', cost: 32000, color: 'Red', sizes: [], img: '../../images/outfits/saree_img7.jpg' },
        { id: 129, type: 'Saree', name: 'Royal Crimson Silk', cost: 59000, color: 'Maroon', sizes: [], img: '../../images/outfits/saree_img8.jpg' }
    ],
    groom: [
        // --- SHERWANIS (16 Records) ---
        { id: 201, type: 'Sherwani', name: 'Royal Ivory Zardosi Sherwani', cost: 85000, color: 'Blue', sizes: ['M', 'L', 'XL'], img: '../../images/outfits/sherwani_img1.jpg' },
        { id: 202, type: 'Sherwani', name: 'Midnight Black Velvet Bandhgala', cost: 62000, color: 'Blue', sizes: ['S', 'M', 'L'], img: '../../images/outfits/sherwani_img2.jpg' },
        { id: 203, type: 'Sherwani', name: 'Emerald Forest Silk Sherwani', cost: 74000, color: 'Blue', sizes: ['M', 'L', 'XL'], img: '../../images/outfits/sherwani_img3.jpg' },
        { id: 204, type: 'Sherwani', name: 'Crimson Heritage Achkan', cost: 95000, color: 'Blue', sizes: ['L', 'XL'], img: '../../images/outfits/sherwani_img4.jpg' },
        { id: 205, type: 'Sherwani', name: 'Pearl White Lucknowi Sherwani', cost: 58000, color: 'Blue', sizes: ['S', 'M', 'XL'], img: '../../images/outfits/sherwani_img5.jpg' },
        { id: 206, type: 'Sherwani', name: 'Jet Black Jodhpur Suit', cost: 48000, color: 'Blue', sizes: ['M', 'L'], img: '../../images/outfits/sherwani_img6.jpg' },
        { id: 207, type: 'Sherwani', name: 'Deep Ruby Embroidered Set', cost: 110000, color: 'Black', sizes: ['S', 'M', 'L', 'XL'], img: '../../images/outfits/sherwani_img7.jpg' },
        { id: 208, type: 'Sherwani', name: 'Mint Green Brocade Sherwani', cost: 82000, color: 'Black', sizes: ['L', 'XL'], img: '../../images/outfits/sherwani_img8.jpg' },
        { id: 209, type: 'Sherwani', name: 'Classic Cream Silk Bandhgala', cost: 45000, color: 'Black', sizes: ['M', 'L'], img: '../../images/outfits/sherwani_img9.jpg' },
        { id: 210, type: 'Sherwani', name: 'Obsidian Black Floral Sherwani', cost: 89000, color: 'Black', sizes: ['S', 'XL'], img: '../../images/outfits/sherwani_img10.jpg' },
        { id: 211, type: 'Sherwani', name: 'Scarlet Royal Groom Set', cost: 125000, color: 'White', sizes: ['M', 'L', 'XL'], img: '../../images/outfits/sherwani_img11.jpg' },
        { id: 212, type: 'Sherwani', name: 'Pine Green Mirror Work Sherwani', cost: 67000, color: 'White', sizes: ['S', 'M'], img: '../../images/outfits/sherwani_img12.jpg' },
        { id: 213, type: 'Sherwani', name: 'Snow White Self-Design Sherwani', cost: 72000, color: 'White', sizes: ['L', 'XL'], img: '../../images/outfits/sherwani_img13.jpg' },
        { id: 214, type: 'Sherwani', name: 'Coal Black Matte Sherwani', cost: 55000, color: 'White', sizes: ['S', 'M', 'L', 'XL'], img: '../../images/outfits/sherwani_img14.jpg' },
        { id: 215, type: 'Sherwani', name: 'Imperial Red Velvet Bandhgala', cost: 105000, color: 'White', sizes: ['M', 'XL'], img: '../../images/outfits/sherwani_img15.jpg' },
        { id: 216, type: 'Sherwani', name: 'Jade Green Traditional Sherwani', cost: 78000, color: 'White', sizes: ['M', 'L'], img: '../../images/outfits/sherwani_img16.jpg' },

        // --- SUITS (14 Records) ---
        { id: 217, type: 'Suit', name: 'Midnight Black Tuxedo', cost: 45000, color: 'Black', sizes: ['L', 'XL'], img: '../../images/outfits/suit_img1.jpg' },
        { id: 218, type: 'Suit', name: 'Modern White 3-Piece Suit', cost: 38000, color: 'Black', sizes: ['S', 'M', 'L'], img: '../../images/outfits/suit_img2.jpg' },
        { id: 219, type: 'Suit', name: 'Hunter Green Slim Fit Suit', cost: 42000, color: 'Black', sizes: ['M', 'L'], img: '../../images/outfits/suit_img3.jpg' },
        { id: 220, type: 'Suit', name: 'Bordeaux Red Dinner Jacket', cost: 52000, color: 'Black', sizes: ['S', 'M', 'L', 'XL'], img: '../../images/outfits/suit_img4.jpg' },
        { id: 221, type: 'Suit', name: 'Charcoal Black Double Breasted', cost: 49000, color: 'Blue', sizes: ['M', 'L', 'XL'], img: '../../images/outfits/suit_img5.jpg' },
        { id: 222, type: 'Suit', name: 'Ivory Peak Lapel Suit', cost: 55000, color: 'Blue', sizes: ['L', 'XL'], img: '../../images/outfits/suit_img6.jpg' },
        { id: 223, type: 'Suit', name: 'Emerald Green Velvet Blazer', cost: 32000, color: 'Blue', sizes: ['S', 'M'], img: '../../images/outfits/suit_img7.jpg' },
        { id: 224, type: 'Suit', name: 'Crimson Satin Trim Tuxedo', cost: 68000, color: 'Blue', sizes: ['M', 'L', 'XL'], img: '../../images/outfits/suit_img8.jpg' },
        { id: 225, type: 'Suit', name: 'Classic Black Formal Suit', cost: 28000, color: 'Blue', sizes: ['S', 'M', 'L', 'XL'], img: '../../images/outfits/suit_img9.jpg' },
        { id: 226, type: 'Suit', name: 'Linen White Summer Suit', cost: 31000, color: 'Maroon', sizes: ['M', 'L'], img: '../../images/outfits/suit_img10.jpg' },
        { id: 227, type: 'Suit', name: 'Olive Green Textured Suit', cost: 44000, color: 'White', sizes: ['L', 'XL'], img: '../../images/outfits/suit_img11.jpg' },
        { id: 228, type: 'Suit', name: 'Wine Red Italian Cut Suit', cost: 72000, color: 'White', sizes: ['S', 'M', 'L'], img: '../../images/outfits/suit_img12.jpg' },
        { id: 229, type: 'Suit', name: 'Onyx Black Gala Suit', cost: 60000, color: 'White', sizes: ['M', 'L', 'XL'], img: '../../images/outfits/suit_img13.jpg' },
        { id: 230, type: 'Suit', name: 'Pure White Wedding Suit', cost: 59000, color: 'White', sizes: ['S', 'M', 'L', 'XL'], img: '../../images/outfits/suit_img14.jpg' }
    ]
};

async function importData() {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB Atlas...");

        // Prepare data: add 'category' field to each item
        const brideOutfits = outfitData.bride.map(item => ({ ...item, category: 'bride' }));
        const groomOutfits = outfitData.groom.map(item => ({ ...item, category: 'groom' }));
        const totalOutfits = [...brideOutfits, ...groomOutfits];

        // Clear existing (optional) and Insert
        await OutfitCatalog.deleteMany({}); 
        await OutfitCatalog.insertMany(totalOutfits);

        console.log(`Successfully imported ${totalOutfits.length} outfits!`);
        process.exit();
    } catch (err) {
        console.error("Import failed:", err);
        process.exit(1);
    }
}

importData();