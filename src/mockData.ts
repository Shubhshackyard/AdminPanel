import { Order, MenuItem, Category, ComboItem, InventoryItem, Customer, StaffMember } from './types';

export const initialOrders: Order[] = [
  {
    id: '#1048',
    numericId: 1048,
    time: '7:42 pm',
    customerName: 'Rehan K.',
    customerPhone: '+91 900 1234567',
    items: [
      { id: 'cb-1', name: 'Chicken Burger', quantity: 2, price: 160 },
      { id: 'cw-1', name: 'Spicy Wings (6 pcs)', quantity: 1, price: 152.5 }
    ],
    itemsSummary: '2x Chicken Burger, 1x Wings',
    type: 'dine_in',
    tableNumber: 'T-04',
    total: 472.50,
    status: 'preparing',
    paymentMethod: 'Cash',
    paid: true,
    createdAt: '2024-10-24T19:42:00'
  },
  {
    id: '#1047',
    numericId: 1047,
    time: '7:38 pm',
    customerName: 'Farhan S.',
    customerPhone: '+91 921 8976543',
    items: [
      { id: 'combo-1', name: 'Combo Meal (Burger + Fries + Drink)', quantity: 1, price: 200 }
    ],
    itemsSummary: '1x Combo Meal',
    type: 'takeaway',
    total: 200.00,
    status: 'ready',
    paymentMethod: 'UPI',
    paid: true,
    createdAt: '2024-10-24T19:38:00'
  },
  {
    id: '#1046',
    numericId: 1046,
    time: '7:31 pm',
    customerName: 'Zeeshan Q.',
    customerPhone: '+91 933 4567890',
    items: [
      { id: 'br-1', name: 'Chicken Masala Broast (1 kg)', quantity: 1, price: 550 }
    ],
    itemsSummary: '1x Chicken Masala Broast (1 kg)',
    type: 'delivery',
    deliveryPartner: 'Zomato',
    total: 550.00,
    status: 'preparing',
    paymentMethod: 'Online',
    paid: true,
    createdAt: '2024-10-24T19:31:00'
  },
  {
    id: '#1045',
    numericId: 1045,
    time: '7:25 pm',
    customerName: 'Imran T.',
    customerPhone: '+91 912 3456789',
    items: [
      { id: 'ff-1', name: 'Crispy Fish Fry (2 pcs)', quantity: 1, price: 110 },
      { id: 'ct-1', name: 'Chicken Twister Roll', quantity: 1, price: 100 }
    ],
    itemsSummary: '1x Fish Fry, 1x Chicken Twister',
    type: 'dine_in',
    tableNumber: 'T-01',
    total: 210.00,
    status: 'new',
    paymentMethod: 'Cash',
    paid: false,
    createdAt: '2024-10-24T19:25:00'
  },
  {
    id: '#1044',
    numericId: 1044,
    time: '7:12 pm',
    customerName: 'Amit P.',
    customerPhone: '+91 901 9876543',
    items: [
      { id: 'chb-1', name: 'Cheese Burger', quantity: 2, price: 85 },
      { id: 'pop-1', name: 'Chicken Popcorn (Box)', quantity: 1, price: 50 }
    ],
    itemsSummary: '2x Cheese Burger, 1x Popcorn',
    type: 'takeaway',
    total: 220.00,
    status: 'completed',
    paymentMethod: 'Card',
    paid: true,
    createdAt: '2024-10-24T19:12:00'
  },
  {
    id: '#1043',
    numericId: 1043,
    time: '6:55 pm',
    customerName: 'Wasim A.',
    customerPhone: '+91 945 6789012',
    items: [
      { id: 'cc-1', name: 'Chicken Crispy (3 pcs)', quantity: 1, price: 105 },
      { id: 'fr-1', name: 'Regular French Fries', quantity: 1, price: 30 }
    ],
    itemsSummary: '1x Chicken Crispy (3 pcs), 1x Fries',
    type: 'dine_in',
    tableNumber: 'T-06',
    total: 135.00,
    status: 'completed',
    paymentMethod: 'Cash',
    paid: true,
    createdAt: '2024-10-24T18:55:00'
  },
  {
    id: '#1042',
    numericId: 1042,
    time: '6:40 pm',
    customerName: 'Ravi K.',
    customerPhone: '+91 902 4455667',
    items: [
      { id: 'cb-1', name: 'Chicken Burger', quantity: 2, price: 60 },
      { id: 'fr-1', name: 'French Fries', quantity: 1, price: 30 }
    ],
    itemsSummary: '2x Chicken Burger, 1x French Fries',
    type: 'takeaway',
    total: 150.00,
    status: 'completed',
    paymentMethod: 'Cash',
    paid: true,
    createdAt: '2024-10-24T18:40:00'
  },
  {
    id: '#1041',
    numericId: 1041,
    time: '6:20 pm',
    customerName: 'Sameer N.',
    customerPhone: '+91 915 1122334',
    items: [
      { id: 'cs-1', name: 'Chicken Strips (4 pcs)', quantity: 1, price: 140 }
    ],
    itemsSummary: '1x Chicken Strips',
    type: 'delivery',
    deliveryPartner: 'Direct',
    total: 140.00,
    status: 'cancelled',
    paymentMethod: 'Cash',
    paid: false,
    createdAt: '2024-10-24T18:20:00'
  },
  {
    id: '#1040',
    numericId: 1040,
    time: '6:08 pm',
    customerName: 'Bilal M.',
    customerPhone: '+91 922 8899001',
    items: [
      { id: 'br-2', name: 'Family Broast Platter (8 pcs)', quantity: 1, price: 920 }
    ],
    itemsSummary: '1x Family Broast Platter (8 pcs)',
    type: 'dine_in',
    tableNumber: 'T-02',
    total: 920.00,
    status: 'completed',
    paymentMethod: 'Card',
    paid: true,
    createdAt: '2024-10-24T18:08:00'
  },
  {
    id: '#1039',
    numericId: 1039,
    time: '5:55 pm',
    customerName: 'Hassan R.',
    customerPhone: '+91 900 7766554',
    items: [
      { id: 'br-1', name: 'Chicken Masala Broast (Half kg)', quantity: 1, price: 300 },
      { id: 'dr-1', name: 'Cold Drink 200 ml', quantity: 2, price: 40 }
    ],
    itemsSummary: '1x Masala Broast (Half), 2x Cold Drinks',
    type: 'takeaway',
    total: 380.00,
    status: 'completed',
    paymentMethod: 'Cash',
    paid: true,
    createdAt: '2024-10-24T17:55:00'
  }
];

