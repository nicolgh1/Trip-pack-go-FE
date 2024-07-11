import axios from 'axios'


const googleApi = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api'
})

export const fetchLatLngOlatLngObj = (address) => {
    return googleApi.get(`/geocode/json?address=${address}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`)
    .then(({data}) => {
        return data.results[0].geometry.location 
    })
}

export const fetchAttractions = (latLngObj, radiusInMeters, type ) => {
    return googleApi.get(`/place/nearbysearch/json?location=${latLngObj.lat},${latLngObj.lng}&radius=${radiusInMeters}&type=${type}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`)
    .then(({data}) => {
        return data.results 
    })

}

export const fetchPlaceSuggestions = (input) => {
    return googleApi.get(`/place/autocomplete/json?input=${input}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`)
      .then(({ data }) => {
        return data.predictions; 
      });
  };