class Location {
  constructor(locationJSON) {
    this.id = locationJSON.id
    this.name = locationJSON.name
    this.lat = locationJSON.lat
    this.long = locationJSON.long
    this.photo = locationJSON.photo
  }

  renderLi() {
    return `<li data-id=${this.id}><img ${this.photo}>${this.name}</li>`
  }
}
