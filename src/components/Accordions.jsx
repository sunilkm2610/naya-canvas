import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect } from "react";
import axios from "axios";

export default function Accordions() {
  const [users, setUsers] = React.useState([]);
  useEffect(() => {
    const getAllUsers = async () => {
      const allUsers = await axios.get("http://localhost:4000/api/user");
      setUsers(allUsers.data.users);
    };
    getAllUsers();
  }, []);
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Canvas</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {users.map((item, index) => (
            <Typography sx={{ background: `${item.color}`, padding: "10px" }}>
              {item.name} Stoke
            </Typography>
          ))}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Users</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {users.map((user) => (
            <Typography sx={{ padding: "10px" }}>{user.name}</Typography>
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
