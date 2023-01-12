import { Typography, Box } from "@mui/material";
import { ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../components/Header";
import { db } from "../../firebaseconfig";
import { PieChart, Pie, Cell } from "recharts";

export const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    onValue(ref(db, "users"), (snapshot) => {
      setUser(snapshot.val()[userId]);
    });
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const { Name, EmpID, Performance, Activity } = user;
  console.log(user);
  const currentDate = new Date().toLocaleDateString();
  const currentActivities = Object.entries(Activity).filter(([key, value]) => value.date === currentDate)
  const data = Object.entries(currentActivities).map(([name, value]) => ({
    name: name,
    value: value.duration,
  }));

  const colors = ["#0088FE", "#00C49F", "#FFBB28"];
  return (
    <>
      <Box>
        <Header title={Name} subtitle={EmpID} />
      </Box>
      <Box>
        <Typography>Rating: {Performance.Rating}</Typography>
        <Typography>
          Break Duration: {Activity.break_duration} minutes
        </Typography>
        <Typography>
          {" "}
          Call Duration: {Activity.call_duration} minutes
        </Typography>
        <Typography>
          {" "}
          Meeting Duration: {Activity.meetings_duration} minutes
        </Typography>
      </Box>
      <Box>
        <PieChart width={300} height={300}>
          <Pie
            data={data}
            dataKey="value"
            cx={150}
            cy={150}
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Pie>
        </PieChart>
      </Box>
    </>
  );
};