export const initialMenuItems: MenuItem[] = [
  {
    id: 'item-1',
    name: 'Chicken Crispy (3 pcs)',
    category: 'Broast & Chicken',
    price: 105,
    description: 'Golden fried crispy chicken pieces marinated in Arabian spices and garlic.',
    inStock: true,
    isPopular: true,
    code: 'CC-03',
    prepTimeMinutes: 12
  },
  {
    id: 'item-2',
    name: 'Chicken Masala Broast (1 kg)',
    category: 'Broast & Chicken',
    price: 550,
    description: 'Signature whole chicken broasted with hot aromatic Arabian masala spice crust.',
    inStock: true,
    isPopular: true,
    code: 'MB-100',
    prepTimeMinutes: 18
  },
  {
    id: 'item-3',
    name: 'Chicken Masala Broast (Half kg)',
    category: 'Broast & Chicken',
    price: 300,
    description: '4 pieces tender marinated chicken broast with signature hot masala crust.',
    inStock: true,
    isPopular: false,
    code: 'MB-050',
    prepTimeMinutes: 15
  },
  {
    id: 'item-4',
    name: 'Chicken Burger',
    category: 'Burgers & Sandwiches',
    price: 60,
    description: 'Crispy fried patty with iceberg lettuce, garlic mayo, and toasted sesame bun.',
    inStock: true,
    isPopular: true,
    code: 'BG-01',
    prepTimeMinutes: 8
  },
  {
    id: 'item-5',
    name: 'Cheese Burger',
    category: 'Burgers & Sandwiches',
    price: 85,
    description: 'Juicy chicken patty, melted cheddar slice, house pickle relish, and special sauce.',
    inStock: true,
    isPopular: false,
    code: 'BG-02',
    prepTimeMinutes: 8
  },
  {
    id: 'item-6',
    name: 'Chicken Twister Roll',
    category: 'Burgers & Sandwiches',
    price: 100,
    description: 'Tender chicken strips wrapped in warm tortilla with fresh salsa and garlic dip.',
    inStock: true,
    isPopular: false,
    code: 'TW-01',
    prepTimeMinutes: 7
  },
  {
    id: 'item-7',
    name: 'Crispy Fish Fry (2 pcs)',
    category: 'Seafood',
    price: 110,
    description: 'Batter fried fresh fish fillet served with tartar dip and lemon slice.',
    inStock: true,
    isPopular: false,
    code: 'FF-02',
    prepTimeMinutes: 10
  },
  {
    id: 'item-8',
    name: 'Spicy Chicken Wings (6 pcs)',
    category: 'Broast & Chicken',
    price: 152.5,
    description: 'Coated chicken wings tossed in fiery chili oil glaze with sesame sprinkles.',
    inStock: true,
    isPopular: true,
    code: 'CW-06',
    prepTimeMinutes: 10
  },
  {
    id: 'item-9',
    name: 'Chicken Strips (4 pcs)',
    category: 'Broast & Chicken',
    price: 140,
    description: 'Boneless tender chicken strips crumbed and fried to golden perfection.',
    inStock: true,
    isPopular: false,
    code: 'CS-04',
    prepTimeMinutes: 8
  },
  {
    id: 'item-10',
    name: 'Chicken Popcorn (Box)',
    category: 'Sides & Appetizers',
    price: 50,
    description: 'Bite-sized seasoned chicken nuggets in convenient portable box.',
    inStock: true,
    isPopular: false,
    code: 'CP-BX',
    prepTimeMinutes: 6
  },
  {
    id: 'item-11',
    name: 'French Fries (Regular)',
    category: 'Sides & Appetizers',
    price: 30,
    description: 'Crisp shoestring potatoes lightly salted with house seasoning.',
    inStock: true,
    isPopular: true,
    code: 'FF-RG',
    prepTimeMinutes: 5
  },
  {
    id: 'item-12',
    name: 'French Fries (Large / Masala)',
    category: 'Sides & Appetizers',
    price: 55,
    description: 'Large basket of hot crisp fries dusted with spicy chat masala powder.',
    inStock: true,
    isPopular: false,
    code: 'FF-LG',
    prepTimeMinutes: 5
  },
  {
    id: 'item-13',
    name: 'Cold Drink 200 ml',
    category: 'Beverages',
    price: 20,
    description: 'Chilled carbonated soft drink (Pepsi, 7Up, Mirinda, or Mountain Dew).',
    inStock: true,
    isPopular: true,
    code: 'DR-200',
    prepTimeMinutes: 1
  },
  {
    id: 'item-14',
    name: 'Cold Drink 500 ml',
    category: 'Beverages',
    price: 45,
    description: 'Chilled bottle of carbonated beverage.',
    inStock: true,
    isPopular: false,
    code: 'DR-500',
    prepTimeMinutes: 1
  },
  {
    id: 'item-15',
    name: 'Mineral Water (500 ml)',
    category: 'Beverages',
    price: 25,
    description: 'Pure drinking water bottle.',
    inStock: true,
    isPopular: false,
    code: 'WA-500',
    prepTimeMinutes: 1
  },
  {
    id: 'item-16',
    name: 'Garlic Mayo Sauce Dip',
    category: 'Sauces & Extras',
    price: 15,
    description: 'Signature thick whipped garlic paste and mayonnaise blend.',
    inStock: true,
    isPopular: false,
    code: 'SC-GM',
    prepTimeMinutes: 1
  }
];

