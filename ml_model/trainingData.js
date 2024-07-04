const data = [
        {
          input_preferences: {
            temperature: ["sunny"],
            destination_type: ["beach"],
            activities: ["Swimming", "Relaxing"],
            gender: "female"
          },
          output_expected: {
            smart_wear: ["dress", "blouse", "skirt"],
            casual_wear: ["tshirt", "shorts", "loungewear"],
            outdoor_beach: ["swimwear", "beach towel", "beach bag"],
            outdoor_mountain: [],
            outdoor_desert: [],
            other_clothes: ["underwear", "socks", "pyjama"],
            shoes: ["sandals", "sneakers", "flip flops"],
            toiletries: ["shampoo", "conditioner", "toothpaste", "toothbrush", "sunscreen","deodorant", "face wash", "moisturizer"],
            electronics: ["phone charger", "camera","power bank","headphones", "travel adapter","portable speaker"],
            accessories: ["sunglasses", "hat", "scarf"],
            miscellaneous: ["water bottle"]
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
            smart_wear: [],
            casual_wear: ["tshirt", "jeans", "hoodie", "jacket", "sweatshirt","sweatpants"],
            outdoor_beach: [],
            outdoor_mountain: ["hiking boots", "thermal wear", "hiking backpack","fleece jacket"],
            outdoor_desert: [],
            other_clothes: ["underwear", "socks", "pyjama", "thermal socks","base layers"],
            shoes: ["sneakers", "hiking boots", "casual shoes"],
            toiletries: ["shampoo", "conditioner", "toothpaste", "toothbrush","deodorant"],
            electronics: ["phone charger", "camera","power bank", "headphones","travel adapter","portable speaker"],
            accessories: ["beanie","gloves","scarf"],
            miscellaneous: ["water bottle","first aid kit"]
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
            smart_wear: ["shirt", "trousers", "dress","skirt", "blouse"],
            casual_wear: ["tshirt", "shorts", "loungewear"],
            outdoor_beach: [],
            outdoor_mountain: [],
            outdoor_desert: ["lightweight clothing", "sweat-wicking shirts"],
            other_clothes: ["underwear", "socks", "pyjama"],
            shoes: ["sneakers", "desert boots", "sandals"],
            toiletries: ["shampoo", "conditioner","toothpaste","toothbrush","sunscreen","deodorant","face wash","moisturizer","hair brush","lip balm"],
            electronics: ["phone charger", "camera","power bank", "headphones", "travel adapter", "portable speaker"],
            accessories: ["sunglasses", "belt", "hat","scarf","sand goggles"],
            miscellaneous: ["water bottle"]
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
            smart_wear: ["shirt", "trousers", "blazer", "tie"],
            casual_wear: ["tshirt", "jeans", "loungewear", "sweatshirt", "sweatpants","jacket"],
            outdoor_beach: [],
            outdoor_mountain: [],
            outdoor_desert: [],
            other_clothes: ["underwear", "socks", "pyjama"],
            shoes: ["sneakers", "dress shoes", "boots"],
            toiletries: ["shampoo", "conditioner", "toothpaste", "toothbrush", "deodorant"],
            electronics: ["phone charger", "camera", "headphones", "travel adapter"],
            accessories: ["sunglasses", "belt", "watch","umbrella"],
            miscellaneous: []
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
            smart_wear: ["dress", "blouse", "skirt","trousers"],
            casual_wear: ["tshirt", "shorts", "jeans", "loungewear","jacket"],
            outdoor_beach: ["swimwear", "beach towel", "beach bag"],
            outdoor_mountain: [],
            outdoor_desert: [],
            other_clothes: ["underwear", "socks", "pyjama"],
            shoes: ["sandals", "sneakers", "flip flops"],
            toiletries: ["shampoo","conditioner","toothpaste","toothbrush","sunscreen","deodorant","face wash","moisturizer","hair brush","lip balm"],
            electronics: ["phone charger", "camera","power bank","headphones","travel adapter"],
            accessories: ["sunglasses", "hat","scarf","jewelry"],
            miscellaneous: ["travel pillow","water bottle"]
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
              smart_wear: ["dress", "blouse", "skirt","trousers"],
              casual_wear: ["tshirt", "jeans", "shorts", "jacket", "loungewear"],
              outdoor_beach: [],
              outdoor_mountain: [],
              outdoor_desert: [],
              other_clothes: ["underwear", "socks", "pyjama"],
              shoes: ["sneakers", "dress shoes", "sandals"],
              toiletries: ["shampoo","conditioner","toothpaste","toothbrush","sunscreen","deodorant","face wash","moisturizer","hair brush","lip balm"],
              electronics: ["phone charger", "camera","power bank","headphones","travel adapter"],
              accessories: ["sunglasses", "hat","scarf","jewelry"],
              miscellaneous: ["travel pillow","water bottle"]
            }
          },
          {
            input_preferences: {
              temperature: ["hot"],
              destination_type: ["beach"],
              activities: ["Swimming", "Relaxing"],
              gender: "female"
            },
            output_expected: {
                smart_wear: ["dress", "blouse", "skirt","trousers"],
                casual_wear: ["tshirt", "shorts", "jeans", "loungewear","jacket"],
                outdoor_beach: ["swimwear", "beach towel", "beach bag"],
                outdoor_mountain: [],
                outdoor_desert: [],
                other_clothes: ["underwear", "socks", "pyjama"],
                shoes: ["sandals", "sneakers", "flip flops"],
                toiletries: ["shampoo","conditioner","toothpaste","toothbrush","sunscreen","deodorant","face wash","moisturizer","hair brush","lip balm"],
                electronics: ["phone charger", "camera","power bank","headphones","travel adapter"],
                accessories: ["sunglasses", "hat","scarf","jewelry"],
                miscellaneous: ["travel pillow","water bottle"]
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
              smart_wear: ["trousers", "blazer"],
              casual_wear: ["tshirt","hoodie", "jacket", "sweatshirt","sweatpants"],
              outdoor_beach: [],
              outdoor_mountain: ["hiking boots", "thermal wear", "hiking backpack", "fleece jacket"],
              outdoor_desert: [],
              other_clothes: ["underwear", "socks", "pyjama", "thermal socks","base layers"],
              shoes: ["sneakers", "hiking boots", "casual shoes"],
              toiletries: ["shampoo", "conditioner", "toothpaste", "toothbrush","deodorant"],
              electronics: ["phone charger", "camera","power bank","headphones","travel adapter"],
              accessories: ["gloves", "beanie", "scarf"],
              miscellaneous: ["water bottle","first aid kit"]
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
                smart_wear: ["dress", "blouse", "skirt","trousers"],
                casual_wear: ["tshirt", "jeans", "shorts", "jacket", "loungewear"],
                outdoor_beach: [],
                outdoor_mountain: [],
                outdoor_desert: [],
                other_clothes: ["underwear", "socks", "pyjama"],
                shoes: ["sneakers", "dress shoes", "sandals","boots"],
                toiletries: ["shampoo","conditioner","toothpaste","toothbrush","sunscreen","deodorant","face wash","moisturizer","hair brush","lip balm"],
                electronics: ["phone charger", "camera","power bank","headphones","travel adapter"],
                accessories: ["hat","scarf","jewelry","umbrella"],
                miscellaneous: ["travel pillow","water bottle"]
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
              smart_wear: ["shirt", "trousers", "blazer", "tie"],
              casual_wear: ["tshirt", "jeans", "hoodie", "jacket", "sweatshirt","sweatpants"],
              outdoor_beach: [],
              outdoor_mountain: ["hiking boots", "hiking backpack"],
              outdoor_desert: [],
              other_clothes: ["underwear", "socks", "pyjama"],
              shoes: ["sneakers", "hiking boots", "casual shoes"],
              toiletries: ["shampoo", "conditioner", "toothpaste", "toothbrush","deodorant"],
              electronics: ["phone charger", "camera","power bank","headphones","travel adapter"],
              accessories: ["scarf", "hat","belt"],
              miscellaneous: ["water bottle","first aid kit"]
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
              smart_wear: ["dress", "blouse", "skirt", "scarf"],
              casual_wear: ["tshirt", "shorts", "jeans"],
              outdoor_beach: [],
              outdoor_mountain: [],
              outdoor_desert: ["lightweight clothing", "sweat-wicking shirts"],
              other_clothes: ["underwear", "socks", "pyjama"],
              shoes: ["sneakers", "desert boots", "sandals"],
              toiletries: ["shampoo","conditioner","toothpaste","toothbrush","sunscreen","deodorant","face wash","moisturizer","hair brush","lip balm"],
                electronics: ["phone charger", "camera","power bank","headphones","travel adapter"],
                accessories: ["sunglasses", "hat","scarf"],
                miscellaneous: ["water bottle"]
            }
          }
      ]

module.exports = {data}