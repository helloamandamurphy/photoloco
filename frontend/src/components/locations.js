class Locations {
  //index.js instantiates App, which is defined in app.js >
  //app.js instantiates Locations, which is defined here.
  constructor() {
    //Create a new array of locations:
    this.locations = []
    //Make a fetch request to return a Promise
    //defined in LocationsAdapter.js:
    this.adapter = new LocationsAdapter()
    //Establish HTML elements as variables
    //so we can save the information from them:
    this.initBindingsAndEventListeners()
    //Load existing Locations, defined below:
    this.fetchAndLoadLocations()
  }

  initBindingsAndEventListeners() {
    this.locationsContainer = document.getElementById('locations-container')
    this.newLocationName = document.getElementById('new-location-name')
    this.newLocationLat = document.getElementById('new-location-lat')
    this.newLocationLong = document.getElementById('new-location-long')
    this.newLocationPhoto = document.getElementById('new-location-photo')
    this.locationForm = document.getElementById('new-location-form')
    this.locationForm.addEventListener('submit', this.createLocation.bind(this))
  }

  createLocation(e){
    e.preventDefault()
    const name = this.newLocationName.value
    const lat = this.newLocationLat.value
    const long = this.newLocationLong.value
    const photo = this.newLocationPhoto.value

    this.adapter.createLocation(name, lat, long, photo).then(location => {
      this.locations.push(new Location(location))
      this.resetField()
      this.render()
    })

  }

  fetchAndLoadLocations() {
    this.adapter
      .getLocations()
      .then(locations => {
        //Iterate over the JSON locations returned,
        //create a new instance of each (in location.js),
        //and push the new instance into our array
        //(defined in our Locations constructor.)
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
    this.newLocationPhoto.value = ''
  }

  render() {
    //render the Location list on the visible page by inserting it into the HTML
    this.locationsContainer.innerHTML = this.locations.map(location => location.renderLi()).join('')

  }
}
