class Location {
  constructor(locationJSON) {
    this.id = locationJSON.id
    this.name = locationJSON.name
    this.lat = locationJSON.lat
    this.long = locationJSON.long
    this.likes = locationJSON.likes
    this.photo = locationJSON.photos[0].url
    // this.photos = []
    // this.photoData = locationJSON.photos
  }

  renderCard() {
    return `
    <div class="card" data-id=${this.id}>
      <img class="card-img" src="${this.photo}" alt="${this.name}">

      <div class="more-photos">
      </div>

      <h2 class="card-title">${this.name}</h2>

      <div class="card-content">
        <ul>
          <li>Tag</li>
          <li>Tag</li>
          <li>Tag</li>
        </ul>

        <p class="view-more" id=${this.id}>View More Photos of ${this.name}</p>

        <a class="card-link" target=”_blank” href="http://www.google.com/maps/place/${this.lat},${this.long}">Find this Location</a>

        <button type='button' value=${this.likes} id=${this.id}>
          ${this.likes} Likes
          <span><i class="fas fa-thumbs-up"></i></span>
        </button>

      </div>
    </div>
    `
  }
}
