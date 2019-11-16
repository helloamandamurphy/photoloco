class Locations {
  constructor() {
    this.locations = []
    this.adapter = new LocationsAdapter()
    this.initBindingsAndEventListeners()
    this.fetchAndLoadLocations()
  }

  initBindingsAndEventListeners() {
    this.locationsContainer = document.getElementById('locations-container')
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

  render() {
    this.locationsContainer.innerHTML = this.locations.map(location => location.renderLi()).join('')

  }
}
