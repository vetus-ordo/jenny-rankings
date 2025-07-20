// lib/data.ts
export const categoryData: { [key: string]: any } = {
  'milk-tea': {
    name: 'Milk Tea Flavors',
    icon: '🧋',
    items: [
      { id: 'taro', name: 'Taro', image: '/taro-boba.png' },
      { id: 'matcha', name: 'Matcha', image: '/matcha-boba.jpg' },
      { id: 'jasmine', name: 'Jasmine Green', image: '/jasmine-green-boba.jpg' },
      { id: 'thai', name: 'Thai', image: '/thai-tea-boba.jpg' },
      { id: 'honeydew', name: 'Honeydew', image: '/honeydew-boba.jpg' }
    ]
  },
  'snack-chips': {
    name: 'Chips',
    icon: '🍟',
    items: [
      { id: 'hot-cheetos', name: 'Hot Cheetos', image: '/hot-cheetos.png' },
      { id: 'salt-vinegar', name: 'Salt & Vinegar Lays', image: '/svlays.png' },
      { id: 'cool-ranch', name: 'Cool Ranch Doritos', image: '/cldoritos.png' },
      { id: 'jalapeno', name: 'Jalapeño Kettle Chips', image: '/kettle.png' },
      { id: 'sour-cream', name: 'Sour Cream & Onion Ruffles', image: '/ruffles.png' }
    ]
  },
  'burgers': {
    name: 'Fast Food',
    icon: '🍔',
    items: [
      { id: 'mcdonalds', name: "McDonald's", image: '/mcd.png' },
      { id: 'wendys', name: "Wendy's", image: '/wendys.jpg' },
      { id: 'burger-king', name: 'Burger King', image: '/bk.png' },
      { id: 'carls-jr', name: "Carl's Jr.", image: '/cj.png' },
      { id: 'jack-in-box', name: 'Jack in the Box', image: '/jb.svg' }
    ]
  },
  'ice-cream': {
    name: 'Ice Cream Flavors',
    icon: '🍦',
    items: [
      { id: 'dark-mint', name: 'Dark Mint Stracciatella', image: '/mint.png' },
      { id: 'honey-lavender', name: 'Salted Honey Lavender', image: '/HL.png'},
      { id: 'chocolate-olive', name: 'Dark Chocolate Olive Oil', image: '/saltedchoc.png' },
      { id: 'lemon-cream', name: 'Lemon Peel & Sweet Cream', image: '/lemon.png' },
      { id: 'affogato', name: 'Affogato Chip', image: '/espresso.png' }
    ]
  },
  'celebrities': {
    name: 'Men',
    icon: '⭐',
    items: [
      { id: 'timothee', name: 'Timothée Chalamet', image: '/chalamet.jpg' },
      { id: 'henry', name: 'Henry Cavill', image: '/cavill.jpg' },
      { id: 'ryan', name: 'Ryan Gosling', image: '/gosling.jpg' },
      { id: 'jason', name: 'Jason Momoa', image: '/momoa.png' },
      { id: 'michael', name: 'Michael B. Jordan', image: '/mbj.png' }
    ]
  },
  'colors': {
    name: 'Colors',
    icon: '🎨',
    items: [
      { id: 'taupe', name: 'Taupe', image: '/taupe.png' },
      { id: 'lavender', name: 'Lavender', image: '/pale.png' },
      { id: 'slate-blue', name: 'Slate Blue', image: '/slate.png' },
      { id: 'ivory', name: 'Ivory White', image: '/ivory.png' },
      { id: 'dusty-rose', name: 'Dusty Rose', image: '/rose.png' }
    ]
  },
  'disney-princesses': {
    name: 'Disney Princesses',
    icon: '👸',
    items: [
      { id: 'belle', name: 'Belle', image: '/belle.png' },
      { id: 'mulan', name: 'Mulan', image: '/mulan.png' },
      { id: 'ariel', name: 'Ariel', image: '/ariel.png' },
      { id: 'jasmine', name: 'Jasmine', image: '/jasmine.png' },
      { id: 'cinderella', name: 'Cinderella', image: '/cinderella.png' }
    ]
  },
  'dog-breeds': {
    name: 'Dogs',
    icon: '🐕',
    items: [
      { id: 'golden-retriever', name: 'Golden Retriever', image: '/golden.jpg' },
      { id: 'corgi', name: 'Corgi', image: '/corgi.jpg' },
      { id: 'dalmatian', name: 'Dalmatian', image: '/dalm.jpg' },
      { id: 'maltese', name: 'Maltese', image: '/maltese.jpg' },
      { id: 'german-shepherd', name: 'German Shepherd', image: '/shepherd.jpg' }
    ]
  },
  'date-activities': {
    name: 'On Active Saturday',
    icon: '❤️',
    items: [
      { id: 'beach', name: 'Beach Day', image: '/beach.jpg' },
      { id: 'museum', name: 'Museum/Art Gallery', image: '/museum.jpg' },
      { id: 'farmers-market', name: 'Farmers Market & Cooking', image: '/farmers.jpg' },
      { id: 'wine-tasting', name: 'Wine Tasting', image: '/wine.jpg' },
      { id: 'hiking', name: 'Hiking', image: '/hiking.jpg' }
    ]
  },
  'weekend-activities': {
    name: 'On Lazy Sunday',
    icon: '🏠',
    items: [
      { id: 'binge-watching', name: 'Binge-watching a show', image: '/binge.jpg' },
      { id: 'baking', name: 'Baking something new', image: '/baking.jpg' },
      { id: 'social-media', name: 'Lounge and scroll', image: '/scrolling.jpg' },
      { id: 'absolutely-nothing', name: 'Afternoon delight', image: '/afternoon.jpg' },
      { id: 'crosswords', name: 'Doing crossword puzzles', image: '/crossword.jpg' }
    ]
  },
  'splurge-items': {
    name: 'Things to Splurge On',
    icon: '💰',
    items: [
      { id: 'technology', name: 'Technology/gadgets', image: '/tech.png' },
      { id: 'fine-dining', name: 'Fine dining', image: '/fine.jpg' },
      { id: 'travel', name: 'Travel experiences', image: '/airplane.jpg' },
      { id: 'fashion', name: 'Fashion/clothes', image: '/fashion.jpg' },
      { id: 'home-decor', name: 'Home decor', image: '/decor.jpg' }
    ]
  },
  'chores': {
    name: 'Most Hated Chores',
    icon: '🧹',
    items: [
      { id: 'dishes', name: 'Doing dishes', image: '/dishes.jpg' },
      { id: 'laundry', name: 'Laundry', image: '/laundry.jpg' },
      { id: 'vacuuming', name: 'Vacuuming', image: '/vacuum.png' },
      { id: 'bathroom', name: 'Cleaning the bathroom', image: '/bathroom.png' },
      { id: 'trash', name: 'Taking Out Trash', image: '/trash.jpg' },
    ]
  },
  'vacation-destinations': {
    name: 'Vacation Destinations',
    icon: '✈️',
    items: [
      { id: 'cape-town', name: 'Cape Town, South Africa', image: '/sa.jpg' },
      { id: 'reykjavik', name: 'Reykjavik, Iceland', image: '/iceland.jpg' },
      { id: 'budapest', name: 'Athens, Greece', image: '/Athens.jpg' },
      { id: 'rio', name: 'Rio de Janeiro, Brazil', image: '/brazil.jpg' },
      { id: 'bali', name: 'Bali, Indonesia', image: '/bali.jpg' }
    ]
  },
  'satisfying-moments': {
    name: 'Satisfying Moments',
    icon: '😌',
    items: [
      { id: 'plastic-peel', name: 'Peeling the plastic off a new screen', image: '/screen.png' },
      { id: 'fresh-sheets', name: 'Getting into bed with fresh sheets', image: '/sheets.jpg' },
      { id: 'shoes-off', name: 'Taking your shoes off after a long day', image: '/shoes.jpg' },
      { id: 'green-lights', name: 'Hitting every green light', image: '/lights.jpg' },
      { id: 'remember-word', name: 'Finally remembering what you were trying to say', image: '/light.jpg' }
    ]
  },
  'fear-factor': {
    name: 'Fear Factor Challenges',
    icon: '😱',
    items: [
      { id: 'sheep-eyeball', name: 'Eating a Sheep\'s Eyeball', image: '/eyeball.jpg' },
      { id: 'coffin-snakes', name: 'Locked in a Coffin Full of Snakes', image: '/snakes.jpg' },
      { id: 'skyscraper-plank', name: 'Walking a Plank on a Skyscraper', image: '/heights.jpg' },
      { id: 'haunted-house', name: 'Walking Through a Haunted House by Yourself', image: '/haunted.jpg' },
      { id: 'live-cockroaches', name: 'Eating Live Madagascar Hissing Cockroaches', image: '/roach.jpg' }
    ]
  },
  'annoying-songs': {
    name: 'Annoying Songs',
    icon: '🎵',
    items: [
      { id: 'let-it-go', name: 'Let It Go', image: '/frozen.jpg' },
      { id: 'baby-shark', name: 'Baby Shark', image: '/shark.png' },
      { id: 'friday', name: 'Friday', image: '/friday.png' },
      { id: 'barbie-girl', name: 'Barbie Girl', image: '/aqua.jpg' },
      { id: 'who-let-dogs', name: 'Who Let the Dogs Out', image: '/baha.jpg' }
    ]
  },
  'million-dollar-offers': {
    name: 'Million Dollar Offers',
    icon: '💸',
    items: [
      { id: 'no-favorite-food', name: 'Never eat your favorite food again', image: '/dduk.jpg' },
      { id: 'forehead-tattoo', name: 'Get a forehead tattoo', image: '/tattoo.jpg' },
      { id: 'camera-crew', name: 'Be followed by a camera crew 24/7 for 6 months', image: '/camera.jpg' },
      { id: 'annoying-stranger', name: 'Always have a prominent stain on your shirt', image: '/stain.jpg' },
      { id: 'stranger-bank', name: 'Gain 100 pounds for a year', image: '/fat.jpg' }
    ]
  }
};