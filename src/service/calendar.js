import { BASE_URL } from "@/config";
import axios from "axios";
const getCalendar = async (selectedDate) => {
  const response = await axios.get(
    `${BASE_URL}/api/calendar?date=${selectedDate}`
  );
  return response.data;
};
export { getCalendar };
