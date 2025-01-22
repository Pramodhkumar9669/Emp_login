import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function EmployeeDashboard() {
  const [employees, setEmployees] = useState([]);
  const [editableId, setEditableId] = useState(null);
  const [editedData, setEditedData] = useState({
    fullName: "",
    jobTitle: "",
    department: "",
    location: "",
    age: "",
    salary: "",
  });

  const [filterDepartment, setFilterDepartment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    try {
      const response = await fetch("http://localhost:2001/userData/getusers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEmployees(data);
      } else {
        console.error("Error fetching employees:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const toggleEdit = (id) => {
    const employee = employees.find((emp) => emp._id === id);
    if (employee) {
      setEditableId(id);
      setEditedData({ ...employee });
    } else {
      setEditableId(null);
      resetEditedData();
    }
  };

  const saveEdit = async (id) => {
    try {
      const response = await fetch(`http://localhost:2001/userData/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedData),
      });

      if (response.ok) {
        const updatedEmployee = await response.json();
        setEmployees((data) =>
          data.map((emp) => (emp._id === id ? { ...emp, ...updatedEmployee } : emp))
        );
        setEditableId(null);
        resetEditedData();
      } else {
        console.error("Error saving edit:", response.statusText);
      }
    } catch (err) {
      console.error("Error saving edit:", err);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      const response = await fetch(`http://localhost:2001/userData/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setEmployees((data) => data.filter((emp) => emp._id !== id));
      } else {
        console.error("Error deleting employee:", response.statusText);
      }
    } catch (err) {
      console.error("Error deleting employee:", err);
    }
  };

  const resetEditedData = () => {
    setEditedData({
      fullName: "",
      jobTitle: "",
      department: "",
      location: "",
      age: "",
      salary: "",
    });
  };

  // Pagination
  const totalPages = Math.ceil(employees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const filteredEmployees = employees.filter((emp) =>
    filterDepartment ? emp.department.toLowerCase().includes(filterDepartment.toLowerCase()) : true
  );

  const currentEmployees = filteredEmployees.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  // Data for the pie chart
  const departmentCounts = employees.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1;
    return acc;
  }, {});

  const pieChartData = {
    labels: Object.keys(departmentCounts).map(
      (dept) =>` ${dept} (${departmentCounts[dept]})`//it shows the count of employees besides the label by dept wise
    ),
    datasets: [
      {
        label: "Employees by Department",
        data: Object.values(departmentCounts),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  return (
    <div className="App">
      <h2
        style={{
          margin: "15px",
          textAlign: "left",
          color: "#007bff",
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 8px rgb(225, 220, 220)",
          padding: "10px",
          height: "60px",
        }}
      >
        List Of Employees
      </h2>

      <div style={{ display: "flex", gap: "20px" }}>
        {/* Table Section */}
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="department-filter">Filter by Department: </label>
            <input
              id="department-filter"
              type="text"
              value={filterDepartment}
              onChange={(e) => {
                setFilterDepartment(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Enter department"
            />
          </div>

          <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Job Title</th>
                <th>Department</th>
                <th>Location</th>
                <th>Age</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.map((emp) => (
                <tr key={emp._id}>
                  {editableId === emp._id ? (
                    <>
                      <td>
                        <input
                          type="text"
                          value={editedData.fullName}
                          onChange={(e) =>
                            setEditedData({ ...editedData, fullName: e.target.value })
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={editedData.jobTitle}
                          onChange={(e) =>
                            setEditedData({ ...editedData, jobTitle: e.target.value })
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={editedData.department}
                          onChange={(e) =>
                            setEditedData({ ...editedData, department: e.target.value })
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={editedData.location}
                          onChange={(e) =>
                            setEditedData({ ...editedData, location: e.target.value })
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={editedData.age}
                          onChange={(e) =>
                            setEditedData({ ...editedData, age: e.target.value })
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={editedData.salary}
                          onChange={(e) =>
                            setEditedData({ ...editedData, salary: e.target.value })
                          }
                        />
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{emp.fullName}</td>
                      <td>{emp.jobTitle}</td>
                      <td>{emp.department}</td>
                      <td>{emp.location}</td>
                      <td>{emp.age}</td>
                      <td>{emp.salary}</td>
                    </>
                  )}
                  <td>
                    {editableId === emp._id ? (
                      <>
                        <button onClick={() => saveEdit(emp._id)}>Save</button>
                        <button onClick={() => toggleEdit(null)}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => toggleEdit(emp._id)}>Edit</button>
                        <button
                          className="delete"
                          onClick={() => deleteEmployee(emp._id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <button onClick={handlePrev} disabled={currentPage === 1}>
              Previous
            </button>
            <span style={{ margin: "0 10px" }}>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={handleNext} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </div>

        {/* Pie Chart Section */}
        <div style={{ flexBasis: "400px", textAlign: "center" }}>
          <h3>Employees by Department</h3>
          <div style={{ marginBottom: "10px", fontWeight: "bold" }}>
            Total Employees: {employees.length}
          </div>
          <Pie data={pieChartData} />
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
