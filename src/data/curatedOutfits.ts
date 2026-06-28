export interface CuratedOutfit {
  id: string;
  title: string;
  category: string;
  gender: 'male' | 'female' | 'unisex';
  imageUrl: string;
  items: { name: string; type: string; price: number; color: string }[];
  accessories: { name: string; price: number }[];
  shoes: { name: string; price: number };
  totalPrice: number;
  budgetTier: 'budget' | 'mid-range' | 'premium' | 'luxury';
  events: string[];
  aesthetic: string;
  stylingTip: string;
  colors: string[];
}

export const CURATED_OUTFITS: CuratedOutfit[] = [
  {
    "id": "curated-1",
    "title": "Traditional Wedding Look 1",
    "category": "Traditional Wedding",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,traditional?random=2",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 400,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 250,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 50
      },
      {
        "name": "Secondary Accessory",
        "price": 100
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 850
    },
    "totalPrice": 1650,
    "budgetTier": "budget",
    "events": [
      "wedding",
      "formal"
    ],
    "aesthetic": "Indian Traditional",
    "stylingTip": "Style this Indian Traditional look with confidence for your next wedding event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-2",
    "title": "Traditional Wedding Look 2",
    "category": "Traditional Wedding",
    "gender": "female",
    "imageUrl": "https://loremflickr.com/600/800/fashion,traditional?random=3",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 450,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 200,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 50
      },
      {
        "name": "Secondary Accessory",
        "price": 0
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 600
    },
    "totalPrice": 1300,
    "budgetTier": "budget",
    "events": [
      "wedding",
      "formal"
    ],
    "aesthetic": "Indian Traditional",
    "stylingTip": "Style this Indian Traditional look with confidence for your next wedding event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-3",
    "title": "Traditional Wedding Look 3",
    "category": "Traditional Wedding",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,traditional?random=4",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 550,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 600,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 100
      },
      {
        "name": "Secondary Accessory",
        "price": 0
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 400
    },
    "totalPrice": 1650,
    "budgetTier": "budget",
    "events": [
      "wedding",
      "formal"
    ],
    "aesthetic": "Indian Traditional",
    "stylingTip": "Style this Indian Traditional look with confidence for your next wedding event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-4",
    "title": "Traditional Wedding Look 4",
    "category": "Traditional Wedding",
    "gender": "female",
    "imageUrl": "https://loremflickr.com/600/800/fashion,traditional?random=5",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 850,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 1050,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 150
      },
      {
        "name": "Secondary Accessory",
        "price": 250
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 800
    },
    "totalPrice": 3100,
    "budgetTier": "mid-range",
    "events": [
      "wedding",
      "formal"
    ],
    "aesthetic": "Indian Traditional",
    "stylingTip": "Style this Indian Traditional look with confidence for your next wedding event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-5",
    "title": "Traditional Wedding Look 5",
    "category": "Traditional Wedding",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,traditional?random=6",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 850,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 1300,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 250
      },
      {
        "name": "Secondary Accessory",
        "price": 150
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 2150
    },
    "totalPrice": 4700,
    "budgetTier": "mid-range",
    "events": [
      "wedding",
      "formal"
    ],
    "aesthetic": "Indian Traditional",
    "stylingTip": "Style this Indian Traditional look with confidence for your next wedding event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-6",
    "title": "Traditional Wedding Look 6",
    "category": "Traditional Wedding",
    "gender": "female",
    "imageUrl": "https://loremflickr.com/600/800/fashion,traditional?random=7",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 1050,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 1450,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 500
      },
      {
        "name": "Secondary Accessory",
        "price": 250
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 2150
    },
    "totalPrice": 5400,
    "budgetTier": "mid-range",
    "events": [
      "wedding",
      "formal"
    ],
    "aesthetic": "Indian Traditional",
    "stylingTip": "Style this Indian Traditional look with confidence for your next wedding event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-7",
    "title": "Traditional Wedding Look 7",
    "category": "Traditional Wedding",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,traditional?random=8",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 2850,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 2900,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 1350
      },
      {
        "name": "Secondary Accessory",
        "price": 600
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 1800
    },
    "totalPrice": 9500,
    "budgetTier": "premium",
    "events": [
      "wedding",
      "formal"
    ],
    "aesthetic": "Indian Traditional",
    "stylingTip": "Style this Indian Traditional look with confidence for your next wedding event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-8",
    "title": "Traditional Wedding Look 8",
    "category": "Traditional Wedding",
    "gender": "female",
    "imageUrl": "https://loremflickr.com/600/800/fashion,traditional?random=9",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 2300,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 3800,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 1500
      },
      {
        "name": "Secondary Accessory",
        "price": 550
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 5550
    },
    "totalPrice": 13700,
    "budgetTier": "premium",
    "events": [
      "wedding",
      "formal"
    ],
    "aesthetic": "Indian Traditional",
    "stylingTip": "Style this Indian Traditional look with confidence for your next wedding event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-9",
    "title": "Traditional Wedding Look 9",
    "category": "Traditional Wedding",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,traditional?random=10",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 3150,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 2100,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 950
      },
      {
        "name": "Secondary Accessory",
        "price": 450
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 2350
    },
    "totalPrice": 9000,
    "budgetTier": "premium",
    "events": [
      "wedding",
      "formal"
    ],
    "aesthetic": "Indian Traditional",
    "stylingTip": "Style this Indian Traditional look with confidence for your next wedding event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-10",
    "title": "Traditional Wedding Look 10",
    "category": "Traditional Wedding",
    "gender": "unisex",
    "imageUrl": "https://loremflickr.com/600/800/fashion,traditional?random=11",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 6800,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 9800,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 1250
      },
      {
        "name": "Secondary Accessory",
        "price": 1550
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 4150
    },
    "totalPrice": 23550,
    "budgetTier": "luxury",
    "events": [
      "wedding",
      "formal"
    ],
    "aesthetic": "Indian Traditional",
    "stylingTip": "Style this Indian Traditional look with confidence for your next wedding event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-11",
    "title": "Sangeet & Mehendi Look 1",
    "category": "Sangeet & Mehendi",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,sangeet?random=12",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 550,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 450,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 50
      },
      {
        "name": "Secondary Accessory",
        "price": 0
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 400
    },
    "totalPrice": 1450,
    "budgetTier": "budget",
    "events": [
      "sangeet",
      "mehendi"
    ],
    "aesthetic": "Sangeet Wear",
    "stylingTip": "Style this Sangeet Wear look with confidence for your next sangeet event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-12",
    "title": "Sangeet & Mehendi Look 2",
    "category": "Sangeet & Mehendi",
    "gender": "female",
    "imageUrl": "https://loremflickr.com/600/800/fashion,sangeet?random=13",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 300,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 300,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 100
      },
      {
        "name": "Secondary Accessory",
        "price": 0
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 650
    },
    "totalPrice": 1350,
    "budgetTier": "budget",
    "events": [
      "sangeet",
      "mehendi"
    ],
    "aesthetic": "Sangeet Wear",
    "stylingTip": "Style this Sangeet Wear look with confidence for your next sangeet event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-13",
    "title": "Sangeet & Mehendi Look 3",
    "category": "Sangeet & Mehendi",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,sangeet?random=14",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 400,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 350,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 100
      },
      {
        "name": "Secondary Accessory",
        "price": 50
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 200
    },
    "totalPrice": 1100,
    "budgetTier": "budget",
    "events": [
      "sangeet",
      "mehendi"
    ],
    "aesthetic": "Sangeet Wear",
    "stylingTip": "Style this Sangeet Wear look with confidence for your next sangeet event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-14",
    "title": "Sangeet & Mehendi Look 4",
    "category": "Sangeet & Mehendi",
    "gender": "female",
    "imageUrl": "https://loremflickr.com/600/800/fashion,sangeet?random=15",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 800,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 750,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 400
      },
      {
        "name": "Secondary Accessory",
        "price": 200
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 650
    },
    "totalPrice": 2800,
    "budgetTier": "mid-range",
    "events": [
      "sangeet",
      "mehendi"
    ],
    "aesthetic": "Sangeet Wear",
    "stylingTip": "Style this Sangeet Wear look with confidence for your next sangeet event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-15",
    "title": "Sangeet & Mehendi Look 5",
    "category": "Sangeet & Mehendi",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,sangeet?random=16",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 1150,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 1300,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 400
      },
      {
        "name": "Secondary Accessory",
        "price": 50
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 800
    },
    "totalPrice": 3700,
    "budgetTier": "mid-range",
    "events": [
      "sangeet",
      "mehendi"
    ],
    "aesthetic": "Sangeet Wear",
    "stylingTip": "Style this Sangeet Wear look with confidence for your next sangeet event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-16",
    "title": "Sangeet & Mehendi Look 6",
    "category": "Sangeet & Mehendi",
    "gender": "female",
    "imageUrl": "https://loremflickr.com/600/800/fashion,sangeet?random=17",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 1000,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 800,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 400
      },
      {
        "name": "Secondary Accessory",
        "price": 250
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 700
    },
    "totalPrice": 3150,
    "budgetTier": "mid-range",
    "events": [
      "sangeet",
      "mehendi"
    ],
    "aesthetic": "Sangeet Wear",
    "stylingTip": "Style this Sangeet Wear look with confidence for your next sangeet event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-17",
    "title": "Sangeet & Mehendi Look 7",
    "category": "Sangeet & Mehendi",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,sangeet?random=18",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 3100,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 4000,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 1050
      },
      {
        "name": "Secondary Accessory",
        "price": 700
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 3550
    },
    "totalPrice": 12400,
    "budgetTier": "premium",
    "events": [
      "sangeet",
      "mehendi"
    ],
    "aesthetic": "Sangeet Wear",
    "stylingTip": "Style this Sangeet Wear look with confidence for your next sangeet event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-18",
    "title": "Sangeet & Mehendi Look 8",
    "category": "Sangeet & Mehendi",
    "gender": "female",
    "imageUrl": "https://loremflickr.com/600/800/fashion,sangeet?random=19",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 2800,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 2050,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 1000
      },
      {
        "name": "Secondary Accessory",
        "price": 600
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 3850
    },
    "totalPrice": 10300,
    "budgetTier": "premium",
    "events": [
      "sangeet",
      "mehendi"
    ],
    "aesthetic": "Sangeet Wear",
    "stylingTip": "Style this Sangeet Wear look with confidence for your next sangeet event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-19",
    "title": "Sangeet & Mehendi Look 9",
    "category": "Sangeet & Mehendi",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,sangeet?random=20",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 3400,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 4050,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 700
      },
      {
        "name": "Secondary Accessory",
        "price": 650
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 3050
    },
    "totalPrice": 11850,
    "budgetTier": "premium",
    "events": [
      "sangeet",
      "mehendi"
    ],
    "aesthetic": "Sangeet Wear",
    "stylingTip": "Style this Sangeet Wear look with confidence for your next sangeet event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-20",
    "title": "Sangeet & Mehendi Look 10",
    "category": "Sangeet & Mehendi",
    "gender": "unisex",
    "imageUrl": "https://loremflickr.com/600/800/fashion,sangeet?random=21",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 8800,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 6350,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 2550
      },
      {
        "name": "Secondary Accessory",
        "price": 1900
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 5200
    },
    "totalPrice": 24800,
    "budgetTier": "luxury",
    "events": [
      "sangeet",
      "mehendi"
    ],
    "aesthetic": "Sangeet Wear",
    "stylingTip": "Style this Sangeet Wear look with confidence for your next sangeet event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-21",
    "title": "Festive & Diwali Look 1",
    "category": "Festive & Diwali",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,festive?random=22",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 350,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 300,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 50
      },
      {
        "name": "Secondary Accessory",
        "price": 100
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 550
    },
    "totalPrice": 1350,
    "budgetTier": "budget",
    "events": [
      "festival",
      "party"
    ],
    "aesthetic": "Indian Festive",
    "stylingTip": "Style this Indian Festive look with confidence for your next festival event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-22",
    "title": "Festive & Diwali Look 2",
    "category": "Festive & Diwali",
    "gender": "female",
    "imageUrl": "https://loremflickr.com/600/800/fashion,festive?random=23",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 300,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 350,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 50
      },
      {
        "name": "Secondary Accessory",
        "price": 0
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 650
    },
    "totalPrice": 1350,
    "budgetTier": "budget",
    "events": [
      "festival",
      "party"
    ],
    "aesthetic": "Indian Festive",
    "stylingTip": "Style this Indian Festive look with confidence for your next festival event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-23",
    "title": "Festive & Diwali Look 3",
    "category": "Festive & Diwali",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,festive?random=24",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 550,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 600,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 150
      },
      {
        "name": "Secondary Accessory",
        "price": 50
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 850
    },
    "totalPrice": 2200,
    "budgetTier": "budget",
    "events": [
      "festival",
      "party"
    ],
    "aesthetic": "Indian Festive",
    "stylingTip": "Style this Indian Festive look with confidence for your next festival event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-24",
    "title": "Festive & Diwali Look 4",
    "category": "Festive & Diwali",
    "gender": "female",
    "imageUrl": "https://loremflickr.com/600/800/fashion,festive?random=25",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 900,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 1150,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 150
      },
      {
        "name": "Secondary Accessory",
        "price": 250
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 1100
    },
    "totalPrice": 3550,
    "budgetTier": "mid-range",
    "events": [
      "festival",
      "party"
    ],
    "aesthetic": "Indian Festive",
    "stylingTip": "Style this Indian Festive look with confidence for your next festival event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-25",
    "title": "Festive & Diwali Look 5",
    "category": "Festive & Diwali",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,festive?random=26",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 1050,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 750,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 350
      },
      {
        "name": "Secondary Accessory",
        "price": 100
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 1050
    },
    "totalPrice": 3300,
    "budgetTier": "mid-range",
    "events": [
      "festival",
      "party"
    ],
    "aesthetic": "Indian Festive",
    "stylingTip": "Style this Indian Festive look with confidence for your next festival event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-26",
    "title": "Festive & Diwali Look 6",
    "category": "Festive & Diwali",
    "gender": "female",
    "imageUrl": "https://loremflickr.com/600/800/fashion,festive?random=27",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 1000,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 1100,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 550
      },
      {
        "name": "Secondary Accessory",
        "price": 150
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 1650
    },
    "totalPrice": 4450,
    "budgetTier": "mid-range",
    "events": [
      "festival",
      "party"
    ],
    "aesthetic": "Indian Festive",
    "stylingTip": "Style this Indian Festive look with confidence for your next festival event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-27",
    "title": "Festive & Diwali Look 7",
    "category": "Festive & Diwali",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,festive?random=28",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 2300,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 3850,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 1150
      },
      {
        "name": "Secondary Accessory",
        "price": 250
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 4650
    },
    "totalPrice": 12200,
    "budgetTier": "premium",
    "events": [
      "festival",
      "party"
    ],
    "aesthetic": "Indian Festive",
    "stylingTip": "Style this Indian Festive look with confidence for your next festival event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-28",
    "title": "Festive & Diwali Look 8",
    "category": "Festive & Diwali",
    "gender": "female",
    "imageUrl": "https://loremflickr.com/600/800/fashion,festive?random=29",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 2450,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 3350,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 600
      },
      {
        "name": "Secondary Accessory",
        "price": 250
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 3000
    },
    "totalPrice": 9650,
    "budgetTier": "premium",
    "events": [
      "festival",
      "party"
    ],
    "aesthetic": "Indian Festive",
    "stylingTip": "Style this Indian Festive look with confidence for your next festival event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-29",
    "title": "Festive & Diwali Look 9",
    "category": "Festive & Diwali",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,festive?random=30",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 2300,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 2600,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 1200
      },
      {
        "name": "Secondary Accessory",
        "price": 500
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 3800
    },
    "totalPrice": 10400,
    "budgetTier": "premium",
    "events": [
      "festival",
      "party"
    ],
    "aesthetic": "Indian Festive",
    "stylingTip": "Style this Indian Festive look with confidence for your next festival event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-30",
    "title": "Festive & Diwali Look 10",
    "category": "Festive & Diwali",
    "gender": "unisex",
    "imageUrl": "https://loremflickr.com/600/800/fashion,festive?random=31",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 7100,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 6200,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 3000
      },
      {
        "name": "Secondary Accessory",
        "price": 1000
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 8100
    },
    "totalPrice": 25400,
    "budgetTier": "luxury",
    "events": [
      "festival",
      "party"
    ],
    "aesthetic": "Indian Festive",
    "stylingTip": "Style this Indian Festive look with confidence for your next festival event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-31",
    "title": "Party & Clubwear Look 1",
    "category": "Party & Clubwear",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,party?random=32",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 400,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 250,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 100
      },
      {
        "name": "Secondary Accessory",
        "price": 100
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 250
    },
    "totalPrice": 1100,
    "budgetTier": "budget",
    "events": [
      "party",
      "club",
      "concert"
    ],
    "aesthetic": "Party Wear",
    "stylingTip": "Style this Party Wear look with confidence for your next party event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-32",
    "title": "Party & Clubwear Look 2",
    "category": "Party & Clubwear",
    "gender": "female",
    "imageUrl": "https://loremflickr.com/600/800/fashion,party?random=33",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 450,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 450,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 100
      },
      {
        "name": "Secondary Accessory",
        "price": 50
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 750
    },
    "totalPrice": 1800,
    "budgetTier": "budget",
    "events": [
      "party",
      "club",
      "concert"
    ],
    "aesthetic": "Party Wear",
    "stylingTip": "Style this Party Wear look with confidence for your next party event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-33",
    "title": "Party & Clubwear Look 3",
    "category": "Party & Clubwear",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,party?random=34",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 350,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 350,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 200
      },
      {
        "name": "Secondary Accessory",
        "price": 0
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 800
    },
    "totalPrice": 1700,
    "budgetTier": "budget",
    "events": [
      "party",
      "club",
      "concert"
    ],
    "aesthetic": "Party Wear",
    "stylingTip": "Style this Party Wear look with confidence for your next party event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-34",
    "title": "Party & Clubwear Look 4",
    "category": "Party & Clubwear",
    "gender": "female",
    "imageUrl": "https://loremflickr.com/600/800/fashion,party?random=35",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 1450,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 1200,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 400
      },
      {
        "name": "Secondary Accessory",
        "price": 200
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 1900
    },
    "totalPrice": 5150,
    "budgetTier": "mid-range",
    "events": [
      "party",
      "club",
      "concert"
    ],
    "aesthetic": "Party Wear",
    "stylingTip": "Style this Party Wear look with confidence for your next party event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-35",
    "title": "Party & Clubwear Look 5",
    "category": "Party & Clubwear",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,party?random=36",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 900,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 1600,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 550
      },
      {
        "name": "Secondary Accessory",
        "price": 100
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 1450
    },
    "totalPrice": 4600,
    "budgetTier": "mid-range",
    "events": [
      "party",
      "club",
      "concert"
    ],
    "aesthetic": "Party Wear",
    "stylingTip": "Style this Party Wear look with confidence for your next party event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-36",
    "title": "Party & Clubwear Look 6",
    "category": "Party & Clubwear",
    "gender": "female",
    "imageUrl": "https://loremflickr.com/600/800/fashion,party?random=37",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 1400,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 1250,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 550
      },
      {
        "name": "Secondary Accessory",
        "price": 250
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 850
    },
    "totalPrice": 4300,
    "budgetTier": "mid-range",
    "events": [
      "party",
      "club",
      "concert"
    ],
    "aesthetic": "Party Wear",
    "stylingTip": "Style this Party Wear look with confidence for your next party event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-37",
    "title": "Party & Clubwear Look 7",
    "category": "Party & Clubwear",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,party?random=38",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 3300,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 3500,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 450
      },
      {
        "name": "Secondary Accessory",
        "price": 450
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 4150
    },
    "totalPrice": 11850,
    "budgetTier": "premium",
    "events": [
      "party",
      "club",
      "concert"
    ],
    "aesthetic": "Party Wear",
    "stylingTip": "Style this Party Wear look with confidence for your next party event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-38",
    "title": "Party & Clubwear Look 8",
    "category": "Party & Clubwear",
    "gender": "female",
    "imageUrl": "https://loremflickr.com/600/800/fashion,party?random=39",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 3600,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 4050,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 1500
      },
      {
        "name": "Secondary Accessory",
        "price": 450
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 5500
    },
    "totalPrice": 15100,
    "budgetTier": "luxury",
    "events": [
      "party",
      "club",
      "concert"
    ],
    "aesthetic": "Party Wear",
    "stylingTip": "Style this Party Wear look with confidence for your next party event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-39",
    "title": "Party & Clubwear Look 9",
    "category": "Party & Clubwear",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,party?random=40",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 2150,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 2000,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 650
      },
      {
        "name": "Secondary Accessory",
        "price": 750
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 5400
    },
    "totalPrice": 10950,
    "budgetTier": "premium",
    "events": [
      "party",
      "club",
      "concert"
    ],
    "aesthetic": "Party Wear",
    "stylingTip": "Style this Party Wear look with confidence for your next party event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-40",
    "title": "Party & Clubwear Look 10",
    "category": "Party & Clubwear",
    "gender": "unisex",
    "imageUrl": "https://loremflickr.com/600/800/fashion,party?random=41",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 5200,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 5600,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 1950
      },
      {
        "name": "Secondary Accessory",
        "price": 1850
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 7350
    },
    "totalPrice": 21950,
    "budgetTier": "luxury",
    "events": [
      "party",
      "club",
      "concert"
    ],
    "aesthetic": "Party Wear",
    "stylingTip": "Style this Party Wear look with confidence for your next party event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-41",
    "title": "Office & Corporate Look 1",
    "category": "Office & Corporate",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,office?random=42",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 400,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 350,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 50
      },
      {
        "name": "Secondary Accessory",
        "price": 100
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 550
    },
    "totalPrice": 1450,
    "budgetTier": "budget",
    "events": [
      "office",
      "work"
    ],
    "aesthetic": "Scandinavian Minimal",
    "stylingTip": "Style this Scandinavian Minimal look with confidence for your next office event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-42",
    "title": "Office & Corporate Look 2",
    "category": "Office & Corporate",
    "gender": "female",
    "imageUrl": "https://loremflickr.com/600/800/fashion,office?random=43",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 500,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 450,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 50
      },
      {
        "name": "Secondary Accessory",
        "price": 50
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 500
    },
    "totalPrice": 1550,
    "budgetTier": "budget",
    "events": [
      "office",
      "work"
    ],
    "aesthetic": "Scandinavian Minimal",
    "stylingTip": "Style this Scandinavian Minimal look with confidence for your next office event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-43",
    "title": "Office & Corporate Look 3",
    "category": "Office & Corporate",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,office?random=44",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 400,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 350,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 100
      },
      {
        "name": "Secondary Accessory",
        "price": 50
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 750
    },
    "totalPrice": 1650,
    "budgetTier": "budget",
    "events": [
      "office",
      "work"
    ],
    "aesthetic": "Scandinavian Minimal",
    "stylingTip": "Style this Scandinavian Minimal look with confidence for your next office event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-44",
    "title": "Office & Corporate Look 4",
    "category": "Office & Corporate",
    "gender": "female",
    "imageUrl": "https://loremflickr.com/600/800/fashion,office?random=45",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 1150,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 750,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 550
      },
      {
        "name": "Secondary Accessory",
        "price": 150
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 1100
    },
    "totalPrice": 3700,
    "budgetTier": "mid-range",
    "events": [
      "office",
      "work"
    ],
    "aesthetic": "Scandinavian Minimal",
    "stylingTip": "Style this Scandinavian Minimal look with confidence for your next office event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-45",
    "title": "Office & Corporate Look 5",
    "category": "Office & Corporate",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,office?random=46",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 800,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 1600,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 250
      },
      {
        "name": "Secondary Accessory",
        "price": 150
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 850
    },
    "totalPrice": 3650,
    "budgetTier": "mid-range",
    "events": [
      "office",
      "work"
    ],
    "aesthetic": "Scandinavian Minimal",
    "stylingTip": "Style this Scandinavian Minimal look with confidence for your next office event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-46",
    "title": "Office & Corporate Look 6",
    "category": "Office & Corporate",
    "gender": "female",
    "imageUrl": "https://loremflickr.com/600/800/fashion,office?random=47",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 1300,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 1000,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 450
      },
      {
        "name": "Secondary Accessory",
        "price": 200
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 1450
    },
    "totalPrice": 4400,
    "budgetTier": "mid-range",
    "events": [
      "office",
      "work"
    ],
    "aesthetic": "Scandinavian Minimal",
    "stylingTip": "Style this Scandinavian Minimal look with confidence for your next office event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-47",
    "title": "Office & Corporate Look 7",
    "category": "Office & Corporate",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,office?random=48",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 2950,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 3750,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 450
      },
      {
        "name": "Secondary Accessory",
        "price": 750
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 1900
    },
    "totalPrice": 9800,
    "budgetTier": "premium",
    "events": [
      "office",
      "work"
    ],
    "aesthetic": "Scandinavian Minimal",
    "stylingTip": "Style this Scandinavian Minimal look with confidence for your next office event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-48",
    "title": "Office & Corporate Look 8",
    "category": "Office & Corporate",
    "gender": "female",
    "imageUrl": "https://loremflickr.com/600/800/fashion,office?random=49",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 2000,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 2250,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 750
      },
      {
        "name": "Secondary Accessory",
        "price": 750
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 3850
    },
    "totalPrice": 9600,
    "budgetTier": "premium",
    "events": [
      "office",
      "work"
    ],
    "aesthetic": "Scandinavian Minimal",
    "stylingTip": "Style this Scandinavian Minimal look with confidence for your next office event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-49",
    "title": "Office & Corporate Look 9",
    "category": "Office & Corporate",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,office?random=50",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 3500,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 2950,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 1550
      },
      {
        "name": "Secondary Accessory",
        "price": 600
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 4200
    },
    "totalPrice": 12800,
    "budgetTier": "premium",
    "events": [
      "office",
      "work"
    ],
    "aesthetic": "Scandinavian Minimal",
    "stylingTip": "Style this Scandinavian Minimal look with confidence for your next office event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-50",
    "title": "Office & Corporate Look 10",
    "category": "Office & Corporate",
    "gender": "unisex",
    "imageUrl": "https://loremflickr.com/600/800/fashion,office?random=51",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 7700,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 8000,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 2550
      },
      {
        "name": "Secondary Accessory",
        "price": 650
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 10000
    },
    "totalPrice": 28900,
    "budgetTier": "luxury",
    "events": [
      "office",
      "work"
    ],
    "aesthetic": "Scandinavian Minimal",
    "stylingTip": "Style this Scandinavian Minimal look with confidence for your next office event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-51",
    "title": "College & Casual Look 1",
    "category": "College & Casual",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,college?random=52",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 300,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 450,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 100
      },
      {
        "name": "Secondary Accessory",
        "price": 50
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 550
    },
    "totalPrice": 1450,
    "budgetTier": "budget",
    "events": [
      "casual",
      "college-fest"
    ],
    "aesthetic": "Streetwear",
    "stylingTip": "Style this Streetwear look with confidence for your next casual event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-52",
    "title": "College & Casual Look 2",
    "category": "College & Casual",
    "gender": "female",
    "imageUrl": "https://loremflickr.com/600/800/fashion,college?random=53",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 500,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 450,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 150
      },
      {
        "name": "Secondary Accessory",
        "price": 100
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 700
    },
    "totalPrice": 1900,
    "budgetTier": "budget",
    "events": [
      "casual",
      "college-fest"
    ],
    "aesthetic": "Streetwear",
    "stylingTip": "Style this Streetwear look with confidence for your next casual event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-53",
    "title": "College & Casual Look 3",
    "category": "College & Casual",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,college?random=54",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 300,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 600,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 150
      },
      {
        "name": "Secondary Accessory",
        "price": 0
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 850
    },
    "totalPrice": 1900,
    "budgetTier": "budget",
    "events": [
      "casual",
      "college-fest"
    ],
    "aesthetic": "Streetwear",
    "stylingTip": "Style this Streetwear look with confidence for your next casual event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-54",
    "title": "College & Casual Look 4",
    "category": "College & Casual",
    "gender": "female",
    "imageUrl": "https://loremflickr.com/600/800/fashion,college?random=55",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 800,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 850,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 450
      },
      {
        "name": "Secondary Accessory",
        "price": 250
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 1100
    },
    "totalPrice": 3450,
    "budgetTier": "mid-range",
    "events": [
      "casual",
      "college-fest"
    ],
    "aesthetic": "Streetwear",
    "stylingTip": "Style this Streetwear look with confidence for your next casual event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-55",
    "title": "College & Casual Look 5",
    "category": "College & Casual",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,college?random=56",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 1100,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 1000,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 200
      },
      {
        "name": "Secondary Accessory",
        "price": 100
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 1850
    },
    "totalPrice": 4250,
    "budgetTier": "mid-range",
    "events": [
      "casual",
      "college-fest"
    ],
    "aesthetic": "Streetwear",
    "stylingTip": "Style this Streetwear look with confidence for your next casual event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-56",
    "title": "College & Casual Look 6",
    "category": "College & Casual",
    "gender": "female",
    "imageUrl": "https://loremflickr.com/600/800/fashion,college?random=57",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 1250,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 1400,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 200
      },
      {
        "name": "Secondary Accessory",
        "price": 250
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 2000
    },
    "totalPrice": 5100,
    "budgetTier": "mid-range",
    "events": [
      "casual",
      "college-fest"
    ],
    "aesthetic": "Streetwear",
    "stylingTip": "Style this Streetwear look with confidence for your next casual event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-57",
    "title": "College & Casual Look 7",
    "category": "College & Casual",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,college?random=58",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 3000,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 2350,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 1250
      },
      {
        "name": "Secondary Accessory",
        "price": 700
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 1650
    },
    "totalPrice": 8950,
    "budgetTier": "premium",
    "events": [
      "casual",
      "college-fest"
    ],
    "aesthetic": "Streetwear",
    "stylingTip": "Style this Streetwear look with confidence for your next casual event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-58",
    "title": "College & Casual Look 8",
    "category": "College & Casual",
    "gender": "female",
    "imageUrl": "https://loremflickr.com/600/800/fashion,college?random=59",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 2850,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 2900,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 1150
      },
      {
        "name": "Secondary Accessory",
        "price": 650
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 4800
    },
    "totalPrice": 12350,
    "budgetTier": "premium",
    "events": [
      "casual",
      "college-fest"
    ],
    "aesthetic": "Streetwear",
    "stylingTip": "Style this Streetwear look with confidence for your next casual event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-59",
    "title": "College & Casual Look 9",
    "category": "College & Casual",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,college?random=60",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 2050,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 3500,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 1050
      },
      {
        "name": "Secondary Accessory",
        "price": 750
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 4200
    },
    "totalPrice": 11550,
    "budgetTier": "premium",
    "events": [
      "casual",
      "college-fest"
    ],
    "aesthetic": "Streetwear",
    "stylingTip": "Style this Streetwear look with confidence for your next casual event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-60",
    "title": "College & Casual Look 10",
    "category": "College & Casual",
    "gender": "unisex",
    "imageUrl": "https://loremflickr.com/600/800/fashion,college?random=61",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 6200,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 10650,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 3700
      },
      {
        "name": "Secondary Accessory",
        "price": 900
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 12250
    },
    "totalPrice": 33700,
    "budgetTier": "luxury",
    "events": [
      "casual",
      "college-fest"
    ],
    "aesthetic": "Streetwear",
    "stylingTip": "Style this Streetwear look with confidence for your next casual event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-61",
    "title": "Date Night Look 1",
    "category": "Date Night",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,date?random=62",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 300,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 500,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 150
      },
      {
        "name": "Secondary Accessory",
        "price": 100
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 650
    },
    "totalPrice": 1700,
    "budgetTier": "budget",
    "events": [
      "date-night",
      "luxury-dinner"
    ],
    "aesthetic": "Minimal Luxury",
    "stylingTip": "Style this Minimal Luxury look with confidence for your next date-night event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-62",
    "title": "Date Night Look 2",
    "category": "Date Night",
    "gender": "female",
    "imageUrl": "https://loremflickr.com/600/800/fashion,date?random=63",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 550,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 250,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 150
      },
      {
        "name": "Secondary Accessory",
        "price": 50
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 350
    },
    "totalPrice": 1350,
    "budgetTier": "budget",
    "events": [
      "date-night",
      "luxury-dinner"
    ],
    "aesthetic": "Minimal Luxury",
    "stylingTip": "Style this Minimal Luxury look with confidence for your next date-night event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-63",
    "title": "Date Night Look 3",
    "category": "Date Night",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,date?random=64",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 450,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 350,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 150
      },
      {
        "name": "Secondary Accessory",
        "price": 50
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 800
    },
    "totalPrice": 1800,
    "budgetTier": "budget",
    "events": [
      "date-night",
      "luxury-dinner"
    ],
    "aesthetic": "Minimal Luxury",
    "stylingTip": "Style this Minimal Luxury look with confidence for your next date-night event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-64",
    "title": "Date Night Look 4",
    "category": "Date Night",
    "gender": "female",
    "imageUrl": "https://loremflickr.com/600/800/fashion,date?random=65",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 1400,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 950,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 550
      },
      {
        "name": "Secondary Accessory",
        "price": 100
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 1700
    },
    "totalPrice": 4700,
    "budgetTier": "mid-range",
    "events": [
      "date-night",
      "luxury-dinner"
    ],
    "aesthetic": "Minimal Luxury",
    "stylingTip": "Style this Minimal Luxury look with confidence for your next date-night event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-65",
    "title": "Date Night Look 5",
    "category": "Date Night",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,date?random=66",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 800,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 1300,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 350
      },
      {
        "name": "Secondary Accessory",
        "price": 150
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 850
    },
    "totalPrice": 3450,
    "budgetTier": "mid-range",
    "events": [
      "date-night",
      "luxury-dinner"
    ],
    "aesthetic": "Minimal Luxury",
    "stylingTip": "Style this Minimal Luxury look with confidence for your next date-night event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-66",
    "title": "Date Night Look 6",
    "category": "Date Night",
    "gender": "female",
    "imageUrl": "https://loremflickr.com/600/800/fashion,date?random=67",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 950,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 750,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 550
      },
      {
        "name": "Secondary Accessory",
        "price": 250
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 2000
    },
    "totalPrice": 4500,
    "budgetTier": "mid-range",
    "events": [
      "date-night",
      "luxury-dinner"
    ],
    "aesthetic": "Minimal Luxury",
    "stylingTip": "Style this Minimal Luxury look with confidence for your next date-night event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-67",
    "title": "Date Night Look 7",
    "category": "Date Night",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,date?random=68",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 2800,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 2250,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 1500
      },
      {
        "name": "Secondary Accessory",
        "price": 350
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 4850
    },
    "totalPrice": 11750,
    "budgetTier": "premium",
    "events": [
      "date-night",
      "luxury-dinner"
    ],
    "aesthetic": "Minimal Luxury",
    "stylingTip": "Style this Minimal Luxury look with confidence for your next date-night event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-68",
    "title": "Date Night Look 8",
    "category": "Date Night",
    "gender": "female",
    "imageUrl": "https://loremflickr.com/600/800/fashion,date?random=69",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 3050,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 3600,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 600
      },
      {
        "name": "Secondary Accessory",
        "price": 400
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 5700
    },
    "totalPrice": 13350,
    "budgetTier": "premium",
    "events": [
      "date-night",
      "luxury-dinner"
    ],
    "aesthetic": "Minimal Luxury",
    "stylingTip": "Style this Minimal Luxury look with confidence for your next date-night event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-69",
    "title": "Date Night Look 9",
    "category": "Date Night",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,date?random=70",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 2950,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 2650,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 1050
      },
      {
        "name": "Secondary Accessory",
        "price": 750
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 2900
    },
    "totalPrice": 10300,
    "budgetTier": "premium",
    "events": [
      "date-night",
      "luxury-dinner"
    ],
    "aesthetic": "Minimal Luxury",
    "stylingTip": "Style this Minimal Luxury look with confidence for your next date-night event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-70",
    "title": "Date Night Look 10",
    "category": "Date Night",
    "gender": "unisex",
    "imageUrl": "https://loremflickr.com/600/800/fashion,date?random=71",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 6450,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 7600,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 1600
      },
      {
        "name": "Secondary Accessory",
        "price": 1050
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 9950
    },
    "totalPrice": 26650,
    "budgetTier": "luxury",
    "events": [
      "date-night",
      "luxury-dinner"
    ],
    "aesthetic": "Minimal Luxury",
    "stylingTip": "Style this Minimal Luxury look with confidence for your next date-night event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-71",
    "title": "Brunch & Weekend Look 1",
    "category": "Brunch & Weekend",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,brunch?random=72",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 450,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 500,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 100
      },
      {
        "name": "Secondary Accessory",
        "price": 0
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 300
    },
    "totalPrice": 1350,
    "budgetTier": "budget",
    "events": [
      "brunch",
      "travel"
    ],
    "aesthetic": "Clean Girl",
    "stylingTip": "Style this Clean Girl look with confidence for your next brunch event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-72",
    "title": "Brunch & Weekend Look 2",
    "category": "Brunch & Weekend",
    "gender": "female",
    "imageUrl": "https://loremflickr.com/600/800/fashion,brunch?random=73",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 250,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 600,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 150
      },
      {
        "name": "Secondary Accessory",
        "price": 50
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 350
    },
    "totalPrice": 1400,
    "budgetTier": "budget",
    "events": [
      "brunch",
      "travel"
    ],
    "aesthetic": "Clean Girl",
    "stylingTip": "Style this Clean Girl look with confidence for your next brunch event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-73",
    "title": "Brunch & Weekend Look 3",
    "category": "Brunch & Weekend",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,brunch?random=74",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 400,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 550,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 50
      },
      {
        "name": "Secondary Accessory",
        "price": 50
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 600
    },
    "totalPrice": 1650,
    "budgetTier": "budget",
    "events": [
      "brunch",
      "travel"
    ],
    "aesthetic": "Clean Girl",
    "stylingTip": "Style this Clean Girl look with confidence for your next brunch event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-74",
    "title": "Brunch & Weekend Look 4",
    "category": "Brunch & Weekend",
    "gender": "female",
    "imageUrl": "https://loremflickr.com/600/800/fashion,brunch?random=75",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 900,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 1150,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 450
      },
      {
        "name": "Secondary Accessory",
        "price": 200
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 1350
    },
    "totalPrice": 4050,
    "budgetTier": "mid-range",
    "events": [
      "brunch",
      "travel"
    ],
    "aesthetic": "Clean Girl",
    "stylingTip": "Style this Clean Girl look with confidence for your next brunch event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-75",
    "title": "Brunch & Weekend Look 5",
    "category": "Brunch & Weekend",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,brunch?random=76",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 900,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 1500,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 250
      },
      {
        "name": "Secondary Accessory",
        "price": 200
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 950
    },
    "totalPrice": 3800,
    "budgetTier": "mid-range",
    "events": [
      "brunch",
      "travel"
    ],
    "aesthetic": "Clean Girl",
    "stylingTip": "Style this Clean Girl look with confidence for your next brunch event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-76",
    "title": "Brunch & Weekend Look 6",
    "category": "Brunch & Weekend",
    "gender": "female",
    "imageUrl": "https://loremflickr.com/600/800/fashion,brunch?random=77",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 1300,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 700,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 450
      },
      {
        "name": "Secondary Accessory",
        "price": 150
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 1300
    },
    "totalPrice": 3900,
    "budgetTier": "mid-range",
    "events": [
      "brunch",
      "travel"
    ],
    "aesthetic": "Clean Girl",
    "stylingTip": "Style this Clean Girl look with confidence for your next brunch event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-77",
    "title": "Brunch & Weekend Look 7",
    "category": "Brunch & Weekend",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,brunch?random=78",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 3000,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 3900,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 400
      },
      {
        "name": "Secondary Accessory",
        "price": 200
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 2850
    },
    "totalPrice": 10350,
    "budgetTier": "premium",
    "events": [
      "brunch",
      "travel"
    ],
    "aesthetic": "Clean Girl",
    "stylingTip": "Style this Clean Girl look with confidence for your next brunch event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-78",
    "title": "Brunch & Weekend Look 8",
    "category": "Brunch & Weekend",
    "gender": "female",
    "imageUrl": "https://loremflickr.com/600/800/fashion,brunch?random=79",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 2200,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 3250,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 1200
      },
      {
        "name": "Secondary Accessory",
        "price": 650
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 2350
    },
    "totalPrice": 9650,
    "budgetTier": "premium",
    "events": [
      "brunch",
      "travel"
    ],
    "aesthetic": "Clean Girl",
    "stylingTip": "Style this Clean Girl look with confidence for your next brunch event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-79",
    "title": "Brunch & Weekend Look 9",
    "category": "Brunch & Weekend",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,brunch?random=80",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 2450,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 1850,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 850
      },
      {
        "name": "Secondary Accessory",
        "price": 650
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 4700
    },
    "totalPrice": 10500,
    "budgetTier": "premium",
    "events": [
      "brunch",
      "travel"
    ],
    "aesthetic": "Clean Girl",
    "stylingTip": "Style this Clean Girl look with confidence for your next brunch event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-80",
    "title": "Brunch & Weekend Look 10",
    "category": "Brunch & Weekend",
    "gender": "unisex",
    "imageUrl": "https://loremflickr.com/600/800/fashion,brunch?random=81",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 6900,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 9000,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 1450
      },
      {
        "name": "Secondary Accessory",
        "price": 1300
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 13950
    },
    "totalPrice": 32600,
    "budgetTier": "luxury",
    "events": [
      "brunch",
      "travel"
    ],
    "aesthetic": "Clean Girl",
    "stylingTip": "Style this Clean Girl look with confidence for your next brunch event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-81",
    "title": "Korean & Minimal Look 1",
    "category": "Korean & Minimal",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,korean?random=82",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 550,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 400,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 150
      },
      {
        "name": "Secondary Accessory",
        "price": 50
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 550
    },
    "totalPrice": 1700,
    "budgetTier": "budget",
    "events": [
      "casual",
      "date-night"
    ],
    "aesthetic": "Korean Casual",
    "stylingTip": "Style this Korean Casual look with confidence for your next casual event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-82",
    "title": "Korean & Minimal Look 2",
    "category": "Korean & Minimal",
    "gender": "female",
    "imageUrl": "https://loremflickr.com/600/800/fashion,korean?random=83",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 550,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 650,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 100
      },
      {
        "name": "Secondary Accessory",
        "price": 50
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 500
    },
    "totalPrice": 1850,
    "budgetTier": "budget",
    "events": [
      "casual",
      "date-night"
    ],
    "aesthetic": "Korean Casual",
    "stylingTip": "Style this Korean Casual look with confidence for your next casual event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-83",
    "title": "Korean & Minimal Look 3",
    "category": "Korean & Minimal",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,korean?random=84",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 450,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 250,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 150
      },
      {
        "name": "Secondary Accessory",
        "price": 100
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 250
    },
    "totalPrice": 1200,
    "budgetTier": "budget",
    "events": [
      "casual",
      "date-night"
    ],
    "aesthetic": "Korean Casual",
    "stylingTip": "Style this Korean Casual look with confidence for your next casual event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-84",
    "title": "Korean & Minimal Look 4",
    "category": "Korean & Minimal",
    "gender": "female",
    "imageUrl": "https://loremflickr.com/600/800/fashion,korean?random=85",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 1350,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 700,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 450
      },
      {
        "name": "Secondary Accessory",
        "price": 100
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 600
    },
    "totalPrice": 3200,
    "budgetTier": "mid-range",
    "events": [
      "casual",
      "date-night"
    ],
    "aesthetic": "Korean Casual",
    "stylingTip": "Style this Korean Casual look with confidence for your next casual event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-85",
    "title": "Korean & Minimal Look 5",
    "category": "Korean & Minimal",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,korean?random=86",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 900,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 1350,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 200
      },
      {
        "name": "Secondary Accessory",
        "price": 250
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 950
    },
    "totalPrice": 3650,
    "budgetTier": "mid-range",
    "events": [
      "casual",
      "date-night"
    ],
    "aesthetic": "Korean Casual",
    "stylingTip": "Style this Korean Casual look with confidence for your next casual event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-86",
    "title": "Korean & Minimal Look 6",
    "category": "Korean & Minimal",
    "gender": "female",
    "imageUrl": "https://loremflickr.com/600/800/fashion,korean?random=87",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 800,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 1050,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 250
      },
      {
        "name": "Secondary Accessory",
        "price": 150
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 1200
    },
    "totalPrice": 3450,
    "budgetTier": "mid-range",
    "events": [
      "casual",
      "date-night"
    ],
    "aesthetic": "Korean Casual",
    "stylingTip": "Style this Korean Casual look with confidence for your next casual event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-87",
    "title": "Korean & Minimal Look 7",
    "category": "Korean & Minimal",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,korean?random=88",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 3950,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 1800,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 550
      },
      {
        "name": "Secondary Accessory",
        "price": 200
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 4350
    },
    "totalPrice": 10850,
    "budgetTier": "premium",
    "events": [
      "casual",
      "date-night"
    ],
    "aesthetic": "Korean Casual",
    "stylingTip": "Style this Korean Casual look with confidence for your next casual event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-88",
    "title": "Korean & Minimal Look 8",
    "category": "Korean & Minimal",
    "gender": "female",
    "imageUrl": "https://loremflickr.com/600/800/fashion,korean?random=89",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 2000,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 2450,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 1350
      },
      {
        "name": "Secondary Accessory",
        "price": 750
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 5350
    },
    "totalPrice": 11900,
    "budgetTier": "premium",
    "events": [
      "casual",
      "date-night"
    ],
    "aesthetic": "Korean Casual",
    "stylingTip": "Style this Korean Casual look with confidence for your next casual event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-89",
    "title": "Korean & Minimal Look 9",
    "category": "Korean & Minimal",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,korean?random=90",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 3700,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 2000,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 1150
      },
      {
        "name": "Secondary Accessory",
        "price": 700
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 3950
    },
    "totalPrice": 11500,
    "budgetTier": "premium",
    "events": [
      "casual",
      "date-night"
    ],
    "aesthetic": "Korean Casual",
    "stylingTip": "Style this Korean Casual look with confidence for your next casual event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-90",
    "title": "Korean & Minimal Look 10",
    "category": "Korean & Minimal",
    "gender": "unisex",
    "imageUrl": "https://loremflickr.com/600/800/fashion,korean?random=91",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 9600,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 8950,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 3450
      },
      {
        "name": "Secondary Accessory",
        "price": 1350
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 12650
    },
    "totalPrice": 36000,
    "budgetTier": "luxury",
    "events": [
      "casual",
      "date-night"
    ],
    "aesthetic": "Korean Casual",
    "stylingTip": "Style this Korean Casual look with confidence for your next casual event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-91",
    "title": "Luxury Editorial Look 1",
    "category": "Luxury Editorial",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,luxury?random=92",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 350,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 600,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 100
      },
      {
        "name": "Secondary Accessory",
        "price": 100
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 450
    },
    "totalPrice": 1600,
    "budgetTier": "budget",
    "events": [
      "photoshoot",
      "luxury-dinner"
    ],
    "aesthetic": "Futuristic Editorial",
    "stylingTip": "Style this Futuristic Editorial look with confidence for your next photoshoot event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-92",
    "title": "Luxury Editorial Look 2",
    "category": "Luxury Editorial",
    "gender": "female",
    "imageUrl": "https://loremflickr.com/600/800/fashion,luxury?random=93",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 500,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 450,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 50
      },
      {
        "name": "Secondary Accessory",
        "price": 50
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 300
    },
    "totalPrice": 1350,
    "budgetTier": "budget",
    "events": [
      "photoshoot",
      "luxury-dinner"
    ],
    "aesthetic": "Futuristic Editorial",
    "stylingTip": "Style this Futuristic Editorial look with confidence for your next photoshoot event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-93",
    "title": "Luxury Editorial Look 3",
    "category": "Luxury Editorial",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,luxury?random=94",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 250,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 400,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 50
      },
      {
        "name": "Secondary Accessory",
        "price": 50
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 600
    },
    "totalPrice": 1350,
    "budgetTier": "budget",
    "events": [
      "photoshoot",
      "luxury-dinner"
    ],
    "aesthetic": "Futuristic Editorial",
    "stylingTip": "Style this Futuristic Editorial look with confidence for your next photoshoot event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-94",
    "title": "Luxury Editorial Look 4",
    "category": "Luxury Editorial",
    "gender": "female",
    "imageUrl": "https://loremflickr.com/600/800/fashion,luxury?random=95",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 950,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 1400,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 450
      },
      {
        "name": "Secondary Accessory",
        "price": 150
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 700
    },
    "totalPrice": 3650,
    "budgetTier": "mid-range",
    "events": [
      "photoshoot",
      "luxury-dinner"
    ],
    "aesthetic": "Futuristic Editorial",
    "stylingTip": "Style this Futuristic Editorial look with confidence for your next photoshoot event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-95",
    "title": "Luxury Editorial Look 5",
    "category": "Luxury Editorial",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,luxury?random=96",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 900,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 1550,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 250
      },
      {
        "name": "Secondary Accessory",
        "price": 250
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 1850
    },
    "totalPrice": 4800,
    "budgetTier": "mid-range",
    "events": [
      "photoshoot",
      "luxury-dinner"
    ],
    "aesthetic": "Futuristic Editorial",
    "stylingTip": "Style this Futuristic Editorial look with confidence for your next photoshoot event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-96",
    "title": "Luxury Editorial Look 6",
    "category": "Luxury Editorial",
    "gender": "female",
    "imageUrl": "https://loremflickr.com/600/800/fashion,luxury?random=97",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 950,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 1150,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 200
      },
      {
        "name": "Secondary Accessory",
        "price": 150
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 1700
    },
    "totalPrice": 4150,
    "budgetTier": "mid-range",
    "events": [
      "photoshoot",
      "luxury-dinner"
    ],
    "aesthetic": "Futuristic Editorial",
    "stylingTip": "Style this Futuristic Editorial look with confidence for your next photoshoot event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-97",
    "title": "Luxury Editorial Look 7",
    "category": "Luxury Editorial",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,luxury?random=98",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 3500,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 2450,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 1450
      },
      {
        "name": "Secondary Accessory",
        "price": 300
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 5000
    },
    "totalPrice": 12700,
    "budgetTier": "premium",
    "events": [
      "photoshoot",
      "luxury-dinner"
    ],
    "aesthetic": "Futuristic Editorial",
    "stylingTip": "Style this Futuristic Editorial look with confidence for your next photoshoot event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-98",
    "title": "Luxury Editorial Look 8",
    "category": "Luxury Editorial",
    "gender": "female",
    "imageUrl": "https://loremflickr.com/600/800/fashion,luxury?random=99",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 2350,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 3950,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 500
      },
      {
        "name": "Secondary Accessory",
        "price": 300
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 5750
    },
    "totalPrice": 12850,
    "budgetTier": "premium",
    "events": [
      "photoshoot",
      "luxury-dinner"
    ],
    "aesthetic": "Futuristic Editorial",
    "stylingTip": "Style this Futuristic Editorial look with confidence for your next photoshoot event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-99",
    "title": "Luxury Editorial Look 9",
    "category": "Luxury Editorial",
    "gender": "male",
    "imageUrl": "https://loremflickr.com/600/800/fashion,luxury?random=100",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 3150,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 3250,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 1450
      },
      {
        "name": "Secondary Accessory",
        "price": 350
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 2100
    },
    "totalPrice": 10300,
    "budgetTier": "premium",
    "events": [
      "photoshoot",
      "luxury-dinner"
    ],
    "aesthetic": "Futuristic Editorial",
    "stylingTip": "Style this Futuristic Editorial look with confidence for your next photoshoot event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  },
  {
    "id": "curated-100",
    "title": "Luxury Editorial Look 10",
    "category": "Luxury Editorial",
    "gender": "unisex",
    "imageUrl": "https://loremflickr.com/600/800/fashion,luxury?random=101",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 8000,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 8600,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 3900
      },
      {
        "name": "Secondary Accessory",
        "price": 1150
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 13550
    },
    "totalPrice": 35200,
    "budgetTier": "luxury",
    "events": [
      "photoshoot",
      "luxury-dinner"
    ],
    "aesthetic": "Futuristic Editorial",
    "stylingTip": "Style this Futuristic Editorial look with confidence for your next photoshoot event.",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#888888"
    ]
  }
];

