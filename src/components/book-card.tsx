import { Link } from "react-router-dom";


import { IBook } from "@/utils/types/books";
import { Skeleton } from "./ui/skeleton";

interface BookCardProps {
  data: IBook;
  navigate: string;
  "data-testid"?: string;
}

export const BookCard = (props: BookCardProps) => {
  const { data, navigate } = props;
  return (
    <Link
      className="flex flex-col p-4 w-46 sm:w-48 md:w-56 lg:w-64 h-fit items-center gap-3"
      to={navigate}
      data-testid={props["data-testid"]}
    >
      <figure className="overflow-hidden shadow-md rounded-xl shadow-neutral-200">
        <img
          className="h-auto w-auto rounded-xl object-cover aspect-[3/4]"
          src={data.cover_image}
          alt={data.title}
          width={250}
          height={330}
        />
      </figure>
      <p className="font-bold text-lg tracking-wide text-center text-red-700">
        {data.title}
      </p>
      <p className="text-muted-foreground text-sm text-center">{data.author}</p>
    </Link>
  );
};

export const BookCardLoading = () => {
  return (
    <div className="flex flex-col p-4 w-48 md:w-56  lg:w-64 h-fit items-center gap-3">
      <Skeleton className="w-full h-[17rem] bg-gray-100" />
      <Skeleton className="h-4 w-full bg-gray-100" />
      <Skeleton className="h-4 w-full bg-gray-100" />
    </div>
  );
};
