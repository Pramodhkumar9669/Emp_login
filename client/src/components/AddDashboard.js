import React, { useState } from "react";


function AddDashboard() {

  const [fullName, setfullName] = useState('');
  const [jobTitle, setjobTitle] = useState('');
  const [department, setdepartment] = useState('');
  const [location, setlocation] = useState('');
  const [age, setage] = useState('');
  const [salary, setsalary] = useState('');

  const sendSignupDataToServerThrouhFD = async () => {
 
    const data = {fullName,jobTitle,department,location,age, salary, 
    };
    
    console.log(data);

    const reqOption = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };

    try {
      const JSONData = await fetch("http://localhost:2001/userData/employeecreate", reqOption);
      const JSOData = await JSONData.json();
      console.log(JSOData);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="App">
      <br />
      <form>
        <h1 style={{ textAlign: "center", color: "#007bff" }}>Employee Registration</h1>
        <div>
          <label>Full Name: </label>
          <input className="addinput"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setfullName(e.target.value)}
          />
        </div>
        <div>
          <label>Job Title: </label>
          <input className="addinput"
            placeholder="Job Title"
            value={jobTitle}
            onChange={(e) => setjobTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Department: </label>
          <input className="addinput"
            placeholder="Department"
            value={department}
            onChange={(e) => setdepartment(e.target.value)}
          />
        </div>
        <div>
          <label>Location: </label>
          <input  className="addinput"
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setlocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Age: </label>
          <input className="addinput"
            type="Age"
            placeholder="Age"
            value={age}
            onChange={(e) => setage(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Salary: </label>
          <input className="addinput"
            placeholder="Salary"
            value={salary}
            onChange={(e) => setsalary(e.target.value)}
          />
        </div>
        <div>
          <button
            className="btn"
            type="button"
            onClick={sendSignupDataToServerThrouhFD}
          >
            Add Employees
          </button>
        </div>
        
      </form>
    </div>
  );
}

export default AddDashboard;
