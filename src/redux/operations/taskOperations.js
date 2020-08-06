// import axios from "axios";
// import { loaderOn, loaderOff } from "../actions/loaderActions";
// import { setError, resetError } from "../actions/errorActions";
// import { addTask, deleteTask, setTasks } from "../actions/taskAction";
// import { inputClear } from "../actions/formAction";

// const options = {
//   headers: { "Content-Type": "application/json" },
// };

// export const getTaskOperation = () => async (dispatch) => {
//   try {
//     dispatch(loaderOn());
//     const result = await axios.get(" http://localhost:5000/tasks");
//     dispatch(setTasks(result.data));
//   } catch (error) {
//     dispatch(setError("Something went wrong"));
//   } finally {
//     dispatch(loaderOff());
//   }
// };

// export const postTaskOperation = (task) => async (dispatch) => {
//   try {
//     dispatch(loaderOn());
//     const result = await axios.post(
//       "http://localhost:5000/tasks",
//       task,
//       options
//     );
//     dispatch(addTask(result.data));
//     dispatch(inputClear());
//   } catch (error) {
//     dispatch(setError("Something went wrong"));
//   } finally {
//     dispatch(loaderOff());
//   }
// };

// export const deleteTaskOperation = (id) => async (dispatch) => {
//   try {
//     dispatch(loaderOn());
//     await axios.delete(`http://localhost:5000/tasks/${id}`);
//     dispatch(deleteTask(id));
//   } catch (error) {
//     dispatch(setError("Something went wrong"));
//   } finally {
//     dispatch(loaderOff());
//   }
// };

import { db } from "../../config";
import { loaderOn, loaderOff } from "../actions/loaderActions";
import { setError, resetError } from "../actions/errorActions";
import { addTask, deleteTask, setTasks } from "../actions/taskAction";
import { inputClear } from "../actions/formAction";

export const readDataFromFirestore = (dbName) => async (dispatch) => {
  try {
    dispatch(loaderOn());
    const result = await db.collection(dbName).get();
    const formatResult = result.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    dispatch(setTasks(formatResult));
  } catch (error) {
    dispatch(setError("Bad server"));
  } finally {
    dispatch(loaderOff());
  }
};

export const writeDataToFirestore = (dbName, data) => async (dispatch) => {
  try {
    dispatch(loaderOn());
    const result = await db.collection(dbName).add(data);
    const answer = { ...data, id: result.id };
    dispatch(addTask(answer));
  } catch (error) {
    dispatch(setError("Bad server"));
  } finally {
    dispatch(loaderOff());
  }
};

export const deleteDataFromFirestore = (dbName, docId) => async (dispatch) => {
  try {
    dispatch(loaderOn());
    await db.collection(dbName).doc(docId).delete();
    dispatch(deleteTask(docId));
  } catch (error) {
    dispatch(setError("Bad server"));
  } finally {
    dispatch(loaderOff());
  }
};
