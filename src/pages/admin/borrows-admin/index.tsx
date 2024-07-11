import TableData from "@/components/table-data";
import { Input } from "@/components/ui/input";
import { IMeta } from "@/utils/types/api";
import { BorrowPayload, IBorrow } from "@/utils/types/borrows";
import { ColumnDef } from "@tanstack/react-table";
import { useCallback, useEffect, useMemo, useState } from "react";
import { format, parseISO } from "date-fns";
import EditBorrow from "./edit-borrow";
import { Edit2, Trash2 } from "lucide-react";
import Alert from "@/components/alert";
import { deleteBorrow, getBorrows, updateBorrow } from "@/utils/apis/borrows";
import { toast } from "sonner";
import { debounce } from "lodash";
import { useSearchParams } from "react-router-dom";

export default function BorrowsAdmin() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [borrows, setBorrows] = useState<IBorrow[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [meta, setMeta] = useState<IMeta>();

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  const getSuggestions = useCallback(
    async function (query: string) {
      if (!query) {
        searchParams.delete("query");
      } else {
        searchParams.set("query", query);
        searchParams.delete("page");
      }
      setSearchParams(searchParams);
    },
    [searchParams]
  );

  const columns = useMemo<ColumnDef<IBorrow>[]>(
    () => [
      {
        header: "No",
        accessorKey: "id",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        size: 50,
      },
      {
        header: "User",
        accessorKey: "user.full_name",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "Book",
        accessorKey: "book.title",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        size: 200,
      },
      {
        header: "Borrow Date",
        accessorKey: "borrow_date",
        cell: (info) =>
          format(parseISO(info.getValue() as string), "iii, dd MMM yyyy"),
        footer: (props) => props.column.id,
      },
      {
        header: "Due Date",
        accessorKey: "due_date",
        cell: (info) =>
          format(parseISO(info.getValue() as string), "iii, dd MMM yyyy"),
        footer: (props) => props.column.id,
      },
      {
        header: "Return Date",
        accessorKey: "return_date",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "",
        accessorKey: "actionEdit",
        cell: (info) => (
          <EditBorrow
            editData={info.row.original}
            onSubmit={(data) => onSubmit(data, info.row.original.id)}
          >
            <Edit2 />
          </EditBorrow>
        ),
        footer: (props) => props.column.id,
        size: 50,
      },
      {
        header: "",
        accessorKey: "actionDelete",
        cell: (info) => (
          <Alert
            title="Are you sure?"
            description={`This action cannot be undone. This will permanently delete the borrow data.`}
            onAction={() => onDelete(info.row.original.id)}
          >
            <Trash2 className="text-red-700"/>
          </Alert>
        ),
        footer: (props) => props.column.id,
        size: 50,
      },
    ],
    []
  );

  const getSuggestionsDebounce = useMemo(
    () => debounce(getSuggestions, 1000),
    [getSuggestions]
  );

  async function fetchData() {
    if (searchParams.get("tab") !== "books") {
      if (searchParams.has("query")) {
        setSearchValue(searchParams.get("query")!);
      }

      const query = Object.fromEntries(
        [...searchParams].filter((param) => param[0] !== "tab")
      );

      try {
        const result = await getBorrows({ ...query });
        const { datas, ...rest } = result.payload;
        setBorrows(datas);
        setMeta(rest);
      } catch (error) {
        toast(((error as Error).message));
      }
    }
  }
  async function onSubmit(data: BorrowPayload, id_borrow: number) {
    try {
      const result = await updateBorrow(data, id_borrow);
      toast.success('Update Borrow Success');
    } catch (error) {
      toast.error(((error as Error).message));
    }
  }

  async function onDelete(id_borrow: number) {
    try {
       await deleteBorrow(String(id_borrow));
      toast.success('Delete Borrow Success');
      fetchData();
    } catch (error: any) {
      toast.error((error.message.toString()));
    }
  }

  function onInputChange(newValue: string) {
    setSearchValue(newValue);
    getSuggestionsDebounce(newValue);
  }

  return (
    <div className="pt-5">
      <div className="w-full flex justify-end">
        <div className="flex w-full max-w-sm space-x-2">
          <Input
            placeholder="Search"
            type="search"
            value={searchValue}
            onChange={(e) => onInputChange(e.currentTarget.value)}
          />
        </div>
      </div>
      <div className="pt-4">
      <TableData columns={columns} datas={borrows} />
      </div>
    </div>
  );
}
