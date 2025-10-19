import * as React from "react"
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
} from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Package, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Buyer {
    name: string;
    email: string;
}

interface BuyerRequest {
    id: number;
    title: string;
}

interface SupplierOrder {
    id: number;
    order_number: string;
    product_name: string;
    product_description: string;
    quantity: number;
    unit: string;
    unit_price: number;
    total_amount: number;
    currency: string;
    status: string;
    expected_delivery_date: string | null;
    actual_delivery_date: string | null;
    created_at: string;
    buyer: Buyer;
    buyer_request: BuyerRequest | null;
}

const getStatusVariant = (status: string) => {
    switch (status) {
        case 'completed': return 'default';
        case 'delivered': return 'default';
        case 'shipped': return 'secondary';
        case 'processing': return 'outline';
        default: return 'outline';
    }
};

export const columns: ColumnDef<SupplierOrder>[] = [
  {
    accessorKey: "order_number",
    header: "Order #",
    cell: ({ row }) => {
      return <div className="font-mono text-sm">{row.getValue("order_number")}</div>
    },
  },
  {
    accessorKey: "product_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const order = row.original
      return (
        <div className="space-y-1 max-w-xs">
          <div className="font-semibold">{order.product_name}</div>
          <div className="text-sm text-muted-foreground line-clamp-2">
            {order.product_description}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "buyer",
    header: "Buyer",
    cell: ({ row }) => {
      const buyer = row.original.buyer
      return (
        <div className="space-y-1">
          <div className="font-medium">{buyer.name}</div>
          <div className="text-sm text-muted-foreground">{buyer.email}</div>
        </div>
      )
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => {
      const order = row.original
      return `${order.quantity} ${order.unit}`
    },
  },
  {
    accessorKey: "total_amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const order = row.original
      return (
        <div className="font-medium">
          {order.currency} {order.total_amount.toLocaleString()}
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant={getStatusVariant(status)}>
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "expected_delivery_date",
    header: "Delivery",
    cell: ({ row }) => {
      const order = row.original
      return (
        <div className="text-sm space-y-1">
          {order.expected_delivery_date && (
            <div>Expected: {order.expected_delivery_date}</div>
          )}
          {order.actual_delivery_date && (
            <div className="text-green-600">
              Delivered: {order.actual_delivery_date}
            </div>
          )}
          {!order.expected_delivery_date && !order.actual_delivery_date && (
            <span className="text-muted-foreground">-</span>
          )}
        </div>
      )
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const order = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Package className="mr-2 h-4 w-4" />
              View Order Details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Truck className="mr-2 h-4 w-4" />
              Update Shipping Status
            </DropdownMenuItem>
            <DropdownMenuItem>Download Invoice</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Contact Buyer</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function SupplierOrdersDataTable({
  data,
}: {
  data: SupplierOrder[]
}) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
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
  })

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Filter orders..."
          value={(table.getColumn("product_name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("product_name")?.setFilterValue(event.target.value)
          }
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
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
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
          {table.getFilteredRowModel().rows.length} row(s) total.
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
  )
}