export const initialCategories: Category[] = [
  {
    id: 'cat-1',
    name: 'Broast & Chicken',
    itemCount: 5,
    iconName: 'lunch_dining',
    description: 'Crispy broast chicken cuts, spicy masala pieces, and golden tender strips.'
  },
  {
    id: 'cat-2',
    name: 'Burgers & Sandwiches',
    itemCount: 3,
    iconName: 'fastfood',
    description: 'Handcrafted fast-food burgers, cheeseburgers, and chicken twister wraps.'
  },
  {
    id: 'cat-3',
    name: 'Combos & Deals',
    itemCount: 4,
    iconName: 'local_offer',
    description: 'Value combo meals packed with sides, fries, and drinks.'
  },
  {
    id: 'cat-4',
    name: 'Sides & Appetizers',
    itemCount: 3,
    iconName: 'set_meal',
    description: 'Shoestring french fries, chicken popcorn, and savory snacks.'
  },
  {
    id: 'cat-5',
    name: 'Seafood',
    itemCount: 1,
    iconName: 'phishing',
    description: 'Crispy battered fish fillets and seafood specialties.'
  },
  {
    id: 'cat-6',
    name: 'Beverages',
    itemCount: 3,
    iconName: 'local_drink',
    description: 'Ice-cold sodas, bottled waters, and refreshing drinks.'
  },
  {
    id: 'cat-7',
    name: 'Sauces & Extras',
    itemCount: 1,
    iconName: 'liquor',
    description: 'Garlic mayo dips, chili sauces, extra fresh buns, and dips.'
  }
];

