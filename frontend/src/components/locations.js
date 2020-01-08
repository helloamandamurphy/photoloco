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
      this.likeListener()
      this.viewMoreListener()
      this.sortListener()
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
      this.viewMoreListener()
      this.sortListener()
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
    this.locationsContainer.innerHTML = this.locations.map(location => location.renderCard()).join('')
  }

// LIKES
  likeListener() {
    this.buttons = document.getElementsByTagName('button')

    this.buttons.forEach(button =>
      button.addEventListener("click", this.likeIncrement.bind(this))
    )
  }

  likeIncrement(e) {
    const likes = parseInt(e.target.value)
    const newValue = likes + 1
    const id = parseInt(e.target.id)

    e.target.innerText = `${newValue} Likes`
    e.target.value = newValue

    this.adapter.updateLike(id, newValue)
  }

// VIEW MORE PHOTOS
  viewMoreListener() {
    this.viewMores = document.getElementsByClassName('view-more')
    this.viewMores.forEach(viewMore =>
      viewMore.addEventListener("click", this.viewMore.bind(this))
    )
  }

  viewMore(e) {
    //There has to be a cleaner way to do this, but it works for now.
    //Need to remove first image from the additional photos, but backend method currently isn't working.
    e.preventDefault()
    const locationsUrl = "http://localhost:3000/api/v1/locations"
    const photosContainer = e.target.parentElement.parentElement.querySelector('div.more-photos')
    const locationId = parseInt(e.target.id)

    fetch(`${locationsUrl}/${locationId}`)
      .then(res => res.json())
        .then(location => {
          const locationName = location.name
          photosContainer.innerHTML = location.photos.map(photo =>
          `<img class="card-img" src="${photo.url}" alt"${locationName}">`).join('')
        })
  }

  // SORT FEATURE
  sortListener() {
    this.sortButton = document.getElementById('sort-button')
    this.sortButton.addEventListener("click", this.sortLocations.bind(this))
  }

  sortLocations() {
    //This is currently sorting the locations alphabetically in the this.locations array,
    //but I have not yet been able to render it sorted yet.

    // e.preventDefault() Not sure if this is necessary here.
    fetch('http://localhost:3000/api/v1/locations').then(res => res.json())
      .then(locations => {
        // Are these two lines necessary? Could we just manipulate the this.locations array,
        //since it's declared in the constructor?
        this.locations = locations.sort(function(a,b) {
          let nameA = a.name;
          let nameB = b.name;

          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          return 0;
        }
      )
    })
      .then(() => {
        this.render()
        //render() calls on renderCard() in the Location.js file, and this is where it is currently breaking.
        //Currently getting this error:
            // locations.js:79 Uncaught (in promise) TypeError: location.renderCard is not a function
            //     at locations.js:79
            //     at Array.map (<anonymous>)
            //     at Locations.render (locations.js:78)
            //     at locations.js:156
            // (anonymous)	@	locations.js:79
            // render	@	locations.js:78
            // (anonymous)	@	locations.js:156
            // Promise.then (async)
            // sortLocations	@	locations.js:155
        this.likeListener()
        this.viewMoreListener()
        // this.sortListener() Don't think this is necessary here.
      })
  }
}
