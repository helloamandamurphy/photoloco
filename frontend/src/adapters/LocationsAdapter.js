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
}
