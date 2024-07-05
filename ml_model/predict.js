const tf = require('@tensorflow/tfjs-node')
const {temperatures,destinationTypes,activities,genders,smart_wear,casual_wear,outdoor_beach,outdoor_desert,outdoor_mountain,other_clothes,shoes,toiletries,electronics,accessories,miscellaneous} = require('./categoriesData')

const loadModel = async () => {
    const model = await tf.loadLayersModel('file://./model/model.json')
    return model
}
const encodeOneHot = (item, category) => {
    const encoding = Array(category.length).fill(0)
    const index = category.indexOf(item)
    if (index !== -1) encoding[index] = 1
    return encoding
}

const encodeMultipleOneHot = (items, category) => {
    const encoding = Array(category.length).fill(0)
    items.forEach(item => {
        const index = category.indexOf(item)
        if (index !== -1) encoding[index] = 1
    })
    return encoding
}

const preprocessInput = (inputPreferences) => {
    const input = [
      ...encodeMultipleOneHot(inputPreferences.temperature, temperatures),
      ...encodeMultipleOneHot(inputPreferences.destination_type, destinationTypes),
      ...encodeMultipleOneHot(inputPreferences.activities, activities),
      ...encodeOneHot(inputPreferences.gender, genders),
    ]
    return input
  }

  const predictPackingList = async (inputPreferences) => {
    const model = await loadModel()
    const preprocessedInput = preprocessInput(inputPreferences)
    const inputTensor = tf.tensor2d([preprocessedInput])
    const prediction = model.predict(inputTensor)
  
    const predictedPackingList = prediction.arraySync()[0]
    return predictedPackingList
  }

  const decodeOneHot = (encoding, category) => {
    return encoding.reduce((items, value, index) => {
      if (value === 1) items.push(category[index])
      return items
    }, [])
  }
  
  const postprocessOutput = (prediction) => {
    const numCategories = {
      smart_wear: smart_wear.length,
      casual_wear: casual_wear.length,
      outdoor_beach: outdoor_beach.length,
      outdoor_mountain: outdoor_mountain.length,
      outdoor_desert: outdoor_desert.length,
      other_clothes: other_clothes.length,
      shoes: shoes.length,
      toiletries: toiletries.length,
      electronics: electronics.length,
      accessories: accessories.length,
      miscellaneous: miscellaneous.length,
    }
  
    let currentIndex = 0
    const outputExpected = {}
  
    for (const category in numCategories) {
      const categoryLength = numCategories[category]
      const categoryEncoding = prediction.slice(currentIndex, currentIndex + categoryLength)
      outputExpected[category] = decodeOneHot(categoryEncoding, eval(category))
      currentIndex += categoryLength
    }
  
    return outputExpected
  }

  const sampleInput = {
    temperature: ["cold"],
    destination_type: ["city"],
    activities: ["Sightseeing", "Dining", "Bars"],
    gender: "male",
  }
  
  predictPackingList(sampleInput).then(prediction => {
    const packingList = postprocessOutput(prediction)
    console.log('Predicted Packing List:', packingList)
  })