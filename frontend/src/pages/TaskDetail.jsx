import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

function TaskDetail() {
  return (
    <>
      <div className="overflow-x-auto px-[600px] py-16">
        <Table className="">
          <TableHead>
            <TableHeadCell>Tasks</TableHeadCell>
            <TableHeadCell>
              <span className="sr-only"></span>
            </TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            <TableRow className="bg-white">
              <TableCell className="text-start text-slate-700 font-semibold flex-1">
                Data
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
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default TaskDetail;
