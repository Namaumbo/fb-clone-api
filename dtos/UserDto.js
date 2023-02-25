class UserProfile {
  constructor(user) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.coverPicture= user.coverPicture;
    this.profilePicture=user.profilePicture;
    this.followers = user.followers;
    this.following = user.following;
  }
}

module.exports = {UserProfile}
