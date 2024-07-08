const data = [
        {
          input_preferences: {
            temperature: ["sunny"],
            destination_type: ["beach"],
            activities: ["Swimming", "Relaxing"],
            gender: "female"
          },
          output_expected: {
            smart_wear: ["dress", "blouse", "skirt", "scarf"],
            casual_wear: ["tshirt", "shorts", "jeans", "sweatshirt", "hoodie", "sweatpants"],
            outdoor_beach: ["swimwear", "flip flops", "beach towel", "sun hat", "snorkeling gear"],
            outdoor_mountain: [],
            outdoor_desert: [],
            other_clothes: ["underwear", "socks", "pyjama", "robe"],
            shoes: ["sandals", "sneakers", "flip flops"],
            toiletries: ["shampoo", "conditioner", "toothpaste", "toothbrush", "sunscreen"],
            electronics: ["phone charger", "camera", "tablet"],
            accessories: ["sunglasses", "hat", "belt"],
            miscellaneous: ["book", "travel pillow", "snacks"]
          }
        },
        {
          input_preferences: {
            temperature: ["cold"],
            destination_type: ["mountain"],
            activities: ["Hiking", "Sightseeing"],
            gender: "male"
          },
          output_expected: {
            smart_wear: ["shirt", "trousers", "blazer", "tie", "cufflinks"],
            casual_wear: ["tshirt", "jeans", "hoodie", "jacket", "sweatshirt","sweatpants"],
            outdoor_beach: [],
            outdoor_mountain: ["hiking boots", "thermal wear", "hiking backpack", "rain jacket", "hiking poles"],
            outdoor_desert: [],
            other_clothes: ["underwear", "socks", "pyjama", "thermal socks"],
            shoes: ["sneakers", "hiking boots", "casual shoes"],
            toiletries: ["shampoo", "conditioner", "toothpaste", "toothbrush", "shaving kit"],
            electronics: ["phone charger", "camera", "GPS"],
            accessories: ["sunglasses", "scarf", "hat"],
            miscellaneous: ["water bottle", "trail mix", "guidebook"]
          }
        },
        {
          input_preferences: {
            temperature: ["hot"],
            destination_type: ["desert"],
            activities: ["Safary", "Sightseeing"],
            gender: "non-binary"
          },
          output_expected: {
            smart_wear: ["shirt", "trousers", "blazer", "dress"],
            casual_wear: ["tshirt", "shorts", "sweatpants", "polo shirt","sweatshirt"],
            outdoor_beach: [],
            outdoor_mountain: [],
            outdoor_desert: ["lightweight clothing", "wide-brim hat", "hydration pack", "desert boots", "sand goggles"],
            other_clothes: ["underwear", "socks", "pyjama", "sports bra"],
            shoes: ["sneakers", "desert boots", "sandals"],
            toiletries: ["shampoo", "conditioner", "toothpaste", "toothbrush", "sunscreen"],
            electronics: ["phone charger", "camera", "power bank"],
            accessories: ["sunglasses", "belt", "hat"],
            miscellaneous: ["book", "travel pillow", "water bottle"]
          }
        },
        {
          input_preferences: {
            temperature: ["rainy"],
            destination_type: ["city"],
            activities: ["Sightseeing", "Dining", "Bars"],
            gender: "male"
          },
          output_expected: {
            smart_wear: ["shirt", "trousers", "blazer", "tie", "pocket square"],
            casual_wear: ["tshirt", "jeans", "loungewear", "sweatshirt", "jacket"],
            outdoor_beach: [],
            outdoor_mountain: [],
            outdoor_desert: [],
            other_clothes: ["underwear", "socks", "pyjama", "tank top"],
            shoes: ["sneakers", "dress shoes", "boots"],
            toiletries: ["shampoo", "conditioner", "toothpaste", "toothbrush", "deodorant"],
            electronics: ["phone charger", "laptop", "tablet"],
            accessories: ["sunglasses", "belt", "watch"],
            miscellaneous: ["book", "travel pillow", "journal"]
          }
        },
        {
          input_preferences: {
            temperature: ["warm"],
            destination_type: ["beach", "city"],
            activities: ["Swimming", "Sightseeing", "Relaxing"],
            gender: "female"
          },
          output_expected: {
            smart_wear: ["dress", "blouse", "skirt", "scarf"],
            casual_wear: ["tshirt", "shorts", "jeans", "hoodie", "polo shirt"],
            outdoor_beach: ["swimwear", "flip flops", "beach towel", "sun hat", "snorkeling gear"],
            outdoor_mountain: [],
            outdoor_desert: [],
            other_clothes: ["underwear", "socks", "pyjama", "robe"],
            shoes: ["sandals", "sneakers", "flip flops"],
            toiletries: ["shampoo", "conditioner", "toothpaste", "toothbrush", "sunscreen"],
            electronics: ["phone charger", "camera", "tablet"],
            accessories: ["sunglasses", "hat", "belt"],
            miscellaneous: ["book", "travel pillow", "snacks"]
          }
        },
        {
            input_preferences: {
              temperature: ["sunny"],
              destination_type: ["city"],
              activities: ["Sightseeing", "Dining", "Bars"],
              gender: "female"
            },
            output_expected: {
              smart_wear: ["dress", "blouse", "skirt", "dress shoes", "scarf"],
              casual_wear: ["tshirt", "jeans", "shorts", "jacket", "hoodie"],
              outdoor_beach: [],
              outdoor_mountain: [],
              outdoor_desert: [],
              other_clothes: ["underwear", "socks", "pyjama", "robe"],
              shoes: ["sneakers", "dress shoes", "sandals"],
              toiletries: ["shampoo", "conditioner", "toothpaste", "toothbrush", "deodorant"],
              electronics: ["phone charger", "laptop", "camera"],
              accessories: ["sunglasses", "belt", "watch"],
              miscellaneous: ["book", "travel pillow", "journal"]
            }
          },
          {
            input_preferences: {
              temperature: ["hot"],
              destination_type: ["beach"],
              activities: ["Swimming", "Relaxing"],
              gender: "non-binary"
            },
            output_expected: {
              smart_wear: ["blouse", "skirt", "dress", "dress shoes", "scarf"],
              casual_wear: ["tshirt", "shorts", "jeans", "sweatshirt", "polo shirt"],
              outdoor_beach: ["swimwear", "flip flops", "beach towel", "sun hat", "snorkeling gear"],
              outdoor_mountain: [],
              outdoor_desert: [],
              other_clothes: ["underwear", "socks", "pyjama", "robe"],
              shoes: ["sandals", "sneakers", "flip flops"],
              toiletries: ["shampoo", "conditioner", "toothpaste", "toothbrush", "sunscreen"],
              electronics: ["phone charger", "camera", "tablet"],
              accessories: ["sunglasses", "hat", "belt"],
              miscellaneous: ["book", "travel pillow", "snacks"]
            }
          },
          {
            input_preferences: {
              temperature: ["cold"],
              destination_type: ["mountain"],
              activities: ["Hiking", "Relaxing"],
              gender: "male"
            },
            output_expected: {
              smart_wear: ["shirt", "trousers", "blazer", "tie", "cufflinks"],
              casual_wear: ["tshirt", "jeans", "hoodie", "jacket", "sweatshirt"],
              outdoor_beach: [],
              outdoor_mountain: ["hiking boots", "thermal wear", "hiking backpack", "rain jacket", "hiking poles"],
              outdoor_desert: [],
              other_clothes: ["underwear", "socks", "pyjama", "thermal socks"],
              shoes: ["sneakers", "hiking boots", "casual shoes"],
              toiletries: ["shampoo", "conditioner", "toothpaste", "toothbrush", "shaving kit"],
              electronics: ["phone charger", "camera", "GPS"],
              accessories: ["sunglasses", "scarf", "hat"],
              miscellaneous: ["water bottle", "trail mix", "guidebook"]
            }
          },
          {
            input_preferences: {
              temperature: ["rainy"],
              destination_type: ["city"],
              activities: ["Sightseeing", "Dining", "Bars"],
              gender: "female"
            },
            output_expected: {
              smart_wear: ["dress", "blouse", "skirt", "dress shoes", "scarf"],
              casual_wear: ["tshirt", "jeans", "loungewear", "sweatshirt", "jacket"],
              outdoor_beach: [],
              outdoor_mountain: [],
              outdoor_desert: [],
              other_clothes: ["underwear", "socks", "pyjama", "tank top"],
              shoes: ["sneakers", "dress shoes", "boots"],
              toiletries: ["shampoo", "conditioner", "toothpaste", "toothbrush", "deodorant"],
              electronics: ["phone charger", "laptop", "tablet"],
              accessories: ["sunglasses", "belt", "watch"],
              miscellaneous: ["book", "travel pillow", "journal"]
            }
          },
          {
            input_preferences: {
              temperature: ["warm"],
              destination_type: ["city", "mountain"],
              activities: ["Hiking", "Sightseeing"],
              gender: "male"
            },
            output_expected: {
                smart_wear: ["shirt", "trousers", "blazer", "tie", "cufflinks"],
              casual_wear: ["tshirt", "jeans", "hoodie", "jacket", "sweatshirt","sweatpants"],
              outdoor_beach: [],
              outdoor_mountain: ["hiking boots", "thermal wear", "hiking backpack", "hiking poles"],
              outdoor_desert: [],
              other_clothes: ["underwear", "socks", "pyjama", "thermal socks"],
              shoes: ["sneakers", "hiking boots", "casual shoes"],
              toiletries: ["shampoo", "conditioner", "toothpaste", "toothbrush", "shaving kit"],
              electronics: ["phone charger", "camera", "GPS"],
              accessories: ["sunglasses", "scarf", "hat"],
              miscellaneous: ["water bottle", "trail mix", "guidebook"]
            }
          },
          {
            input_preferences: {
              temperature: ["hot"],
              destination_type: ["desert"],
              activities: ["Safary", "Sightseeing"],
              gender: "female"
            },
            output_expected: {
              smart_wear: ["dress", "blouse", "skirt", "dress shoes", "scarf"],
              casual_wear: ["tshirt", "shorts", "jeans", "sweatshirt", "polo shirt","sweatpants"],
              outdoor_beach: [],
              outdoor_mountain: [],
              outdoor_desert: ["lightweight clothing", "wide-brim hat", "hydration pack", "desert boots", "sand goggles"],
              other_clothes: ["underwear", "socks", "pyjama", "sports bra"],
              shoes: ["sneakers", "desert boots", "sandals"],
              toiletries: ["shampoo", "conditioner", "toothpaste", "toothbrush", "sunscreen"],
              electronics: ["phone charger", "camera", "power bank"],
              accessories: ["sunglasses", "belt", "hat"],
              miscellaneous: ["book", "travel pillow", "water bottle"]
            }
          },
          {
            input_preferences: {
              temperature: ["rainy"],
              destination_type: ["beach"],
              activities: ["Swimming", "Relaxing"],
              gender: "non-binary"
            },
            output_expected: {
              smart_wear: ["blouse", "skirt", "dress", "scarf"],
              casual_wear: ["tshirt", "shorts", "jeans", "sweatshirt", "polo shirt","sweatpants"],
              outdoor_beach: ["swimwear", "flip flops", "beach towel", "sun hat", "snorkeling gear"],
              outdoor_mountain: [],
              outdoor_desert: [],
              other_clothes: ["underwear", "socks", "pyjama", "robe"],
              shoes: ["sandals", "sneakers", "flip flops"],
              toiletries: ["shampoo", "conditioner", "toothpaste", "toothbrush", "sunscreen"],
              electronics: ["phone charger", "camera", "tablet"],
              accessories: ["sunglasses", "hat", "belt"],
              miscellaneous: ["book", "travel pillow", "snacks"]
            }
          }
      ];