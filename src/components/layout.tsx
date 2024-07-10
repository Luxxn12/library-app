import { useLoaderData } from "react-router-dom";
import Navbar from "./navbar";
import useTitle from "@/utils/hooks/use-title";

interface Props {
  children: React.ReactNode;
}

function Layout(props: Props) {
  const loaderData = useLoaderData() as string;
  useTitle(loaderData);
  return (
    <>
      <div className="w-full  h-dvh bg-white  overflow-auto font-roboto">
        <div className=" h-full overflow-auto flex flex-col mx-auto">
          <Navbar />
          <div className="w-full flex-1 flex flex-col relative">
            <div>{props.children}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
