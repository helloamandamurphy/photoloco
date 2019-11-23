//This talks to the backend API
class LocationsAdapter {
  constructor() {
    this.baseUrl =
    'http://localhost:3000/api/v1/locations'
    //Oh hey, computer, this is where we want
    //to pull the JSON from
  }

  getLocations() {
    return fetch(this.baseUrl).then(res => res.json()

    //This gets the Location information from the database
    //.json() returns "a Promise that resolves to a JS object.
    //This object could be anything that can be represented by JSON
    // — an object, an array, a string, a number..." -MDN
    )
  }

  createLocation(name, lat, long, photo) {
    const locationData = {
      name: name,
      lat: lat,
      long: long,
      photo: {
        url: photo
      }
    }

    return fetch(this.baseUrl,{
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(locationData)
    }).then(res => res.json())
  }
}
