import React, { Component } from "react";
import LocationAutoComplete from "../LocationAutoComplete";
import "../../styles/form.css";
import ApiHandler from '../../api/apiHandler';

class ItemForm extends Component {
  state = {
    item: {
      name: "",
      description: "",
      image: "",
      category: "",
      quantity: 0,
      address: "",
      location: "",
      coordinates: [0,0],
      formattedAddress: "",
      id_user: "",
      timestamps: ""
    }
  };

  handleChange = (event) => {
    console.log("Wax On Wax Off");
    const key = event.target.name;
    const value = event.target.value;
    this.setState({
      item: {
        ...this.state.item,
        [key]: value,
      },
    });
  };

  

  handleSubmit = (event) => {
    event.preventDefault();

    const fd = new FormData();

    for (let key in this.state.item) {
      fd.append(key, this.state[key]);
    }

    // fd.append("image", this.imageRef.current.files[0]);
    // this.context.signup(fd);
    

    // In order to send back the data to the client, since there is an input type file you have to send the
    // data as formdata.
    // The object that you'll be sending will maybe be a nested object, in order to handle nested objects in our form data
    // Check out the stackoverflow solution below : )

    // Nested object into formData by user Vladimir "Vladi vlad" Novopashin @stackoverflow : ) => https://stackoverflow.com/a/42483509
  

    ApiHandler
    .createItems({
      name: this.state.name,
      description: this.state.description,
      category: this.state.category,
      quantity: this.state.quantity,
      address: this.state.address,
      location: this.state.location,
      id_user: this.state.id_user,
      image: this.state.image,
    })
    .then((apiRes) => {
        console.log(
          "handlesubmit updated"
        );
      })
    .catch((error) => console.log(error));
  };

  handlePlace = (place) => {
    console.log(place.geometry.coordinates);
    const coordinates = place.geometry.coordinates;
    // const longi= place.geometry.coordinates[1]
    // const value = place.target.value;
    this.setState({
      coordinates})
    
    // This handle is passed as a callback to the autocomplete component.
    // Take a look at the data and see what you can get from it.
    // Look at the item model to know what you should retrieve and set as state.
    console.log(place);
  };

  render() {
    console.log(this.state)
    return (
      <div className="ItemForm-container">
        <form className="form" onSubmit={this.handleSubmit}>
          <h2 className="title">Add Item</h2>

          <div className="form-group">
            <label className="label" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              className="input"
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              placeholder="What are you giving away ?"
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="category">
              Category
            </label>

            <select id="category" defaultValue="-1">
              <option value="-1" disabled>
                Select a category
              </option>
              <option value="Plant">Plant</option>
              <option value="Kombucha">Kombucha</option>
              <option value="Vinegar">Vinegar</option>
              <option value="Kefir">Kefir</option>
            </select>
          </div>

          <div className="form-group">
            <label className="label" htmlFor="quantity">
              Quantity
            </label>
            <input className="input" id="quantity" type="number" value={this.state.quantity} name="quantity"/>
          </div>

          <div className="form-group">
            <label className="label" htmlFor="location">
              Address
            </label>
            <LocationAutoComplete onSelect={this.handlePlace} />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              className="text-area"
              placeholder="Tell us something about this item"
            ></textarea>
          </div>

          <div className="form-group">
            <label className="custom-upload label" htmlFor="image">
              Upload image
            </label>
            <input className="input" id="image" type="file" value={this.state.image} name="image"/>
          </div>

          <h2>Contact information</h2>

          <div className="form-group">
            <label className="label" htmlFor="contact">
              How do you want to be reached?
            </label>
            <div>
              <input type="radio" value={this.state.email} name="email"/>
              user email
            </div>
            <input type="radio" value={this.state.contact} name="contact" />
            contact phone number
          </div>

          <p className="message">
            <img src="/media/info.svg" alt="info" />
            Want to be contacted by phone? Add your phone number in your
            personal page.
          </p>

          <button className="btn-submit">Add Item</button>
        </form>
      </div>
    );
  }
}

export default ItemForm;
