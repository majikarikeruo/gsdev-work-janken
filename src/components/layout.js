/**
 * components
 */
import Header from "@/components/header";
import Footer from "@/components/footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="pt-32">{children}</main>
      <Footer />
    </>
  );
};
export default Layout;
