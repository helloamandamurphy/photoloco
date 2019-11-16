class Locations {
  constructor() {
    this.locations = []
    this.adapter = new LocationsAdapter()
    //this.bindEventListeners()
    this.fetchAndLoadLocations()
  }

  fetchAndLoadLocations() {
    this.adapter.getLocations().then(locations => {
      locations.forEach(location => this.locations.push(location))
    })
    .then(() => {
      this.render()
    })
  }

  render() {
    const locationsContainer = document.getElementById('locations-container')
    locationsContainer.innerHTML = 'Test Locations'
  }
}
