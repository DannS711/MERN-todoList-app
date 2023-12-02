import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

function ListsTable() {
  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHead>
            <TableHeadCell>Product name</TableHeadCell>
            <TableHeadCell>
              <span className="sr-only">Edit</span>
            </TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            {/*  */}
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {'Apple MacBook Pro 17"'}
              </TableCell>
              <TableCell>
                <a
                  href="#"
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Edit
                </a>
              </TableCell>
            {/*  */}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default ListsTable;
