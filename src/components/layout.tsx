import Navbar from "./navbar";

interface Props {
  children: React.ReactNode;
}

function Layout(props: Props) {
  return (
    <>
      <div className="w-full h-screen bg-white dark:bg-black text-gray-900 dark:text-white overflow-auto font-roboto flex flex-col items-center">
        <Navbar />
        <div>{props.children}</div>
      </div>
    </>
  );
}

export default Layout;