export const initialCombos: ComboItem[] = [
  {
    id: 'combo-1',
    name: 'Combo Meal',
    originalPrice: 240,
    comboPrice: 200,
    itemsIncluded: ['1x Chicken Burger', '1x French Fries (Regular)', '1x Cold Drink 200ml', '1x Garlic Dip'],
    description: 'Classic solo feast featuring our best-selling crispy chicken burger and fries.',
    badge: 'Best Seller',
    inStock: true
  },
  {
    id: 'combo-2',
    name: 'Broast Duo Feast',
    originalPrice: 420,
    comboPrice: 350,
    itemsIncluded: ['4x Crispy Broast Chicken', '2x Fresh Buns', '1x Large Fries', '2x Cold Drinks 200ml', '2x Garlic Mayo'],
    description: 'Ideal for 2 people with crisp broast cuts and piping hot fries.',
    badge: 'Popular',
    inStock: true
  },
  {
    id: 'combo-3',
    name: 'Family Mega Broast Platter',
    originalPrice: 1650,
    comboPrice: 1420,
    itemsIncluded: ['1 kg Chicken Masala Broast', '6x Fresh Buns', '2x Large Fries', '1x 1.5L Beverage', '4x Signature Dips'],
    description: 'Highest ticket combo: Full 1 kg spiced broast banquet for the whole family.',
    badge: 'Family Deal',
    inStock: true
  },
  {
    id: 'combo-4',
    name: 'Student Lunch Crunch',
    originalPrice: 180,
    comboPrice: 150,
    itemsIncluded: ['1x Chicken Burger or Twister', '1x French Fries', '1x Cold Drink 200ml'],
    description: 'Affordable midday box popular with college and university students.',
    badge: 'Value Box',
    inStock: true
  }
];

