class Location {
  constructor(locationJSON) {
    this.id = locationJSON.id
    this.name = locationJSON.name
    this.lat = locationJSON.lat
    this.long = locationJSON.long
  }

  renderLi() {
    return `<li data-id=${this.id}>${this.name}</li>`
  }
}
