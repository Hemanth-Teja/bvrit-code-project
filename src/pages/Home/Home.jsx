import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Home.css";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [orderBy, setOrderBy] = useState("score");
  const [order, setOrder] = useState("desc");
  const [id, setId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        const response = await axios.get("http://localhost:5000/api/users/userdata", {
          headers: { Authorization: token },
        });

        console.log("API Response:", response.data); // Log response structure

        

        const usersData = response.data.info;
        setId(response.data.id || null);

        // Sorting users based on score
        const sortedUsers = usersData.sort((a, b) => b.score - a.score);
        setUsers(sortedUsers);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, []);

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");

    const sortedUsers = [...users].sort((a, b) =>
      isAsc ? a[property] - b[property] : b[property] - a[property]
    );

    setUsers(sortedUsers);
    setOrderBy(property);
  };

  return (
    <div className="home">
      <h1>Welcome to BVRIT's AlgoNest...!</h1>
      <p>
        AlgoNest – The ultimate platform for BVRIT students to master Data Structures & Algorithms and excel in coding!
      </p>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th onClick={() => handleSort("no_of_problems_solved")} className="sortable">
                Problems Solved ⬆⬇
              </th>
              <th onClick={() => handleSort("score")} className="sortable">
                Score ⬆⬇
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className={id === user._id ? "active" : ""}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.no_of_problems_solved}</td>
                <td>{user.score}</td>
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
