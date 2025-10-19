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
import { ArrowUpDown, Mail, MoreHorizontal } from "lucide-react"

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
import { Link } from "@inertiajs/react"
import { route } from "ziggy-js"

interface Supplier {
    name: string;
    email: string;
}

interface BuyerRequest {
    id: number;
    title: string;
}

interface SupplierContact {
    id: number;
    subject: string;
    message: string;
    contact_type: string;
    status: string;
    contacted_at: string;
    replied_at: string | null;
    supplier: Supplier;
    buyer_request: BuyerRequest | null;
}

const getContactTypeLabel = (type: string) => {
    const labels = {
        inquiry: 'General Inquiry',
        quote_request: 'Quote Request',
        follow_up: 'Follow Up',
        other: 'Other'
    };
    return labels[type as keyof typeof labels] || type;
};

const getStatusColor = (status: string) => {
    switch (status) {
        case 'pending': return 'secondary';
        case 'replied': return 'default';
        case 'closed': return 'outline';
        default: return 'outline';
    }
};

const getContactTypeColor = (type: string) => {
    switch (type) {
        case 'quote_request': return 'default';
        case 'inquiry': return 'secondary';
        case 'follow_up': return 'outline';
        default: return 'outline';
    }
};

export const columns: ColumnDef<SupplierContact>[] = [
  {
    accessorKey: "subject",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Subject
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const contact = row.original
      return (
        <div className="space-y-2">
          <div className="font-semibold">{contact.subject}</div>
          <div className="text-sm text-muted-foreground line-clamp-2">
            {contact.message}
          </div>
          <div className="flex gap-2">
            <Badge variant={getStatusColor(contact.status)}>
              {contact.status}
            </Badge>
            <Badge variant={getContactTypeColor(contact.contact_type)}>
              {getContactTypeLabel(contact.contact_type)}
            </Badge>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "supplier",
    header: "Supplier",
    cell: ({ row }) => {
      const supplier = row.original.supplier
      return (
        <div className="space-y-1">
          <div className="font-medium">{supplier.name}</div>
          <div className="text-sm text-muted-foreground">{supplier.email}</div>
        </div>
      )
    },
  },
  {
    accessorKey: "buyer_request",
    header: "Related Request",
    cell: ({ row }) => {
      const request = row.original.buyer_request
      if (!request) return <span className="text-muted-foreground">-</span>
      return (
        <Link 
          href={route('requests.show', request.id)}
          className="text-primary hover:underline text-sm"
        >
          {request.title}
        </Link>
      )
    },
  },
  {
    accessorKey: "contacted_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Contacted
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const contact = row.original
      return (
        <div className="space-y-1 text-sm">
          <div>{contact.contacted_at}</div>
          {contact.replied_at && (
            <div className="text-muted-foreground">
              Replied: {contact.replied_at}
            </div>
          )}
        </div>
      )
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const contact = row.original

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
              <Mail className="mr-2 h-4 w-4" />
              Reply to Contact
            </DropdownMenuItem>
            <DropdownMenuItem>View Full Message</DropdownMenuItem>
            {contact.buyer_request && (
              <DropdownMenuItem asChild>
                <Link href={route('requests.show', contact.buyer_request.id)}>
                  View Related Request
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem>Mark as Closed</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function ContactsDataTable({
  data,
}: {
  data: SupplierContact[]
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
          placeholder="Filter contacts..."
          value={(table.getColumn("subject")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("subject")?.setFilterValue(event.target.value)
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

