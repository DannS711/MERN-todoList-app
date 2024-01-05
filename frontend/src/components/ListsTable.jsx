import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseServerAPI } from "../../utils";

function ListsTable() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const getLists = async () => {
      try {
        const { data } = await axios({
          method: "GET",
          url: `${baseServerAPI}/list/lists`,
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        setLists(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getLists();
  }, []);

  return (
    <>
      <div className="overflow-x-auto px-4 sm:px-8 md:px-16 lg:px-32 py-8 sm:py-16">
        <Table>
          <TableHead>
            <TableHeadCell className="text-center">List name</TableHeadCell>
            <TableHeadCell className="text-center">
              <span className="">Edit</span>
            </TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {lists.map((list, index) => (
              <TableRow key={index} className="bg-white">
                <TableCell className="whitespace-nowrap font-medium text-gray-900 text-center">
                  <Link to={`/task/${list._id}`}>
                    <p className="text-slate-700 font-semibold flex-1 hover:underline truncate">
                      {list.listName}
                    </p>
                  </Link>
                </TableCell>
                <TableCell className="text-center">
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline mr-5"
                  >
                    Edit
                  </a>
                  <a
                    href="#"
                    className="font-medium text-red-600 hover:underline"
                  >
                    Delete
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default ListsTable;
