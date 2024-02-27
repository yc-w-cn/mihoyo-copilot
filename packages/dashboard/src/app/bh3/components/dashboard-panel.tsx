"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMemo } from "react";
import { useAppSelector } from "../hooks";
import { selectAccountByName } from "../features/accounts";

type AccountCharacter = {
  id: string;
  name: string;
  rarity?: string;
  属性?: string;
  特色?: string;
  ownership: boolean;
};

const columns: ColumnDef<AccountCharacter>[] = [
  {
    accessorKey: "name",
    header: "角色",
  },
  {
    accessorKey: "rarity",
    header: "稀有度",
  },
  {
    accessorKey: "属性",
    header: "属性",
  },
  {
    accessorKey: "特色",
    header: "特色",
  },
  {
    accessorKey: "ownership",
    header: ()=><div className="w-[100px]">拥有</div>,
    cell: ({ getValue }) => (getValue<boolean>() ? <>✅</> : <>-</>),
  },
];

export function DashboardPanel() {
  const charactersValue = useAppSelector((state) => state.characters.values);
  const account = useAppSelector((state) =>
    selectAccountByName(state.accounts, "default")
  );
  const accountKey = account?.key || null;
  const ownershipValues = useAppSelector((state) => state.ownership.values);

  const characters = useMemo(
    () => Object.values(charactersValue),
    [charactersValue]
  );

  const data: AccountCharacter[] = useMemo(() => {
    return characters.map((character) => ({
      id: character.name,
      name: character.name,
      rarity: character?.detail?.rarity,
      属性: character?.detail?.属性,
      特色: character?.detail?.特色,
      ownership: accountKey
        ? ownershipValues?.[accountKey]?.[character.name]?.ownership
        : false,
    }));
  }, [characters, ownershipValues, accountKey]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border mt-5">
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
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
