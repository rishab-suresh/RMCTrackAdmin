import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Topbar } from "./scenes/global/Topbar";
import { DashBoard } from "./scenes/dashboard";
import { Sidebar } from "./scenes/global/Sidebar";
import { Routes, Route } from "react-router-dom";
import { Team } from "./scenes/Team/Index";
import { CallLogs } from "./scenes/CallLogs";
import { PiechartPage } from "./scenes/Piechart";
import { UserDetails } from "./scenes/Team/MemberDetails";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<DashBoard />} />
              <Route path="/Team" element={<Team />} />
              <Route path="/contacts" element={<CallLogs />} />
              <Route path="/Activity" element={<PiechartPage/>}/>
              <Route path="/user/:userId" element={<UserDetails/>}/>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
