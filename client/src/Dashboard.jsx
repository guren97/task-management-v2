import Header from "./components/Header/Header.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
const Dashboard = () => {
  return (
    <>
      <div className="">
        <Header />

        <main className="flex justify-between">
          <section>
            {" "}
            <Sidebar />
          </section>
          <section className="border border-red-600 w-full">
            {" "}
            Main Content
          </section>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
