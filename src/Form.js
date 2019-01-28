import React from 'react';

const encode = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", email: "", message: "", type: "general" };
  }

  /* Here’s the juicy bit for posting the form submission */

  handleSubmit = e => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...this.state, })
     
    })
      .then(() => alert("Success!"))
      .catch(error => alert(error));

    e.preventDefault();
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleType = e => this.setState({ type: e.target.value })

  render() {
    const { name, email, message } = this.state;
    return (
      <form
        name="contact"
        method="POST"
        onSubmit={this.handleSubmit}
        data-netlify="true"
      >
        <input type="hidden" name="form-name" value="contact" />
        <p>
          <label>Your Role:
            <select name="role[]" multiple>
              <option value="leader">Leader</option>
              <option value="follower">Follower</option>
            </select>
          </label>
        </p>
        <p>
          <label for="general">general<input onChange={this.handleType} type="radio" name="form-radio" value="general" /></label>
          <label for="quote">quote<input onChange={this.handleType} type="radio" name="form-radio" value="quote" /></label>
        </p>
        <p>
          <label>
            Your Name:
            <input type="text" name="name" value={name} onChange={this.handleChange} />
          </label>
        </p>
        <p>
          <label>
            Your Email:
            <input type="email" name="email" value={email} onChange={this.handleChange} />
          </label>
        </p>
        <p>
          <label>
            Message:
            <textarea name="message" value={message} onChange={this.handleChange} />
          </label>
        </p>
        <p>
          <button name="submit" type="submit">Send</button>
        </p>
      </form>
    );
  }
}