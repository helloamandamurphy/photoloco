//This talks to the backend API
class LocationsAdapter {
  constructor() {
    this.baseUrl =
    'http://localhost:3000/api/v1/locations'
  }

  getLocations() {
    return fetch(this.baseUrl).then(res => res.json()
    )
  }

  createLocation(name, lat, long) {
    const locationData = {
      name: name,
      lat: lat,
      long: long
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
