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
  useDisclosure,
} from '@nextui-org/react';
import { useSWRConfig } from 'swr';
import { Plus, Search } from 'lucide-react';
import useFetch from '@/lib/hooks/useFetch';
import { Income, PaginatedIncome } from '@/lib/definitions';
import { capitalize, formatToLocalCurrency } from '@/lib/utils';

import EditIncome from './update-income';
import DeleteIncome from './delete-income';
import EmptyList from '@/components/empty-list';
import { NewIncome } from '@/components/create-income';

const columns = [
  // { name: 'ID', uid: 'id' },
  { name: 'NAME', uid: 'name' },
  { name: 'AMOUNT', uid: 'amount' },
  { name: 'DATE', uid: 'createdAt' },
  { name: 'ACTIONS', uid: 'actions' },
];

function AddNewIncome() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  return (
    <div>
      <Button onPress={onOpen} color="primary" endContent={<Plus />}>
        Add New
      </Button>
      <NewIncome
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
    </div>
  );
}
export default function IncomeList() {
  const { mutate } = useSWRConfig();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterValue, setFilterValue] = useState('');

  const { data, isError } = useFetch<PaginatedIncome>(
    `/api/incomes?page=${page}&limit=${rowsPerPage}`
  );

  useEffect(() => {
    // Trigger data fetching when page or rowsPerPage changes
    mutate(`/api/incomes?page=${page}&limit=${rowsPerPage}`);
  }, [page, rowsPerPage, mutate]);

  const filteredItems = useMemo(() => {
    if (!data?.incomes) return [];
    if (!filterValue) return data.incomes;

    return data.incomes.filter((income) =>
      income.name.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [data, filterValue]);

  const totalPages = useMemo(() => {
    if (!data?.totalIncomes) return 0;
    return Math.ceil(data.totalIncomes / rowsPerPage);
  }, [data, rowsPerPage]);

  const renderCell = useCallback(
    (income: Income, columnKey: string | number) => {
      switch (columnKey) {
        case 'name':
          return (
            <div className="flex space-x-3 items-center">
              <p className="text-bold text-small capitalize">
                {capitalize(income.name)}
              </p>
            </div>
          );
        case 'createdAt':
          return (
            <div className="flex space-x-3 items-center">
              <p className="text-bold text-small capitalize">
                {format(parseISO(income.createdAt), 'MMMM, dd-yyyy')}
              </p>
            </div>
          );

        case 'amount':
          return (
            <Chip className="capitalize" size="sm" variant="flat">
              {formatToLocalCurrency(income.amount)}
            </Chip>
          );
        case 'actions':
          return (
            <div className="relative flex items-center justify-center gap-2">
              <EditIncome income={income} />
              <DeleteIncome income={income} />
            </div>
          );
        default:
          return income[columnKey as keyof Income] || null;
      }
    },
    []
  );

  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-center">
        <Input
          className="w-full sm:max-w-[44%]"
          placeholder="Search by name..."
          startContent={<Search />}
          value={filterValue}
          onValueChange={setFilterValue}
        />
        <AddNewIncome />
      </div>

      {isError ? (
        <p>Error loading incomes</p>
      ) : (
        <Table
          aria-label="Incomes Table"
          classNames={{
            wrapper: 'my-8',
          }}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid}>{column.name}</TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={filteredItems}
            emptyContent={<EmptyList title={'incomes'} />}
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
