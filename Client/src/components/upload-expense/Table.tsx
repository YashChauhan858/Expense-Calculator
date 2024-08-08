import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { TStatementItem } from "@/types";
import { truncateText } from "@/utils";

const columns: ColumnDef<TStatementItem>[] = [
  {
    accessorKey: "date",
    header: () => <div className="text-center font-medium">Date</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("date")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "account",
    header: () => <div className="text-center font-medium">Account</div>,
    cell: ({ row }) => (
      <div className="text-center w-full">
        <p
          className="truncate overflow-hidden w-full"
          title={row.getValue("account")}
        >
          {truncateText(row.getValue("account"), 40)}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "chqRefNo",
    header: () => <div className="text-center font-medium">Chq RefNo.</div>,
    cell: ({ row }) => (
      <div className="text-center lowercase">{row.getValue("chqRefNo")}</div>
    ),
  },
  {
    accessorKey: "withdraw",
    header: () => <div className="text-center font-medium">Withdraw</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.getValue("withdraw")}
        </div>
      );
    },
  },
  {
    accessorKey: "deposit",
    header: () => <div className="text-center font-medium">Deposit</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">{row.getValue("deposit")}</div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      return <h1>data</h1>;
    },
  },
];

const ExpenseTable = ({ fileData }: { fileData: TStatementItem[] | null }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable<TStatementItem>({
    data: fileData ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter Account..."
          value={(table.getColumn("account")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            if (!fileData) return;
            table.getColumn("account")?.setFilterValue(event.target.value);
          }}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Total Records: {table.getFilteredRowModel().rows.length}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTable;
