'use client';
import React, { useState } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  Tooltip,
  ScrollShadow,
  useDisclosure,
} from '@nextui-org/react';
import { Alert } from '@nextui-org/alert';

import { Plus, Search, Pen, Trash2 } from 'lucide-react';
import { SharedSelection } from '@nextui-org/system-rsc';
import Food from '@/components/icons/food';
import useFetch from '@/lib/hooks/useFetch';
import { Expense } from '@/lib/definitions';
import { formatToLocalCurrency } from '@/lib/utils';
import EmptyList from '@/components/empty-list';
import { NewExpense } from '@/components/create-expense';

const columns = [
  { name: 'ID', uid: 'id', sortable: true },
  { name: 'NAME', uid: 'name', sortable: true },
  { name: 'CATEGORY', uid: 'categoryId', sortable: true },
  { name: 'AMOUNT', uid: 'amount', sortable: true },
  { name: 'DATE', uid: 'createdAt', sortable: true },
  { name: 'ACTIONS', uid: 'actions' },
];

function capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : '';
}

const ChevronDownIcon = ({ strokeWidth = 1.5, ...otherProps }) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...otherProps}
    >
      <path
        d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

const INITIAL_VISIBLE_COLUMNS = ['name', 'categoryId', 'amount', 'actions'];

function AddNexExpense() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  return (
    <div>
      <Button onPress={onOpen} color="primary" endContent={<Plus />}>
        Add New
      </Button>
      <NewExpense
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
    </div>
  );
}

export default function ExpensesList() {
  const { data: expenses, isError } = useFetch<Expense[]>('/api/expenses');

  const [filterValue, setFilterValue] = useState('');
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );

  const handleSelectionChange = (keys: SharedSelection) => {
    if (keys instanceof Set) {
      const stringSet = new Set<string>(Array.from(keys).map(String)); // Convert all keys to strings
      setVisibleColumns(stringSet);
    } else {
      console.warn('Unexpected selection format:', keys);
    }
  };

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<{
    column: string | number;
    direction: 'ascending' | 'descending';
  }>({
    column: 'createdAt',
    direction: 'descending',
  });
  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns.has('all')) {
      return columns;
    }

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredExpenses = expenses ? [...expenses] : [];

    if (hasSearchFilter) {
      filteredExpenses = filteredExpenses.filter((expense) =>
        expense.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredExpenses;
  }, [expenses, filterValue, hasSearchFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof Expense];
      const second = b[sortDescriptor.column as keyof Expense];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (expense: Expense, columnKey: string | number) => {
      let cellValue: unknown;

      if (typeof columnKey === 'string' && columnKey in expense) {
        cellValue = expense[columnKey as keyof Expense];
      }

      switch (columnKey) {
        case 'name':
          return (
            <div className="flex space-x-3 items-center">
              <Food />
              <p className="text-bold text-small capitalize">
                {String(cellValue)}
              </p>
            </div>
          );
        case 'category':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">
                {capitalize(String(cellValue))}
              </p>
            </div>
          );
        case 'amount':
          return (
            <Chip className="capitalize" size="sm" variant="flat">
              {formatToLocalCurrency(Number(cellValue))}
            </Chip>
          );
        case 'actions':
          return (
            <div className="relative flex items-center justify-center gap-2">
              <Tooltip content="Edit expense">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <Pen />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete expense">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <Trash2 />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return null;
      }
    },
    []
  );

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue('');
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<Search />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={handleSelectionChange}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <AddNexExpense />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {expenses?.length} expenses
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    onSearchChange,
    visibleColumns,
    expenses?.length,
    onRowsPerPageChange,
    onClear, //
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [page, pages, onPreviousPage, onNextPage]);

  return (
    <ScrollShadow orientation="horizontal">
      {isError && (
        <div className="flex items-center justify-center w-full my-2">
          <Alert color="danger" title="Cannot Load Expenses" />
        </div>
      )}
      <Table
        isHeaderSticky
        aria-label="Expenses table with custom cells, pagination and sorting"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSortChange={setSortDescriptor}
        // classNames={
        //   {
        //     // wrapper: 'max-h-[382px]',
        //     // wrapper: 'overflow-x-auto',
        //   }
        // }
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === 'actions' ? 'center' : 'start'}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={<EmptyList title={'expenses'} />}
          items={sortedItems}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </ScrollShadow>
  );
}
