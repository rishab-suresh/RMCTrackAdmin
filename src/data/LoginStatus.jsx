import { useEffect, useState } from "react";
import { Table, TableRow, TableCell, Box } from "@mui/material";
import { onValue, ref } from "firebase/database";
import { db } from "../firebaseconfig";
import Pagination from "react-paginate";
import "./DataStyles.css"
export const LoginStatus = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(6);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onValue(ref(db, "users"), (snapshot) => {
      setUsers(
        Object.entries(snapshot.val()).map(([userId, userData]) => ({
          userId,
          ...userData,
        }))
      );
      setIsLoading(false);
      console.log(users)
    });
  }, [setUsers]);

  // Get current users
  const indexOfLastUser = (currentPage + 1) * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  console.log(currentUsers)
  const handlePageChange = (data) => {
    setCurrentPage(data.selected);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <Box display="flex" >
          <Table >
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Login Status</TableCell>
            </TableRow>
            {currentUsers.map((user) => (
              <TableRow key={user.userId}>
                <TableCell>{user.Name}</TableCell>
                <TableCell>
                  {user.Login === "Yes" ? (
                    <button
                      style={{
                        backgroundColor: "green",
                        borderRadius: "50%",
                        width: "20px",
                        height: "20px",
                      }}
                    />
                  ) : (
                    <button
                      style={{
                        backgroundColor: "red",
                        borderRadius: "50%",
                        width: "20px",
                        height: "20px",
                      }}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
            <Box display="flex" m="20px">
              <Pagination
                
                previousLabel={"previous"}
                nextLabel={"next"}
                      
                pageCount={Math.ceil(users.length / usersPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName={"pagination"}
                subContainerClassName={"pages-pagination"}
                activeClassName={"active"}
              />
            </Box>
          </Table>
        </Box>
      </>
    );
  }
};
