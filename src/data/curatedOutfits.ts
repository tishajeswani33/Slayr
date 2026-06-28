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
    "imageUrl": "https://images.unsplash.com/featured/?indian,wedding,lehenga,sherwani&sig=1001",
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
        "price": 500,
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
        "price": 200
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 1700
    },
    "totalPrice": 3900,
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
    "imageUrl": "https://images.unsplash.com/featured/?indian,wedding,lehenga,sherwani&sig=1002",
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
        "price": 1000,
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
      "price": 500
    },
    "totalPrice": 3100,
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
    "imageUrl": "https://images.unsplash.com/featured/?indian,wedding,lehenga,sherwani&sig=1003",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 700,
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
        "price": 300
      },
      {
        "name": "Secondary Accessory",
        "price": 100
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 1200
    },
    "totalPrice": 2900,
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
    "imageUrl": "https://images.unsplash.com/featured/?indian,wedding,lehenga,sherwani&sig=1004",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 4800,
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
        "price": 900
      },
      {
        "name": "Secondary Accessory",
        "price": 500
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 3700
    },
    "totalPrice": 13800,
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
    "imageUrl": "https://images.unsplash.com/featured/?indian,wedding,lehenga,sherwani&sig=1005",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 2600,
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
        "price": 900
      },
      {
        "name": "Secondary Accessory",
        "price": 800
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 1900
    },
    "totalPrice": 8000,
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
    "imageUrl": "https://images.unsplash.com/featured/?indian,wedding,lehenga,sherwani&sig=1006",
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
        "price": 3500,
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
        "price": 800
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 3700
    },
    "totalPrice": 11800,
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
    "imageUrl": "https://images.unsplash.com/featured/?indian,wedding,lehenga,sherwani&sig=1007",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 9100,
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
        "price": 2300
      },
      {
        "name": "Secondary Accessory",
        "price": 1400
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 16500
    },
    "totalPrice": 36900,
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
    "imageUrl": "https://images.unsplash.com/featured/?indian,wedding,lehenga,sherwani&sig=1008",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 8900,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 8200,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 3100
      },
      {
        "name": "Secondary Accessory",
        "price": 1500
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 17000
    },
    "totalPrice": 38700,
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
    "imageUrl": "https://images.unsplash.com/featured/?indian,wedding,lehenga,sherwani&sig=1009",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 11700,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 10500,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 4400
      },
      {
        "name": "Secondary Accessory",
        "price": 1200
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 9100
    },
    "totalPrice": 36900,
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
    "imageUrl": "https://images.unsplash.com/featured/?indian,wedding,lehenga,sherwani&sig=1010",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 42500,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 16300,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 11300
      },
      {
        "name": "Secondary Accessory",
        "price": 4800
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 16800
    },
    "totalPrice": 91700,
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
    "imageUrl": "https://images.unsplash.com/featured/?sangeet,mehendi,sharara,ethnic&sig=1011",
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
        "price": 1100,
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
        "price": 200
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 1000
    },
    "totalPrice": 3900,
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
    "imageUrl": "https://images.unsplash.com/featured/?sangeet,mehendi,sharara,ethnic&sig=1012",
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
      "price": 1200
    },
    "totalPrice": 3500,
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
    "imageUrl": "https://images.unsplash.com/featured/?sangeet,mehendi,sharara,ethnic&sig=1013",
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
        "price": 500,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 300
      },
      {
        "name": "Secondary Accessory",
        "price": 100
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 1300
    },
    "totalPrice": 3500,
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
    "imageUrl": "https://images.unsplash.com/featured/?sangeet,mehendi,sharara,ethnic&sig=1014",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 2700,
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
        "price": 700
      },
      {
        "name": "Secondary Accessory",
        "price": 700
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 5900
    },
    "totalPrice": 13900,
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
    "imageUrl": "https://images.unsplash.com/featured/?sangeet,mehendi,sharara,ethnic&sig=1015",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 2900,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 1900,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 1100
      },
      {
        "name": "Secondary Accessory",
        "price": 900
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 3700
    },
    "totalPrice": 10500,
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
    "imageUrl": "https://images.unsplash.com/featured/?sangeet,mehendi,sharara,ethnic&sig=1016",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 4500,
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
        "price": 1000
      },
      {
        "name": "Secondary Accessory",
        "price": 400
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 3500
    },
    "totalPrice": 12000,
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
    "imageUrl": "https://images.unsplash.com/featured/?sangeet,mehendi,sharara,ethnic&sig=1017",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 13600,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 6400,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 2900
      },
      {
        "name": "Secondary Accessory",
        "price": 2000
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 6100
    },
    "totalPrice": 31000,
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
    "imageUrl": "https://images.unsplash.com/featured/?sangeet,mehendi,sharara,ethnic&sig=1018",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 7800,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 8800,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 4400
      },
      {
        "name": "Secondary Accessory",
        "price": 1700
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 12200
    },
    "totalPrice": 34900,
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
    "imageUrl": "https://images.unsplash.com/featured/?sangeet,mehendi,sharara,ethnic&sig=1019",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 10500,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 9600,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 3300
      },
      {
        "name": "Secondary Accessory",
        "price": 1600
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 17100
    },
    "totalPrice": 42100,
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
    "imageUrl": "https://images.unsplash.com/featured/?sangeet,mehendi,sharara,ethnic&sig=1020",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 38900,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 19100,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 14900
      },
      {
        "name": "Secondary Accessory",
        "price": 9500
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 18300
    },
    "totalPrice": 100700,
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
    "imageUrl": "https://images.unsplash.com/featured/?festive,diwali,silk,kurta&sig=1021",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 1200,
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
        "price": 300
      },
      {
        "name": "Secondary Accessory",
        "price": 200
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 1300
    },
    "totalPrice": 4100,
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
    "imageUrl": "https://images.unsplash.com/featured/?festive,diwali,silk,kurta&sig=1022",
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
        "price": 100
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 1000
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
    "id": "curated-23",
    "title": "Festive & Diwali Look 3",
    "category": "Festive & Diwali",
    "gender": "male",
    "imageUrl": "https://images.unsplash.com/featured/?festive,diwali,silk,kurta&sig=1023",
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
        "price": 800,
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
        "price": 200
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 700
    },
    "totalPrice": 3000,
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
    "imageUrl": "https://images.unsplash.com/featured/?festive,diwali,silk,kurta&sig=1024",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 4800,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 1700,
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
        "price": 900
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 5300
    },
    "totalPrice": 13900,
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
    "imageUrl": "https://images.unsplash.com/featured/?festive,diwali,silk,kurta&sig=1025",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 3800,
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
        "price": 1300
      },
      {
        "name": "Secondary Accessory",
        "price": 600
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 4900
    },
    "totalPrice": 14200,
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
    "imageUrl": "https://images.unsplash.com/featured/?festive,diwali,silk,kurta&sig=1026",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 2400,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 2800,
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
      "price": 1800
    },
    "totalPrice": 8600,
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
    "imageUrl": "https://images.unsplash.com/featured/?festive,diwali,silk,kurta&sig=1027",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 12500,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 6700,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 4000
      },
      {
        "name": "Secondary Accessory",
        "price": 2600
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 8400
    },
    "totalPrice": 34200,
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
    "imageUrl": "https://images.unsplash.com/featured/?festive,diwali,silk,kurta&sig=1028",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 14700,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 10000,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 2400
      },
      {
        "name": "Secondary Accessory",
        "price": 1600
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 17600
    },
    "totalPrice": 46300,
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
    "imageUrl": "https://images.unsplash.com/featured/?festive,diwali,silk,kurta&sig=1029",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 8600,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 7400,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 3800
      },
      {
        "name": "Secondary Accessory",
        "price": 1200
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 7800
    },
    "totalPrice": 28800,
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
    "imageUrl": "https://images.unsplash.com/featured/?festive,diwali,silk,kurta&sig=1030",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 26200,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 18500,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 11400
      },
      {
        "name": "Secondary Accessory",
        "price": 8500
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 29300
    },
    "totalPrice": 93900,
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
    "imageUrl": "https://images.unsplash.com/featured/?party,club,sequin,nightlife&sig=1031",
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
        "price": 700,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 300
      },
      {
        "name": "Secondary Accessory",
        "price": 200
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 900
    },
    "totalPrice": 3100,
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
    "imageUrl": "https://images.unsplash.com/featured/?party,club,sequin,nightlife&sig=1032",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 1200,
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
        "price": 400
      },
      {
        "name": "Secondary Accessory",
        "price": 200
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 1100
    },
    "totalPrice": 3400,
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
    "imageUrl": "https://images.unsplash.com/featured/?party,club,sequin,nightlife&sig=1033",
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
        "price": 900,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 300
      },
      {
        "name": "Secondary Accessory",
        "price": 100
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 1200
    },
    "totalPrice": 3600,
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
    "imageUrl": "https://images.unsplash.com/featured/?party,club,sequin,nightlife&sig=1034",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 4500,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 2200,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 800
      },
      {
        "name": "Secondary Accessory",
        "price": 700
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 2600
    },
    "totalPrice": 10800,
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
    "imageUrl": "https://images.unsplash.com/featured/?party,club,sequin,nightlife&sig=1035",
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
        "price": 3600,
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
      "price": 4700
    },
    "totalPrice": 13300,
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
    "imageUrl": "https://images.unsplash.com/featured/?party,club,sequin,nightlife&sig=1036",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 4100,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 3100,
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
        "price": 600
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 5800
    },
    "totalPrice": 14200,
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
    "imageUrl": "https://images.unsplash.com/featured/?party,club,sequin,nightlife&sig=1037",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 10100,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 6500,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 3200
      },
      {
        "name": "Secondary Accessory",
        "price": 2100
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 8500
    },
    "totalPrice": 30400,
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
    "imageUrl": "https://images.unsplash.com/featured/?party,club,sequin,nightlife&sig=1038",
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
        "price": 8900,
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
        "price": 1800
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 11500
    },
    "totalPrice": 33000,
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
    "id": "curated-39",
    "title": "Party & Clubwear Look 9",
    "category": "Party & Clubwear",
    "gender": "male",
    "imageUrl": "https://images.unsplash.com/featured/?party,club,sequin,nightlife&sig=1039",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 10800,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 5200,
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
        "price": 2400
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 7000
    },
    "totalPrice": 29300,
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
    "imageUrl": "https://images.unsplash.com/featured/?party,club,sequin,nightlife&sig=1040",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 42300,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 27300,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 14200
      },
      {
        "name": "Secondary Accessory",
        "price": 8500
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 39800
    },
    "totalPrice": 132100,
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
    "imageUrl": "https://images.unsplash.com/featured/?office,corporate,formal,suit&sig=1041",
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
        "price": 600,
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
        "price": 100
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 1300
    },
    "totalPrice": 3200,
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
    "imageUrl": "https://images.unsplash.com/featured/?office,corporate,formal,suit&sig=1042",
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
        "price": 600,
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
        "price": 200
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 400
    },
    "totalPrice": 2800,
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
    "imageUrl": "https://images.unsplash.com/featured/?office,corporate,formal,suit&sig=1043",
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
        "price": 1100,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 300
      },
      {
        "name": "Secondary Accessory",
        "price": 200
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 1000
    },
    "totalPrice": 3700,
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
    "imageUrl": "https://images.unsplash.com/featured/?office,corporate,formal,suit&sig=1044",
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
        "price": 3800,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 1400
      },
      {
        "name": "Secondary Accessory",
        "price": 600
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 3000
    },
    "totalPrice": 12200,
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
    "imageUrl": "https://images.unsplash.com/featured/?office,corporate,formal,suit&sig=1045",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 4400,
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
        "price": 1300
      },
      {
        "name": "Secondary Accessory",
        "price": 700
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 5700
    },
    "totalPrice": 14200,
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
    "imageUrl": "https://images.unsplash.com/featured/?office,corporate,formal,suit&sig=1046",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 2500,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 3300,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 900
      },
      {
        "name": "Secondary Accessory",
        "price": 800
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 4800
    },
    "totalPrice": 12300,
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
    "imageUrl": "https://images.unsplash.com/featured/?office,corporate,formal,suit&sig=1047",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 12800,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 11700,
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
        "price": 1800
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 16300
    },
    "totalPrice": 45600,
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
    "imageUrl": "https://images.unsplash.com/featured/?office,corporate,formal,suit&sig=1048",
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
        "price": 6500,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 4100
      },
      {
        "name": "Secondary Accessory",
        "price": 2400
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 17600
    },
    "totalPrice": 38300,
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
    "imageUrl": "https://images.unsplash.com/featured/?office,corporate,formal,suit&sig=1049",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 9200,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 8200,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 3500
      },
      {
        "name": "Secondary Accessory",
        "price": 2400
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 10700
    },
    "totalPrice": 34000,
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
    "imageUrl": "https://images.unsplash.com/featured/?office,corporate,formal,suit&sig=1050",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 20100,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 31300,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 12600
      },
      {
        "name": "Secondary Accessory",
        "price": 4600
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 48600
    },
    "totalPrice": 117200,
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
    "imageUrl": "https://images.unsplash.com/featured/?casual,streetwear,denim,sneaker&sig=1051",
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
        "price": 900,
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
      "price": 1600
    },
    "totalPrice": 3600,
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
    "imageUrl": "https://images.unsplash.com/featured/?casual,streetwear,denim,sneaker&sig=1052",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 600,
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
        "price": 200
      },
      {
        "name": "Secondary Accessory",
        "price": 100
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 1600
    },
    "totalPrice": 3000,
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
    "imageUrl": "https://images.unsplash.com/featured/?casual,streetwear,denim,sneaker&sig=1053",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 700,
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
        "price": 100
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 500
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
    "imageUrl": "https://images.unsplash.com/featured/?casual,streetwear,denim,sneaker&sig=1054",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 3200,
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
        "price": 1000
      },
      {
        "name": "Secondary Accessory",
        "price": 900
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 1900
    },
    "totalPrice": 10500,
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
    "imageUrl": "https://images.unsplash.com/featured/?casual,streetwear,denim,sneaker&sig=1055",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 2400,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 3300,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 900
      },
      {
        "name": "Secondary Accessory",
        "price": 900
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 3600
    },
    "totalPrice": 11100,
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
    "imageUrl": "https://images.unsplash.com/featured/?casual,streetwear,denim,sneaker&sig=1056",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 4900,
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
        "price": 1300
      },
      {
        "name": "Secondary Accessory",
        "price": 800
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 5600
    },
    "totalPrice": 16500,
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
    "id": "curated-57",
    "title": "College & Casual Look 7",
    "category": "College & Casual",
    "gender": "male",
    "imageUrl": "https://images.unsplash.com/featured/?casual,streetwear,denim,sneaker&sig=1057",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 8500,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 5300,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 3600
      },
      {
        "name": "Secondary Accessory",
        "price": 1200
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 14200
    },
    "totalPrice": 32800,
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
    "imageUrl": "https://images.unsplash.com/featured/?casual,streetwear,denim,sneaker&sig=1058",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 9100,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 6100,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 2400
      },
      {
        "name": "Secondary Accessory",
        "price": 1200
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 5000
    },
    "totalPrice": 23800,
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
    "imageUrl": "https://images.unsplash.com/featured/?casual,streetwear,denim,sneaker&sig=1059",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 11100,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 11100,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 2500
      },
      {
        "name": "Secondary Accessory",
        "price": 2800
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 11600
    },
    "totalPrice": 39100,
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
    "imageUrl": "https://images.unsplash.com/featured/?casual,streetwear,denim,sneaker&sig=1060",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 48000,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 24500,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 9600
      },
      {
        "name": "Secondary Accessory",
        "price": 5100
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 45500
    },
    "totalPrice": 132700,
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
    "imageUrl": "https://images.unsplash.com/featured/?date,romantic,evening,elegant&sig=1061",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 700,
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
        "price": 300
      },
      {
        "name": "Secondary Accessory",
        "price": 200
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 600
    },
    "totalPrice": 2600,
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
    "imageUrl": "https://images.unsplash.com/featured/?date,romantic,evening,elegant&sig=1062",
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
        "price": 400,
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
      "price": 1700
    },
    "totalPrice": 3800,
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
    "imageUrl": "https://images.unsplash.com/featured/?date,romantic,evening,elegant&sig=1063",
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
        "price": 1000,
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
        "price": 100
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 800
    },
    "totalPrice": 2800,
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
    "imageUrl": "https://images.unsplash.com/featured/?date,romantic,evening,elegant&sig=1064",
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
        "price": 3900,
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
        "price": 800
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 1700
    },
    "totalPrice": 9300,
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
    "imageUrl": "https://images.unsplash.com/featured/?date,romantic,evening,elegant&sig=1065",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 4400,
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
        "price": 900
      },
      {
        "name": "Secondary Accessory",
        "price": 400
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 4700
    },
    "totalPrice": 13900,
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
    "imageUrl": "https://images.unsplash.com/featured/?date,romantic,evening,elegant&sig=1066",
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
        "price": 3100,
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
        "price": 900
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 5100
    },
    "totalPrice": 12100,
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
    "imageUrl": "https://images.unsplash.com/featured/?date,romantic,evening,elegant&sig=1067",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 9800,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 6100,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 4200
      },
      {
        "name": "Secondary Accessory",
        "price": 1400
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 9900
    },
    "totalPrice": 31400,
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
    "imageUrl": "https://images.unsplash.com/featured/?date,romantic,evening,elegant&sig=1068",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 11600,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 8300,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 3800
      },
      {
        "name": "Secondary Accessory",
        "price": 2500
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 8300
    },
    "totalPrice": 34500,
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
    "imageUrl": "https://images.unsplash.com/featured/?date,romantic,evening,elegant&sig=1069",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 9300,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 10600,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 3300
      },
      {
        "name": "Secondary Accessory",
        "price": 2500
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 14700
    },
    "totalPrice": 40400,
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
    "imageUrl": "https://images.unsplash.com/featured/?date,romantic,evening,elegant&sig=1070",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 27600,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 37000,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 8200
      },
      {
        "name": "Secondary Accessory",
        "price": 9900
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 22300
    },
    "totalPrice": 105000,
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
    "imageUrl": "https://images.unsplash.com/featured/?brunch,summer,linen,casual,chic&sig=1071",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 600,
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
        "price": 300
      },
      {
        "name": "Secondary Accessory",
        "price": 200
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 600
    },
    "totalPrice": 2400,
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
    "imageUrl": "https://images.unsplash.com/featured/?brunch,summer,linen,casual,chic&sig=1072",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 1200,
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
        "price": 300
      },
      {
        "name": "Secondary Accessory",
        "price": 100
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 1100
    },
    "totalPrice": 3100,
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
    "imageUrl": "https://images.unsplash.com/featured/?brunch,summer,linen,casual,chic&sig=1073",
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
        "price": 600,
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
      "price": 1600
    },
    "totalPrice": 3900,
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
    "imageUrl": "https://images.unsplash.com/featured/?brunch,summer,linen,casual,chic&sig=1074",
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
        "price": 1700,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 1100
      },
      {
        "name": "Secondary Accessory",
        "price": 400
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 1600
    },
    "totalPrice": 8200,
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
    "imageUrl": "https://images.unsplash.com/featured/?brunch,summer,linen,casual,chic&sig=1075",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 4300,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 2500,
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
      "price": 3600
    },
    "totalPrice": 12100,
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
    "imageUrl": "https://images.unsplash.com/featured/?brunch,summer,linen,casual,chic&sig=1076",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 4900,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 2500,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 1100
      },
      {
        "name": "Secondary Accessory",
        "price": 600
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 3500
    },
    "totalPrice": 12600,
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
    "imageUrl": "https://images.unsplash.com/featured/?brunch,summer,linen,casual,chic&sig=1077",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 12000,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 8300,
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
        "price": 2100
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 14000
    },
    "totalPrice": 40100,
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
    "imageUrl": "https://images.unsplash.com/featured/?brunch,summer,linen,casual,chic&sig=1078",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 9100,
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
        "price": 3200
      },
      {
        "name": "Secondary Accessory",
        "price": 1400
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 5900
    },
    "totalPrice": 27200,
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
    "imageUrl": "https://images.unsplash.com/featured/?brunch,summer,linen,casual,chic&sig=1079",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 14900,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 6800,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 2000
      },
      {
        "name": "Secondary Accessory",
        "price": 1400
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 5700
    },
    "totalPrice": 30800,
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
    "imageUrl": "https://images.unsplash.com/featured/?brunch,summer,linen,casual,chic&sig=1080",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 42600,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 22700,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 7800
      },
      {
        "name": "Secondary Accessory",
        "price": 8000
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 53400
    },
    "totalPrice": 134500,
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
    "imageUrl": "https://images.unsplash.com/featured/?korean,minimal,aesthetic,fashion&sig=1081",
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
        "price": 700,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 300
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
    "totalPrice": 3300,
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
    "imageUrl": "https://images.unsplash.com/featured/?korean,minimal,aesthetic,fashion&sig=1082",
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
        "price": 400,
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
        "price": 200
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 1300
    },
    "totalPrice": 3100,
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
    "imageUrl": "https://images.unsplash.com/featured/?korean,minimal,aesthetic,fashion&sig=1083",
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
        "price": 600,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 300
      },
      {
        "name": "Secondary Accessory",
        "price": 200
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 1100
    },
    "totalPrice": 3500,
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
    "imageUrl": "https://images.unsplash.com/featured/?korean,minimal,aesthetic,fashion&sig=1084",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 4100,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 2800,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 1100
      },
      {
        "name": "Secondary Accessory",
        "price": 600
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 2100
    },
    "totalPrice": 10700,
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
    "imageUrl": "https://images.unsplash.com/featured/?korean,minimal,aesthetic,fashion&sig=1085",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 4800,
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
        "price": 800
      },
      {
        "name": "Secondary Accessory",
        "price": 400
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 2700
    },
    "totalPrice": 11300,
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
    "imageUrl": "https://images.unsplash.com/featured/?korean,minimal,aesthetic,fashion&sig=1086",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 4800,
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
        "price": 1000
      },
      {
        "name": "Secondary Accessory",
        "price": 500
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 4400
    },
    "totalPrice": 14300,
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
    "imageUrl": "https://images.unsplash.com/featured/?korean,minimal,aesthetic,fashion&sig=1087",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 13300,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 6100,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 2600
      },
      {
        "name": "Secondary Accessory",
        "price": 2500
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 6900
    },
    "totalPrice": 31400,
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
    "imageUrl": "https://images.unsplash.com/featured/?korean,minimal,aesthetic,fashion&sig=1088",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 7600,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 8200,
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
        "price": 1400
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 15300
    },
    "totalPrice": 35500,
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
    "imageUrl": "https://images.unsplash.com/featured/?korean,minimal,aesthetic,fashion&sig=1089",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 12800,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 10800,
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
        "price": 1400
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 15700
    },
    "totalPrice": 43700,
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
    "imageUrl": "https://images.unsplash.com/featured/?korean,minimal,aesthetic,fashion&sig=1090",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 48500,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 17800,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 14100
      },
      {
        "name": "Secondary Accessory",
        "price": 4700
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 41900
    },
    "totalPrice": 127000,
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
    "imageUrl": "https://images.unsplash.com/featured/?luxury,editorial,runway,fashion&sig=1091",
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
        "price": 400,
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
        "price": 200
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 1600
    },
    "totalPrice": 3700,
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
    "imageUrl": "https://images.unsplash.com/featured/?luxury,editorial,runway,fashion&sig=1092",
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
        "price": 900,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 300
      },
      {
        "name": "Secondary Accessory",
        "price": 100
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 1200
    },
    "totalPrice": 3500,
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
    "imageUrl": "https://images.unsplash.com/featured/?luxury,editorial,runway,fashion&sig=1093",
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
        "price": 500,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 300
      },
      {
        "name": "Secondary Accessory",
        "price": 100
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 1100
    },
    "totalPrice": 2800,
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
    "imageUrl": "https://images.unsplash.com/featured/?luxury,editorial,runway,fashion&sig=1094",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 2900,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 3300,
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
        "price": 800
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 5300
    },
    "totalPrice": 12900,
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
    "imageUrl": "https://images.unsplash.com/featured/?luxury,editorial,runway,fashion&sig=1095",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 3200,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 2500,
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
        "price": 900
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 4300
    },
    "totalPrice": 11600,
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
    "imageUrl": "https://images.unsplash.com/featured/?luxury,editorial,runway,fashion&sig=1096",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 4000,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 3700,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 900
      },
      {
        "name": "Secondary Accessory",
        "price": 700
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 3600
    },
    "totalPrice": 12900,
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
    "imageUrl": "https://images.unsplash.com/featured/?luxury,editorial,runway,fashion&sig=1097",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 13600,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 9200,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 2400
      },
      {
        "name": "Secondary Accessory",
        "price": 2900
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 14100
    },
    "totalPrice": 42200,
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
    "imageUrl": "https://images.unsplash.com/featured/?luxury,editorial,runway,fashion&sig=1098",
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
        "price": 8400,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 2900
      },
      {
        "name": "Secondary Accessory",
        "price": 2500
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 17900
    },
    "totalPrice": 38500,
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
    "imageUrl": "https://images.unsplash.com/featured/?luxury,editorial,runway,fashion&sig=1099",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 14800,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 6400,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 4300
      },
      {
        "name": "Secondary Accessory",
        "price": 1900
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 10600
    },
    "totalPrice": 38000,
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
    "imageUrl": "https://images.unsplash.com/featured/?luxury,editorial,runway,fashion&sig=1100",
    "items": [
      {
        "name": "Primary Top/Dress",
        "type": "Top",
        "price": 27400,
        "color": "Primary Color"
      },
      {
        "name": "Matching Bottom",
        "type": "Bottom",
        "price": 19200,
        "color": "Secondary Color"
      }
    ],
    "accessories": [
      {
        "name": "Statement Piece",
        "price": 9000
      },
      {
        "name": "Secondary Accessory",
        "price": 4600
      }
    ],
    "shoes": {
      "name": "Signature Footwear",
      "price": 36800
    },
    "totalPrice": 97000,
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
