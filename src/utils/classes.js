import axios from "axios";
import REACT_API_URL from "../config";

// Function to fetch departments list asynchronously
export const departments = async () => {
  try {
    const response = await axios.get(`${REACT_API_URL}/management/departments/list`);
    return response.data; // Assuming API returns data directly
  } catch (error) {
    console.error('Failed to fetch departments:', error);
    throw new Error('Failed to fetch departments');
  }
};

// Function to fetch classes list asynchronously
export const classeslist = async () => {
  try {
    const response = await axios.get(`${REACT_API_URL}/api/classes`);
    return response.data; // Assuming API returns data directly
  } catch (error) {
    console.error('Failed to fetch classes:', error);
    throw new Error('Failed to fetch classes');
  }
};
