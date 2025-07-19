// lib/data.ts
export const categoryData: { [key: string]: any } = {
  'milk-tea': {
    name: 'Milk Tea Flavors',
    icon: '🧋',
    items: [
      { id: 'taro', name: 'Taro', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400' },
      { id: 'matcha', name: 'Matcha', image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400' },
      { id: 'jasmine', name: 'Jasmine Green', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400' },
      { id: 'thai', name: 'Thai', image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400' },
      { id: 'honeydew', name: 'Honeydew', image: 'https://images.unsplash.com/photo-1563379091051-5d5c0b632f89?w=400' }
    ]
  },
  'snack-chips': {
    name: 'Snack Chips',
    icon: '🍟',
    items: [
      { id: 'hot-cheetos', name: 'Hot Cheetos', image: 'https://i.imgur.com/k1h822W.jpeg' },
      { id: 'salt-vinegar', name: 'Salt & Vinegar Lays', image: 'https://i.imgur.com/uDnjRz3.jpeg' },
      { id: 'cool-ranch', name: 'Cool Ranch Doritos', image: 'https://i.imgur.com/2s3eY71.jpeg' },
      { id: 'jalapeno', name: 'Jalapeño Kettle Chips', image: 'https://i.imgur.com/HqP3N2N.jpeg' },
      { id: 'sour-cream', name: 'Sour Cream & Onion Ruffles', image: 'https://i.imgur.com/DsoNQqp.jpeg' }
    ]
  },
  'burgers': {
    name: 'Fast Food Burgers',
    icon: '🍔',
    items: [
      { id: 'mcdonalds', name: "McDonald's", image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400' },
      { id: 'wendys', name: "Wendy's", image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=400' },
      { id: 'burger-king', name: 'Burger King', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400' },
      { id: 'carls-jr', name: "Carl's Jr.", image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400' },
      { id: 'jack-in-box', name: 'Jack in the Box', image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400' }
    ]
  },
  'ice-cream': {
    name: 'Ice Cream Flavors',
    icon: '🍦',
    items: [
      { id: 'earl-grey', name: 'Earl Grey with Lemon Zest', image: 'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=400' },
      { id: 'honey-lavender', name: 'Salted Honey Lavender', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400' },
      { id: 'chocolate-olive', name: 'Dark Chocolate Olive Oil', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400' },
      { id: 'lemon-cream', name: 'Lemon Peel & Sweet Cream', image: 'https://images.unsplash.com/photo-1501443762994-82bd dace89a?w=400' },
      { id: 'affogato', name: 'Affogato Chip', image: 'https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?w=400' }
    ]
  },
  'celebrities': {
    name: 'Male Celebrities',
    icon: '⭐',
    items: [
      { id: 'timothee', name: 'Timothée Chalamet', image: 'https://i.imgur.com/3ZkY4gE.jpeg' },
      { id: 'henry', name: 'Henry Cavill', image: 'https://i.imgur.com/f9A5A9h.jpeg' },
      { id: 'ryan', name: 'Ryan Gosling', image: 'https://i.imgur.com/9C22i1x.jpeg' },
      { id: 'jason', name: 'Jason Momoa', image: 'https://i.imgur.com/eP3d1gq.jpeg' },
      { id: 'michael', name: 'Michael B. Jordan', image: 'https://i.imgur.com/8QZ5R4G.jpeg' }
    ]
  },
  'colors': {
    name: 'Colors',
    icon: '🎨',
    items: [
      { id: 'taupe', name: 'Taupe', image: 'https://via.placeholder.com/400x300/918373/ffffff?text=Taupe' },
      { id: 'lavender', name: 'Lavender', image: 'https://via.placeholder.com/400x300/b19cd9/ffffff?text=Lavender' },
      { id: 'slate-blue', name: 'Slate Blue', image: 'https://via.placeholder.com/400x300/6a5acd/ffffff?text=Slate+Blue' },
      { id: 'ivory', name: 'Ivory White', image: 'https://via.placeholder.com/400x300/fffff0/333333?text=Ivory+White' },
      { id: 'dusty-rose', name: 'Dusty Rose', image: 'https://via.placeholder.com/400x300/dcae96/ffffff?text=Dusty+Rose' }
    ]
  },
  'disney-princesses': {
    name: 'Disney Princesses',
    icon: '👸',
    items: [
      { id: 'belle', name: 'Belle', image: 'https://i.imgur.com/zT8xY7w.jpeg' },
      { id: 'mulan', name: 'Mulan', image: 'https://i.imgur.com/gS6Y3wO.jpeg' },
      { id: 'ariel', name: 'Ariel', image: 'https://i.imgur.com/9n0hS8v.jpeg' },
      { id: 'jasmine', name: 'Jasmine', image: 'https://i.imgur.com/mY7E8P5.jpeg' },
      { id: 'cinderella', name: 'Cinderella', image: 'https://i.imgur.com/T5p9w0a.jpeg' }
    ]
  },
  'dog-breeds': {
    name: 'Dog Breeds',
    icon: '🐕',
    items: [
      { id: 'golden-retriever', name: 'Golden Retriever', image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400' },
      { id: 'corgi', name: 'Corgi', image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400' },
      { id: 'dalmatian', name: 'Dalmatian', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400' },
      { id: 'maltese', name: 'Maltese', image: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400' },
      { id: 'german-shepherd', name: 'German Shepherd', image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400' }
    ]
  },
  'date-activities': {
    name: 'Date Activities',
    icon: '❤️',
    items: [
      { id: 'beach', name: 'Beach Day', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400' },
      { id: 'museum', name: 'Museum/Art Gallery', image: 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=400' },
      { id: 'farmers-market', name: 'Farmers Market & Cooking', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400' },
      { id: 'wine-tasting', name: 'Wine Tasting', image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400' },
      { id: 'hiking', name: 'Mountain Hiking', image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400' }
    ]
  },
  'weekend-activities': {
    name: 'Weekend Activities',
    icon: '🏠',
    items: [
      { id: 'binge-watching', name: 'Binge-watching a show', image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=400' },
      { id: 'baking', name: 'Baking something new', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400' },
      { id: 'social-media', name: 'Scrolling social media', image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=400' },
      { id: 'takeout-pajamas', name: 'Ordering takeout and not changing out of pajamas', image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400' },
      { id: 'crosswords', name: 'Doing crossword puzzles', image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400' }
    ]
  },
  'splurge-items': {
    name: 'Things to Splurge On',
    icon: '💰',
    items: [
      { id: 'technology', name: 'Technology/gadgets', image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400' },
      { id: 'fine-dining', name: 'Fine dining', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400' },
      { id: 'travel', name: 'Travel experiences', image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400' },
      { id: 'fashion', name: 'Fashion/clothes', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400' },
      { id: 'home-decor', name: 'Home decor', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400' }
    ]
  },
  'chores': {
    name: 'Most Hated Chores',
    icon: '🧹',
    items: [
      { id: 'dishes', name: 'Doing dishes', image: 'https://images.unsplash.com/photo-1599691133501-c67d15ae8e34?w=400' },
      { id: 'laundry', name: 'Laundry', image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400' },
      { id: 'vacuuming', name: 'Vacuuming', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400' },
      { id: 'bathroom', name: 'Cleaning the bathroom', image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400' }
    ]
  },
  'vacation-destinations': {
    name: 'Vacation Destinations',
    icon: '✈️',
    items: [
      { id: 'cape-town', name: 'Cape Town', image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400' },
      { id: 'reykjavik', name: 'Reykjavik', image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400' },
      { id: 'budapest', name: 'Budapest', image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=400' },
      { id: 'rio', name: 'Rio de Janeiro', image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400' },
      { id: 'bali', name: 'Bali', image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400' }
    ]
  },
  'satisfying-moments': {
    name: 'Satisfying Moments',
    icon: '😌',
    items: [
      { id: 'plastic-peel', name: 'Peeling the plastic off a new screen', image: 'https://via.placeholder.com/400x300/3498db/ffffff?text=Plastic+Peel' },
      { id: 'fresh-sheets', name: 'Getting into bed with fresh sheets', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400' },
      { id: 'shoes-off', name: 'Taking your shoes off after a long day', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400' },
      { id: 'green-lights', name: 'Hitting every green light', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400' },
      { id: 'remember-word', name: 'Finally remembering what you were trying to say', image: 'https://via.placeholder.com/400x300/e74c3c/ffffff?text=Eureka!' }
    ]
  },
  'fear-factor': {
    name: 'Fear Factor Challenges',
    icon: '😱',
    items: [
      { id: 'sheep-eyeball', name: 'Eating a Sheep\'s Eyeball', image: 'https://via.placeholder.com/400x300/8e44ad/ffffff?text=Sheep+Eyeball' },
      { id: 'coffin-snakes', name: 'Locked in a Coffin Full of Snakes', image: 'https://via.placeholder.com/400x300/27ae60/ffffff?text=Snake+Coffin' },
      { id: 'skyscraper-plank', name: 'Walking a Plank on a Skyscraper', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400' },
      { id: 'haunted-house', name: 'Walking Through a Haunted House by Yourself', image: 'https://via.placeholder.com/400x300/2c3e50/ffffff?text=Haunted+House' },
      { id: 'live-cockroaches', name: 'Eating Live Madagascar Hissing Cockroaches', image: 'https://via.placeholder.com/400x300/d35400/ffffff?text=Cockroaches' }
    ]
  },
  'annoying-songs': {
    name: 'Annoying Songs',
    icon: '🎵',
    items: [
      { id: 'let-it-go', name: 'Let It Go', image: 'https://via.placeholder.com/400x300/3498db/ffffff?text=Let+It+Go' },
      { id: 'baby-shark', name: 'Baby Shark', image: 'https://via.placeholder.com/400x300/f39c12/ffffff?text=Baby+Shark' },
      { id: 'friday', name: 'Friday', image: 'https://via.placeholder.com/400x300/e74c3c/ffffff?text=Friday' },
      { id: 'barbie-girl', name: 'Barbie Girl', image: 'https://via.placeholder.com/400x300/e91e63/ffffff?text=Barbie+Girl' },
      { id: 'who-let-dogs', name: 'Who Let the Dogs Out', image: 'https://via.placeholder.com/400x300/795548/ffffff?text=Who+Let+Dogs' }
    ]
  },
  'million-dollar-offers': {
    name: 'Million Dollar Offers',
    icon: '💸',
    items: [
      { id: 'no-favorite-food', name: 'Never eat your favorite food again', image: 'https://via.placeholder.com/400x300/ff5722/ffffff?text=No+Favorite+Food' },
      { id: 'forehead-tattoo', name: 'Get a forehead tattoo (you choose the design)', image: 'https://via.placeholder.com/400x300/9c27b0/ffffff?text=Forehead+Tattoo' },
      { id: 'camera-crew', name: 'Be followed by a camera crew 24/7 for 6 months', image: 'https://via.placeholder.com/400x300/607d8b/ffffff?text=Camera+Crew' },
      { id: 'annoying-stranger', name: 'Have an annoying stranger live with you for a year', image: 'https://via.placeholder.com/400x300/4caf50/ffffff?text=Annoying+Stranger' },
      { id: 'stranger-bank', name: 'Let a stranger control your bank account for a month', image: 'https://via.placeholder.com/400x300/f44336/ffffff?text=Bank+Control' }
    ]
  }
};