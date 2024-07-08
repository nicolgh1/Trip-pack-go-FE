const tf = require('@tensorflow/tfjs-node')
const {data} = require('./trainingData')
const {temperatures,destinationTypes,activities,genders,smart_wear,casual_wear,outdoor_beach,outdoor_desert,outdoor_mountain,other_clothes,shoes,toiletries,electronics,accessories,miscellaneous} = require('./categoriesData')

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

const preprocessData = (data) => {
    const inputData = data.map(item => [
        ...encodeMultipleOneHot(item.input_preferences.temperature, temperatures),
        ...encodeMultipleOneHot(item.input_preferences.destination_type, destinationTypes),
        ...encodeMultipleOneHot(item.input_preferences.activities, activities),
        ...encodeOneHot(item.input_preferences.gender, genders)
    ])

    const outputData = data.map(item => [
        ...encodeMultipleOneHot(item.output_expected.smart_wear, smart_wear),
        ...encodeMultipleOneHot(item.output_expected.casual_wear, casual_wear),
        ...encodeMultipleOneHot(item.output_expected.outdoor_beach, outdoor_beach),
        ...encodeMultipleOneHot(item.output_expected.outdoor_desert, outdoor_desert),
        ...encodeMultipleOneHot(item.output_expected.outdoor_mountain, outdoor_mountain),
        ...encodeMultipleOneHot(item.output_expected.other_clothes, other_clothes),
        ...encodeMultipleOneHot(item.output_expected.shoes, shoes),
        ...encodeMultipleOneHot(item.output_expected.toiletries, toiletries),
        ...encodeMultipleOneHot(item.output_expected.electronics, electronics),
        ...encodeMultipleOneHot(item.output_expected.accessories, accessories),
        ...encodeMultipleOneHot(item.output_expected.miscellaneous, miscellaneous)
    ])

    return { inputData, outputData }
}


const padSequences = (sequences, maxLen) => {
    return sequences.map(seq => {
        if (seq.length < maxLen) {
            const padding = Array(maxLen - seq.length).fill(0)
            return seq.concat(padding)
        } else {
            return seq.slice(0, maxLen)
        }
    })
}

const { inputData, outputData } = preprocessData(data)

const maxInputLen = Math.max(...inputData.map(seq => seq.length))
const maxOutputLen = Math.max(...outputData.map(seq => seq.length))

const inputDataPadded = padSequences(inputData, maxInputLen)
const outputDataPadded = padSequences(outputData, maxOutputLen)

const xs = tf.tensor2d(inputDataPadded) 
const ys = tf.tensor2d(outputDataPadded)


const model = tf.sequential()
model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [xs.shape[1]] }))
model.add(tf.layers.dense({ units: 64, activation: 'relu' }))
model.add(tf.layers.dense({ units: ys.shape[1], activation: 'sigmoid' }))

model.compile({
    optimizer: tf.train.adam(0.04),
    loss: 'binaryCrossentropy',
    metrics: ['accuracy']
})

model.fit(xs, ys, {
    epochs: 50,
    batchSize: 32,
    validationSplit: 0.2,
    callbacks: {
      onEpochEnd: (epoch, logs) => console.log(`Epoch ${epoch}: loss = ${logs.loss}`)
    }
  }).then(() => {
    model.save('file://./model')
  })


