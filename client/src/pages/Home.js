import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Home = () => {
  const [users, setUsers] = useState([]);
  const [render, setRender] = useState(false);
  const [input, setInput] = useState({
    name: "",
    email: "",
    age: "",
  });
  useEffect(() => {
    const getAllData = async () => {
      const res = await axios.get("http://localhost:9000/api/v1/users");
      setUsers(res.data);
    };
    getAllData();
  }, [render]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:9000/api/v1/users", input);
    setRender(true);
    setInput({
      name: "",
      email: "",
      age: "",
    });
  };

  const handelDelete = async (id) => {
    await axios.delete(`http://localhost:9000/api/v1/users/${id}`);
    const newUsers = users.filter((item) => {
      return item._id !== id;
    });
    setUsers(newUsers);
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12 ">
            <div style={{ backgroundColor: "#00173b" }}>
              <h1 className="text-white text-center mt-2">Candidate List</h1>
            </div>
            <hr></hr><h4><center>Enter the seat number alloted to you along with your full name and correct email id.</center></h4><hr></hr>
          </div>
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Name
                </label>
                <input
                  name="name"
                  value={input.name}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Email
                </label>
                <input
                  name="email"
                  value={input.email}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                  type="email"
                  class="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Seat Number
                </label>
                <input
                  value={input.age}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                  name="age"
                  type="number"
                  class="form-control"
                  id="exampleInputPassword1"
                />
              </div>

              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
          
          <div className="col-md-6">
            <table class="table">
            
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email ID</th>
                  <th scope="col">Seat Number</th>
                  <th scope="col">Update</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              
              <tbody>
                {users &&
                  users.map((user) => {
                    return (
                      <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.age}</td>
                        <td>
                          <Link to={`/edit/${user._id}`}>
                            <button className="btn btn-primary">Update</button>
                          </Link>
                        </td>
                        <td>
                          <button
                            onClick={() => handelDelete(user._id)}
                            className="btn btn-danger"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
