const tf = require('@tensorflow/tfjs-node')
const {data} = require('./trainingData')

const encodeStrings = (data, vocabulary) => {
    return data.map(item => vocabulary.indexOf(item));
}


const locationVocab = [...new Set(data.map(item => item.input_preferences.location))]
const temperatureVocab = [...new Set(data.flatMap(item => item.input_preferences.temperature))]
const destinationTypeVocab = [...new Set(data.flatMap(item => item.input_preferences.destination_type))]
const activitiesVocab = [...new Set(data.flatMap(item => item.input_preferences.activities))]
const packingMustsVocab = [...new Set(data.flatMap(item => item.input_preferences.packing_musts))]
const genderVocab = [...new Set(data.map(item => item.input_preferences.gender))]

const smartWearVocab = [...new Set(data.map(item => item.output_expected.smart_wear))]
const casualWearVocab = [...new Set(data.map(item => item.output_expected.casual_wear))]
const outdoorBeachVocab = [...new Set(data.map(item => item.output_expected.outdoor_beach))]
const outdoorMountainVocab = [...new Set(data.map(item => item.output_expected.outdoor_mountain))]
const outdoorDesertVocab = [...new Set(data.map(item => item.output_expected.outdoor_desert))]
const otherClothesVocab = [...new Set(data.map(item => item.output_expected.other_clothes))]
const shoesVocab = [...new Set(data.map(item => item.output_expected.shoes))]
const toiletriesVocab = [...new Set(data.map(item => item.output_expected.toiletries))]
const electronicsVocab = [...new Set(data.map(item => item.output_expected.electronics))]
const accessoriesVocab = [...new Set(data.map(item => item.output_expected.accessories))]
const miscellaneousVocab = [...new Set(data.map(item => item.output_expected.miscellaneous))]



const preprocessData = (data) => {
    const inputData = data.map(item => [
        ...encodeStrings([item.input_preferences.location], locationVocab),
        ...encodeStrings(item.input_preferences.temperature, temperatureVocab),
        ...encodeStrings(item.input_preferences.destination_type, destinationTypeVocab),
        ...encodeStrings(item.input_preferences.activities, activitiesVocab),
        ...encodeStrings(item.input_preferences.packing_musts, packingMustsVocab),
        ...encodeStrings([item.input_preferences.gender], genderVocab)
    ]);

    const outputData = data.map(item => [
        ...encodeStrings(item.output_expected.packing_musts, packingMustsVocab),
        ...encodeStrings(item.output_expected.smart_wear, smartWearVocab), 
        ...encodeStrings(item.output_expected.casual_wear, casualWearVocab), 
        ...encodeStrings(item.output_expected.outdoor_beach, outdoorBeachVocab), 
        ...encodeStrings(item.output_expected.outdoor_mountain, outdoorMountainVocab), 
        ...encodeStrings(item.output_expected.outdoor_desert, outdoorDesertVocab), 
        ...encodeStrings(item.output_expected.other_clothes, otherClothesVocab), 
        ...encodeStrings(item.output_expected.shoes, shoesVocab), 
        ...encodeStrings(item.output_expected.toiletries, toiletriesVocab), 
        ...encodeStrings(item.output_expected.electronics, electronicsVocab), 
        ...encodeStrings(item.output_expected.accessories, accessoriesVocab), 
        ...encodeStrings(item.output_expected.miscellaneous, miscellaneousVocab) 
    ])

      return { inputData, outputData }
}

function padSequences(sequences, maxLen) {
    return sequences.map(seq => {
        if (seq.length < maxLen) {
            const padding = Array(maxLen - seq.length).fill(0);
            return seq.concat(padding);
        } else {
            return seq.slice(0, maxLen);
        }
    });
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
model.add(tf.layers.dense({ units: ys.shape[1], activation: 'softmax' }))

model.compile({
    optimizer: 'adam',
    loss: 'categoricalCrossentropy',
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
    model.save('file://./model');
  })


  