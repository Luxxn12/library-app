interface Props {
  children: React.ReactNode;
}

function Layout(props: Props) {
  return <div>{props.children}</div>;
}

export default Layout;