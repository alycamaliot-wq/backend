class UserLoginDto {
  constructor(model) {
    this.email = model.email
    this.password = model.password
  }
}

module.exports = { UserLoginDto }
