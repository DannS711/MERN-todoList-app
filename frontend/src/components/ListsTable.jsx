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
import Modal from "./Modal";

function ListsTable() {
  const [lists, setLists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedListId, setSelectedListId] = useState(null);
  const [form, setForm] = useState({
    listName: "",
  });
  const [modalType, setModalType] = useState("");

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (selectedListId) {
      try {
        await axios({
          method: "PUT",
          url: `${baseServerAPI}/list/rename/${selectedListId}`,
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
          data: {
            listName: form.listName,
          },
        });
        setShowModal(false);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDeleteList = async (e) => {
    e.preventDefault();

    if (selectedListId) {
      try {
        await axios({
          method: "DELETE",
          url: `${baseServerAPI}/list/delete/${selectedListId}`,
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        setShowModal(false);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEditButtonClick = (listId, listName) => {
    setSelectedListId(listId);
    setForm({
      listName,
    });
    setModalType("edit");
    setShowModal(true);
  };

  const handleDeleteModalClick = (listId) => {
    setSelectedListId(listId);
    setModalType("delete");
    setShowModal(true);
  };

  const handleInputChanges = (e) => {
    const { id, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
  };

  return (
    <>
      <div className="overflow-x-auto px-4 sm:px-8 md:px-16 lg:px-32 py-8 sm:py-16">
        <Table>
          <TableHead>
            <TableHeadCell className="text-center">List name</TableHeadCell>
            <TableHeadCell className="text-center">
              <span className=""></span>
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
                <TableCell className="text-center flex justify-center items-center">
                  <button
                    className="mr-5"
                    onClick={() => handleEditButtonClick(list._id)}
                  >
                    <img src="/edit.svg" alt="edit" height="20" width="20" />
                  </button>
                  <button onClick={() => handleDeleteModalClick(list._id)}>
                    <img
                      src="/delete.svg"
                      alt="Delete"
                      height="20"
                      width="20"
                    />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Modal isOpened={showModal} onClose={() => setShowModal(false)}>
        {modalType === "edit" ? (
          <>
            <h1 className="text-2xl text-center font-medium">Rename List</h1>
            <form className="max-w-sm mx-auto" onSubmit={handleFormSubmit}>
              <div className="mb-5">
                <input
                  type="text"
                  id="listName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Insert new name"
                  required
                  value={form.listName}
                  onChange={handleInputChanges}
                />
              </div>
              <div className="flex justify-center items-center space-x-4">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <div className="p-4">
              <h1 className="text-center text-3xl font-semibold">
                Are you sure you want to delete this list?
              </h1>
            </div>
            <div className="flex justify-center items-center space-x-4 m-3">
              <button
                type="button"
                className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-400 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                onClick={handleDeleteList}
              >
                Delete
              </button>
              <button
                type="button"
                className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-400 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}

export default ListsTable;
