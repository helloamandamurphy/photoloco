class Locations {
  constructor() {
    this.locations = []
    this.adapter = new LocationsAdapter()
    this.initBindingsAndEventListeners()
    this.fetchAndLoadLocations()
  }

  initBindingsAndEventListeners() {
    this.locationsContainer = document.getElementById('locations-container')
    this.newLocationName = document.getElementById('new-location-name')
    this.newLocationLat = document.getElementById('new-location-lat')
    this.newLocationLong = document.getElementById('new-location-long')
    this.locationForm = document.getElementById('new-location-form')
    this.locationForm.addEventListener('submit', this.createLocation.bind(this))
  }

  createLocation(e){
    e.preventDefault()
    const name = this.newLocationName.value
    const lat = this.newLocationLat.value
    const long = this.newLocationLong.value

    this.adapter.createLocation(name, lat, long).then(location => {
      this.locations.push(new Location(location))
      this.resetField()
      this.render()
    })

  }

  fetchAndLoadLocations() {
    this.adapter
      .getLocations()
      .then(locations => {
        locations.forEach(location => this.locations.push(new Location(location)))
    })
    .then(() => {
      this.render()
    })
  }

  resetField() {
    this.newLocationName.value = ''
    this.newLocationLat.value = ''
    this.newLocationLong.value = ''
  }

  render() {
    this.locationsContainer.innerHTML = this.locations.map(location => location.renderLi()).join('')

  }
}
