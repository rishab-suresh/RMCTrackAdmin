import { useState, useEffect } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../firebaseconfig";
import { PieChart, Pie, Tooltip, Legend } from "recharts";
import moment from "moment/moment";
import { Box } from "@mui/material";

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${name} ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const PiechartActivity = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [selectedDate, setSelectedDate] = useState();

  useEffect(() => {
    onValue(ref(db, "users"), (snapshot) => {
      setUsers(
        Object.entries(snapshot.val()).map(([userId, userData]) => {
          return {
            userId,
            Name: userData.Name,
            Activity: userData.Activity,
          };
        })
      );
      console.log(users);
    });
  }, [setUsers]);

  //function to handle the selection of user from the dropdown
  const handleSelection = (event) => {
    setSelectedUser(event.target.value);
    console.log(users);
  };

  //function to handle the selection of date
  const handleDateSelection = (event) => {
    setSelectedDate(moment(event.target.value).format("DD MMM YYYY"));
    console.log(event);
  };

  let data;
  console.log("selectedUser:", selectedUser);
  console.log("selectedDate:", selectedDate);

  if (selectedUser) {
    const selectedUserData = users.find((user) => user.userId === selectedUser);
    const matchingDate = Object.keys(selectedUserData.Activity).find(
      (date) => moment(date).format("DD MMM YYYY") === selectedDate
    );
    if (matchingDate) {
      data = [
        {
          name: "Break",
          value: selectedUserData.Activity[matchingDate].break_duration,
          fill: "yellow",
        },
        {
          name: "Call",
          value: selectedUserData.Activity[matchingDate].call_duration,
          fill: "green",
        },
        {
          name: "Meeting",
          value: selectedUserData.Activity[matchingDate].meetings_duration,
          fill: "orange",
        },
        {
          name: "Idle",
          value:
            900 -
            (selectedUserData.Activity[matchingDate].break_duration +
              selectedUserData.Activity[matchingDate].call_duration +
              selectedUserData.Activity[matchingDate].meetings_duration),
          fill: "salmon",
        },
      ];
    }
  }

  console.log(data);

  return (
    <div>
      <select onChange={handleSelection}>
        <option value="">Select User</option>
        {users.map((user) => (
          <option key={user.userId} value={user.userId}>
            {user.Name}
          </option>
        ))}
      </select>
      <input type="date" onChange={handleDateSelection} />

      {data && data.length > 0 && (
        <Box>
          <Box display="flex" justifyContent="space-evenly">
            <Box>
              <p>Break Duration: {Math.round(data[0].value)} mins</p>
            </Box>
            <Box>
              <p>Call Duration: {Math.round(data[1].value)} mins</p>
            </Box>
            <Box>
              <p>Meeting Duration: {Math.round(data[2].value)} mins</p>
            </Box>
            <Box>
              <p>Idle Duration: {Math.round(data[3].value)} mins</p>
            </Box>
          </Box>
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              cx={200}
              cy={200}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              colors={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]}
              dataKey="value"
            ></Pie>
            <Tooltip />
            <Legend colors={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]} />
          </PieChart>
        </Box>
      )}
    </div>
  );
};
