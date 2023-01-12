import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../firebaseconfig";



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

  useEffect(() => {
    onValue(ref(db, "users"), (snapshot) => {
      setUsers(
        Object.entries(snapshot.val()).map(([userId, userData]) => ({
          userId,
          ...userData,
        }))
      );
    });
  }, [setUsers]);

  const data = users.map((user) => ({
    name: user.Name,
    break_duration: user.Activity.break_duration,
    call_duration: user.Activity.call_duration,
    meeting_duration: user.Activity.meeting_duration,
  }));

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
        fill="#8884d8"
        dataKey={["break_duration", "call_duration", "meeting_duration"]}
      ></Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};
