import axios from "axios";
import { Table, TableBody, TableCell, TableRow } from "flowbite-react";
import { useEffect, useState } from "react";
import { baseServerAPI } from "../../utils";
import { useParams } from "react-router-dom";

const TaskTable = () => {
  const { _id } = useParams();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTask = async () => {
      try {
        const { data } = await axios({
          method: "GET",
          url: `${baseServerAPI}/task/tasks/${_id}`,
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        setTasks(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getTask();
  }, [_id]);

  const handleCheckboxChange = async (taskId, isChecked) => {
    try {
      await axios({
        method: "PUT",
        url: `${baseServerAPI}/task/status/${taskId}`,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: {
          isCompleted: isChecked,
        },
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, isCompleted: isChecked } : task
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Table>
      <TableBody className="divide-y">
        {tasks.map((task, index) => (
          <TableRow className="bg-white" key={index}>
            <TableCell className="text-start text-slate-700 font-semibold flex-1">
              <input
                className="mr-3"
                type="checkbox"
                checked={task.isCompleted}
                onChange={(e) =>
                  handleCheckboxChange(task._id, e.target.checked)
                }
              />
              {task.task}
            </TableCell>
            <TableCell className="text-center">
              <a
                href="#"
                className="font-medium text-cyan-600 hover:underline mr-5"
              >
                Edit
              </a>
              <a href="#" className="font-medium text-red-600 hover:underline">
                Delete
              </a>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TaskTable;
