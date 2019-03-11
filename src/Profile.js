import React, { Component } from "react";

class Profile extends Component {
  state = {
    profile: null,
    error: ""
  };

  componentDidMount() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.props.auth.getUserProfile((profile, error) => {
      this.setState({ profile, error });
    });
  }

  render() {
    const { profile } = this.state;
    if (!profile) return null;
    const isEmailVerified = profile.email_verified;
    return (
      <div>
        <h1>Profile</h1>
        {isEmailVerified ? null : <p>Check your inbox to verify email</p>}
        <img
          src={profile.picture}
          alt=""
          style={{ maxHeight: 100, maxWidth: 100 }}
        />
        <p>
          {profile.given_name != null
            ? "Hello there " + profile.given_name + "!"
            : "Nickname: " + profile.nickname}
        </p>
        <p>
          Email: <a href={"mailto:" + profile.email}>{profile.email} </a>
        </p>
        {/* Regex removes all characters after a found pipe character | */}
        <p>You are authorized using: {profile.sub.replace(/\|.*$/, " ")}</p>
        {/* Show rest of profile info indented by 2 spaces */}
        <hr />
        <pre>
          {"Rest of your auth data is listed here: \n" +
            JSON.stringify(profile, null, 2)}
        </pre>{" "}
      </div>
    );
  }
}

export default Profile;