export function getCuratedOutfits(): CuratedOutfit[] {
  return CURATED_OUTFITS;
}

export function getOutfitsByCategory(category: string): CuratedOutfit[] {
  return CURATED_OUTFITS.filter(o => o.category === category);
}

export function getOutfitsByBudget(maxBudget: number): CuratedOutfit[] {
  return CURATED_OUTFITS.filter(o => o.totalPrice <= maxBudget).sort((a, b) => b.totalPrice - a.totalPrice);
}

export function getOutfitsByEvent(event: string): CuratedOutfit[] {
  return CURATED_OUTFITS.filter(o => o.events.includes(event));
}

export function getOutfitsByBudgetAndEvent(maxBudget: number, event: string): CuratedOutfit[] {
  return CURATED_OUTFITS.filter(o => o.totalPrice <= maxBudget && o.events.includes(event)).sort((a, b) => b.totalPrice - a.totalPrice);
}

export function getCategories(): string[] {
  return [...new Set(CURATED_OUTFITS.map(o => o.category))];
}

export function searchCuratedOutfits(query: string): CuratedOutfit[] {
  const q = query.toLowerCase();
  return CURATED_OUTFITS.filter(o =>
    o.title.toLowerCase().includes(q) ||
    o.category.toLowerCase().includes(q) ||
    o.aesthetic.toLowerCase().includes(q) ||
    o.events.some(e => e.includes(q)) ||
    o.items.some(i => i.name.toLowerCase().includes(q)) ||
    o.stylingTip.toLowerCase().includes(q)
  );
}
