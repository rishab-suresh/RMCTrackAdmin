import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { onValue, ref } from "firebase/database";
import { db } from "../firebaseconfig";
import moment from "moment";

export const CallGraph = () => {
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    onValue(ref(db, "All Calls"), (snapshot) => {
      setCalls(
        Object.entries(snapshot.val()).map(([userId, userData]) => ({
          userId,
          ...userData,
        }))
      );
    });
  }, [setCalls]);

  // group calls by date
  const callsByDate = calls.reduce((callsByDate, call) => {
    const date = moment(call.Date).format("YYYY-MM-DD");
    if (!callsByDate[date]) {
      callsByDate[date] = { date, count: 0 };
    }
    callsByDate[date].count++;
    return callsByDate;
  }, {});

  // convert object to array
  const data = Object.values(callsByDate);

  // Get data for the last 30 days
  const thirtyDaysAgo = moment().subtract(30, "days").format("MM-DD-YYYY");
  const dataLastThirtyDays = data.filter((item) => item.date >= thirtyDaysAgo);

  return (
    <LineChart width={500} height={300} data={dataLastThirtyDays}>
      <XAxis dataKey="date" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Line type="monotone" dataKey="count" stroke="#8884d8" />
    </LineChart>
  );
};
