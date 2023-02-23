import { BASE_URL } from "@/config";
import axios from "axios";

const getTeams = async () => {
  const response = await axios.get(`${BASE_URL}/api/teams`);
  return response.data;
};
const postTeams = async (teamsDetails) => {
  const response = await axios.post(`${BASE_URL}/api/teams`, teamsDetails, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
const excuseFromTeams = async (teamId) => {
  const response = await axios.patch(
    `${BASE_URL}/api/teams/${teamId}?action=remove_member`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
const addAttendee = async (teamId, attendeeId) => {
  const response = await axios.patch(
    `${BASE_URL}/api/teams/${teamId}?action=add_member&userId=${attendeeId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
export { getTeams, postTeams, excuseFromTeams, addAttendee };
