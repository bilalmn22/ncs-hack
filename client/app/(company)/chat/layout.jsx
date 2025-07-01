import LayoutProvider from "../layout-provider";

export default function Layout({ children }) {
  return <LayoutProvider>{children}</LayoutProvider>;
}
