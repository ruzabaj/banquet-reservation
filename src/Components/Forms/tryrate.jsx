import React from "react";
import { useState } from "react";

export default function StaffTable() {
//   const [people, setPeople] = useState(props.data);
  const [people, setPeople] = useState([]);

  const createPerson = () => {
    setPeople([
      ...people,
      { id: people.length + 1, name: "", age: "", number: "" }
    ]);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>age</th>
            <th>number</th>
          </tr>
        </thead>
        <tbody>
          {people.map(row => (
            <tr>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.age}</td>
              <td>{row.number}</td>
              <td>
                <button className="editRow">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={createPerson} className="addRow">
        Add Row
      </button>
    </div>
  );
}