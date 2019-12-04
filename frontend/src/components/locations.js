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

//This creates a new Location based on information
//submitted through the form, then renders it on the page
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

//This fetches all existing locations from the backend,
//and renders it on the page: backend renders JSON,
// the adapter sets the baseUrl where the JSON is rendered,
// getLocations uses a fetch request to pull the JSON
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
      this.likeListener()
    })
  }

//Resets form input value after form is submitted
  resetField() {
    this.newLocationName.value = ''
    this.newLocationLat.value = ''
    this.newLocationLong.value = ''
    this.newLocationPhoto.value = ''
  }

  render() {
    //render the Location list on the visible page by inserting it into the HTML
    this.locationsContainer.innerHTML = this.locations.map(location =>
      location.renderCard()).join('')
  }

  likeListener() {
    this.buttons = document.getElementsByTagName('button')
    let i = 0;
    for (i = 0; i < this.buttons.length; i++) {
      this.buttons[i].addEventListener("click", this.likeIncrement.bind(this))
    }
  }

  likeIncrement(e) {
    const likes = parseInt(e.target.value)
    const newValue = likes + 1
    const id = parseInt(e.target.id)

    e.target.innerText = `${newValue} Likes`
    e.target.value = newValue

    this.adapter.updateLike(id, newValue)
  }
}