export const initialInventory: InventoryItem[] = [
  {
    id: 'inv-1',
    name: 'Chicken Leg',
    currentStock: 6,
    unit: 'pcs left',
    threshold: 20,
    category: 'Meat',
    status: 'critical',
    costPerUnit: 42
  },
  {
    id: 'inv-2',
    name: 'Cold Drink 200 ml',
    currentStock: 12,
    unit: 'btls left',
    threshold: 30,
    category: 'Beverages',
    status: 'critical',
    costPerUnit: 14
  },
  {
    id: 'inv-3',
    name: 'Fresh Buns',
    currentStock: 18,
    unit: 'pcs left',
    threshold: 40,
    category: 'Bakery',
    status: 'critical',
    costPerUnit: 12
  },
  {
    id: 'inv-4',
    name: 'Cooking Oil (Broaster)',
    currentStock: 45,
    unit: 'liters',
    threshold: 25,
    category: 'Sauces & Spices',
    status: 'normal',
    costPerUnit: 350
  },
  {
    id: 'inv-5',
    name: 'Arabian Broast Spice Mix',
    currentStock: 14,
    unit: 'kg',
    threshold: 8,
    category: 'Sauces & Spices',
    status: 'normal',
    costPerUnit: 280
  },
  {
    id: 'inv-6',
    name: 'Potatoes for Fries',
    currentStock: 32,
    unit: 'kg',
    threshold: 20,
    category: 'Packaging',
    status: 'normal',
    costPerUnit: 25
  },
  {
    id: 'inv-7',
    name: 'Garlic Mayo Sauce Base',
    currentStock: 9,
    unit: 'liters',
    threshold: 15,
    category: 'Sauces & Spices',
    status: 'low',
    costPerUnit: 180
  },
  {
    id: 'inv-8',
    name: 'Takeaway Paper Boxes',
    currentStock: 160,
    unit: 'pcs',
    threshold: 100,
    category: 'Packaging',
    status: 'normal',
    costPerUnit: 6
  }
];

export const initialCustomers: Customer[] = [
  {
    id: 'cust-1',
    name: 'Rehan K.',
    phone: '+91 900 1234567',
    totalOrders: 34,
    totalSpent: 12450,
    lastOrderDate: 'Today, 7:42 pm',
    favoriteItem: 'Chicken Burger & Wings',
    address: 'Apartment 4B, Falcon Complex'
  },
  {
    id: 'cust-2',
    name: 'Farhan S.',
    phone: '+91 921 8976543',
    totalOrders: 19,
    totalSpent: 6200,
    lastOrderDate: 'Today, 7:38 pm',
    favoriteItem: 'Combo Meal',
    address: 'House 12, Street 4, Sector G-9'
  },
  {
    id: 'cust-3',
    name: 'Zeeshan Q.',
    phone: '+91 933 4567890',
    totalOrders: 42,
    totalSpent: 28900,
    lastOrderDate: 'Today, 7:31 pm',
    favoriteItem: 'Chicken Masala Broast (1 kg)',
    address: 'Villa 88, Bahria Phase 4'
  },
  {
    id: 'cust-4',
    name: 'Imran T.',
    phone: '+91 912 3456789',
    totalOrders: 11,
    totalSpent: 3100,
    lastOrderDate: 'Today, 7:25 pm',
    favoriteItem: 'Crispy Fish Fry',
    address: 'Block C, Commercial Area'
  },
  {
    id: 'cust-5',
    name: 'Amit P.',
    phone: '+91 901 9876543',
    totalOrders: 27,
    totalSpent: 8940,
    lastOrderDate: 'Today, 7:12 pm',
    favoriteItem: 'Cheese Burger',
    address: 'Flat 101, Crystal Arcade'
  }
];

export const initialStaff: StaffMember[] = [
  {
    id: 'st-1',
    name: 'Tariq Al-Mansoor',
    role: 'Admin / Head Cashier',
    shift: 'Evening Shift (03:00 PM - 11:30 PM)',
    terminalAssigned: 'Terminal 01',
    status: 'active',
    clockInTime: '02:50 PM'
  },
  {
    id: 'st-2',
    name: 'Chef Bilal Ahmed',
    role: 'Master Broaster & Fry Lead',
    shift: 'Evening Shift (02:00 PM - 11:00 PM)',
    terminalAssigned: 'KDS Kitchen Station',
    status: 'active',
    clockInTime: '01:55 PM'
  },
  {
    id: 'st-3',
    name: 'Aamir Sohail',
    role: 'Counter Expeditor & Packaging',
    shift: 'Evening Shift (04:00 PM - 12:00 AM)',
    terminalAssigned: 'Dispatch Counter',
    status: 'active',
    clockInTime: '03:58 PM'
  },
  {
    id: 'st-4',
    name: 'Zain Ul-Abideen',
    role: 'POS Cashier 02',
    shift: 'Night Shift (06:00 PM - 02:00 AM)',
    terminalAssigned: 'Terminal 02',
    status: 'break',
    clockInTime: '05:55 PM'
  }
];
