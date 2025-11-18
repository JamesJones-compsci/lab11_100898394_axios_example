import React, { Component } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

class PersonList extends Component {
  state = {
    persons: [],
    loading: true,
    error: null,
    selectedPerson: null,
    showModal: false,
  };

  componentDidMount() {
    axios
      .get("https://randomuser.me/api/?results=2")
      .then((res) => {
        this.setState({ persons: res.data.results, loading: false });
      })
      .catch((err) => {
        this.setState({ error: err.message, loading: false });
      });
  }

  openDetails = (person) => {
    this.setState({ selectedPerson: person, showModal: true });
  };

  closeDetails = () => {
    this.setState({ showModal: false, selectedPerson: null });
  };

  render() {
    const { persons, loading, error, selectedPerson, showModal } = this.state;

    if (loading) return <div>Loading persons...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
      <div className="container mt-3">

        {/* USER LIST HEADER */}
        <h2
          className="text-center p-3"
          style={{ backgroundColor: "#8BC34A", color: "black" }}
        >
          User List
        </h2>

        {/* USERS STACKED VERTICALLY */}
        <div className="mt-3">
          {persons.map((p, index) => (
            <div
              key={index}
              className="d-flex align-items-center mb-3 p-3"
              style={{
                backgroundColor: "#40E0D0",
                color: "black",
                borderRadius: "8px",
              }}
            >
              {/* USER PICTURE + DETAILS BUTTON */}
              <div
                className="me-3 d-flex flex-column align-items-center"
                style={{ flex: "0 0 30%" }}
              >
                <img
                  src={p.picture.medium}
                  alt=""
                  className="rounded-circle mb-2"
                  style={{ width: "100%", height: "auto", objectFit: "cover" }}
                />
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => this.openDetails(p)}
                >
                  Details
                </Button>
              </div>

              {/* USER INFO */}
              <div style={{ flex: "1" }}>
                <h5>{p.name.title}. {p.name.first} {p.name.last}</h5>
                <p><strong>Gender:</strong> {p.gender}</p>
                <p><strong>Email:</strong> {p.email}</p>
                <p><strong>Time Zone:</strong> {p.location.timezone.description}</p>
                <p><strong>Address:</strong> {p.location.street.number} {p.location.street.name}, {p.location.city}, {p.location.country}</p>
                <p><strong>Birth Date:</strong> {p.dob.date.slice(0,10)}</p>
                <p><strong>Age:</strong> {p.dob.age}</p>
                <p><strong>Registered:</strong> {p.registered.date.slice(0,10)}</p>
                <p><strong>Phone:</strong> {p.phone}</p>
                <p><strong>Cell:</strong> {p.cell}</p>
              </div>
            </div>
          ))}
        </div>

        {/* DETAILS MODAL */}
        {selectedPerson && (
          <Modal show={showModal} onHide={this.closeDetails}>
            <Modal.Header closeButton>
              <Modal.Title>User Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img
                src={selectedPerson.picture.large}
                alt=""
                className="img-fluid rounded-circle mb-3"
              />
              <p><strong>Name:</strong> {selectedPerson.name.first} {selectedPerson.name.last}</p>
              <p><strong>Gender:</strong> {selectedPerson.gender}</p>
              <p><strong>Email:</strong> {selectedPerson.email}</p>
              <p><strong>Phone:</strong> {selectedPerson.phone}</p>
              <p><strong>Cell:</strong> {selectedPerson.cell}</p>
              <p><strong>Address:</strong> {selectedPerson.location.street.number} {selectedPerson.location.street.name}, {selectedPerson.location.city}, {selectedPerson.location.country}</p>
              <p><strong>Birth Date:</strong> {selectedPerson.dob.date.slice(0, 10)}</p>
              <p><strong>Age:</strong> {selectedPerson.dob.age}</p>
              <p><strong>Registered:</strong> {selectedPerson.registered.date.slice(0, 10)}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.closeDetails}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}

      </div>
    );
  }
}

export default PersonList;
