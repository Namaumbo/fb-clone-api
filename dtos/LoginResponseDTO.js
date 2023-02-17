class LoginResponseDTO {
  constructor(user) {
    this.id = user.id;
    this.userName = user.userName;
    this.email = user.email;
  }
}

module.exports = { LoginResponseDTO };
