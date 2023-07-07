import React, { useState } from "react";

function UpdateHotels() {
  const [formData, setFormData] = useState({
    name: "",
    image_url: "",
    description: "",
    location: "",
    prices: "",
  });

  function handleSubmit(e) {
    e.preventDefault();

    const newHotels = {
      name: formData.name,
      image_url: formData.image_url,
      description: formData.description,
      location: formData.location,
      prices: formData.prices,
    };

    fetch("/hotel", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newHotels),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <div>
      <form className="hotel-form" onSubmit={handleSubmit}>
        <h2 className="upd-htl" style={{ textAlign: "center" }}>
          Update Hotel
        </h2>

        <label>Name: </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <label>Description: </label>
        <input
          type="text"
          id="describe"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />

        <label>Location: </label>
        <input
          type="text"
          id="loca"
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
        />

        <label>Price: </label>
        <input
          type="text"
          id="pric"
          value={formData.prices}
          onChange={(e) => setFormData({ ...formData, prices: e.target.value })}
        />

        <label>Enter Image URL:</label>
        <input
          type="text"
          id="url"
          value={formData.image_url}
          onChange={(e) =>
            setFormData({ ...formData, image_url: e.target.value })
          }
        />

        <button type="submit" id="sub1">
          UPDATE
        </button>
      </form>
    </div>
  );
}

export default UpdateHotels;
