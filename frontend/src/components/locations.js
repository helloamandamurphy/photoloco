class Locations {
  constructor() {
    this.locations = []
    this.adapter = new LocationsAdapter()
    //this.bindEventListeners()
    this.fetchAndLoadLocations()
  }

  fetchAndLoadLocations() {
    this.adapter.getLocations().then(locations => {
      console.log(locations)
    })
  }
}
