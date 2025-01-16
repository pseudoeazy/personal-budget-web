'use client';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { format, parseISO } from 'date-fns';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Chip,
  Pagination,
  Tooltip,
  useDisclosure,
} from '@nextui-org/react';
import { useSWRConfig } from 'swr';
import { Plus, Search, Pen, Trash2 } from 'lucide-react';
import Food from '@/components/icons/food';
import useFetch from '@/lib/hooks/useFetch';
import { Expense, PaginatedExpense } from '@/lib/definitions';
import { capitalize, formatToLocalCurrency } from '@/lib/utils';
import { NewExpense } from '@/components/create-expense';

const columns = [
  // { name: 'ID', uid: 'id' },
  { name: 'NAME', uid: 'name' },
  { name: 'CATEGORY', uid: 'categoryId' },
  { name: 'AMOUNT', uid: 'amount' },
  { name: 'DATE', uid: 'createdAt' },
  { name: 'ACTIONS', uid: 'actions' },
];

function AddNewExpense() {
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
  const { mutate } = useSWRConfig();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterValue, setFilterValue] = useState('');

  const { data, isError } = useFetch<PaginatedExpense>(
    `/api/expenses?page=${page}&limit=${rowsPerPage}`
  );

  useEffect(() => {
    // Trigger data fetching when page or rowsPerPage changes
    mutate(`/api/expenses?page=${page}&limit=${rowsPerPage}`);
  }, [page, rowsPerPage, mutate]);

  const filteredItems = useMemo(() => {
    if (!data?.expenses) return [];
    if (!filterValue) return data.expenses;

    return data.expenses.filter((expense) =>
      expense.name.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [data, filterValue]);

  const totalPages = useMemo(() => {
    if (!data?.totalExpenses) return 0;
    return Math.ceil(data.totalExpenses / rowsPerPage);
  }, [data, rowsPerPage]);

  const renderCell = useCallback(
    (expense: Expense, columnKey: string | number) => {
      switch (columnKey) {
        case 'name':
          return (
            <div className="flex space-x-3 items-center">
              <Food />
              <p className="text-bold text-small capitalize">
                {capitalize(expense.name)}
              </p>
            </div>
          );
        case 'categoryId':
          return (
            <div className="flex space-x-3 items-center">
              <p className="text-bold text-small capitalize">
                {capitalize(expense.categoryId)}
              </p>
            </div>
          );
        case 'createdAt':
          return (
            <div className="flex space-x-3 items-center">
              <p className="text-bold text-small capitalize">
                {format(parseISO(expense.createdAt), 'MMMM, dd-yyyy')}
              </p>
            </div>
          );

        case 'amount':
          return (
            <Chip className="capitalize" size="sm" variant="flat">
              {formatToLocalCurrency(expense.amount)}
            </Chip>
          );
        case 'actions':
          return (
            <div className="relative flex items-center justify-center gap-2">
              <Tooltip content="Edit expense">
                <span className="text-lg text-default-400 cursor-pointer">
                  <Pen />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete expense">
                <span className="text-lg text-danger cursor-pointer">
                  <Trash2 />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return expense[columnKey as keyof Expense] || null;
      }
    },
    []
  );

  return (
    <div>
      <div className="w-full flex justify-between items-center">
        <Input
          className="w-full sm:max-w-[44%]"
          placeholder="Search by name..."
          startContent={<Search />}
          value={filterValue}
          onValueChange={setFilterValue}
        />
        <AddNewExpense />
      </div>

      {isError ? (
        <p>Error loading expenses</p>
      ) : (
        <Table
          aria-label="Expenses Table"
          classNames={{
            wrapper: 'my-8',
          }}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid}>{column.name}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={filteredItems}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      <Pagination
        total={totalPages}
        initialPage={1}
        page={page}
        onChange={setPage}
      />
      <label className="flex items-center text-default-400 text-small">
        Rows per page:
        <select
          className="bg-transparent outline-none text-default-400 text-small"
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(Number(e.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </label>
    </div>
  );
}
