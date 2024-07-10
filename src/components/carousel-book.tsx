import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { IBook } from "@/utils/types/books";
import { Link } from "react-router-dom";

interface Props {
  data: IBook;
  navigate: string;
  "data-testid"?: string;
}

export default function CarouselBook(props: Props) {
  const { data, navigate } = props;

  return (
    <div>
      <Carousel
        opts={{
          align: "center",
        }}
        className="w-full "
      >
        <CarouselContent>
            <CarouselItem  className="md:basis-1/2 lg:basis-1/5">
              <Link
                className="flex flex-col p-4 w-48 md:w-56 lg:w-64 h-fit items-center gap-3"
                to={navigate}
                data-testid={props["data-testid"]}
              >
                <figure className="overflow-hidden shadow-md shadow-neutral-300">
                  <img
                    className="h-auto w-auto object-cover aspect-[3/4]"
                    src={data.cover_image}
                    alt={data.title}
                    width={250}
                    height={330}
                  />
                </figure>
                <p className="font-bold text-lg tracking-wide text-center">
                  {data.title}
                </p>
                <p className="text-muted-foreground text-sm text-center">
                  {data.author}
                </p>
              </Link>
            </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
