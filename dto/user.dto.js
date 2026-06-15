class UserDto {
  constructor(model) {
    this.name = model.name
    this.age = model.age
    this.email = model.email
    this.isActivated = model.isActivated
    this.id = model._id
  }
}

module.exports = { UserDto }
