import { addBook, deleteBook, getBooks, updateBook } from "@/utils/apis/books";
import { BookSchema, IBook } from "@/utils/types/books";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2, Trash2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AddEditBook from "./add-edit-book";
import Alert from "@/components/alert";
import { debounce } from "lodash";
import { toast } from "sonner";
import TableData from "@/components/table-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function BooksAdmin() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchValue, setSearchValue] = useState("");
  const [books, setBooks] = useState<IBook[]>([]);

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

  const columns = useMemo<ColumnDef<IBook>[]>(
    () => [
      {
        header: "No",
        accessorKey: "id",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        size: 50,
      },
      {
        header: "Title",
        accessorKey: "title",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        size: 200,
      },
      {
        header: "Author",
        accessorKey: "author",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "Category",
        accessorKey: "category",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "ISBN",
        accessorKey: "isbn",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "Featured",
        accessorKey: "featured",
        cell: (info) => String(info.getValue()),
        footer: (props) => props.column.id,
        size: 80,
      },
      {
        id: "actionEdit",
        cell: (info) => (
          <AddEditBook
            editData={info.row.original}
            onSubmit={(data) => onSubmit(data, info.row.original.id)}
          >
            <Edit2 />
          </AddEditBook>
        ),
        footer: (props) => props.column.id,
        size: 50,
      },
      {
        id: "actionDelete",
        cell: (info) => (
          <Alert
            title="Are you sure?"
            description={`This action cannot be undone. This will permanently delete "${info.row.original.title}".`}
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
    if (searchParams.get("tab") !== "borrows") {
      if (searchParams.has("query")) {
        setSearchValue(searchParams.get("query")!);
      }

      // const query = Object.fromEntries(
      //   [...searchParams].filter((param) => param[0] !== "tab")
      // );

      try {
        const result = await getBooks();
        const { datas, } = result.payload;
        setBooks(datas);

      } catch (error) {
        toast((error as Error).message);
      }
    }
  }

  async function onSubmit(data: BookSchema, id_book?: number) {
    try {
       id_book
        ? await updateBook(data, id_book)
        : await addBook(data);
      toast.success('Book saved successfully!');
    } catch (error) {
      toast.error('Error saving book: ' + (error as Error).toString());
    }
  }

  async function onDelete(id_book: number) {
    try {
       await deleteBook(String(id_book));
      toast.success("Delete Success");
      fetchData();
    } catch (error: any) {
      toast((error as Error).message);
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
          <AddEditBook onSubmit={(data) => onSubmit(data)}>
            <Button className="text-white">Add</Button>
          </AddEditBook>
        </div>
      </div>
      <div className="pt-4">
      <TableData columns={columns} datas={books} />
      </div>
    </div>
  );
}
