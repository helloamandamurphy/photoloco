class Location {
  constructor(locationJSON) {
    this.id = locationJSON.id
    this.name = locationJSON.name
    this.lat = locationJSON.lat
    this.long = locationJSON.long
    this.photo = locationJSON.photos[0].url
  }

  renderLi() {
    return `<li data-id=${this.id}><img src=${this.photo}>${this.name}</li>`
  }
}
