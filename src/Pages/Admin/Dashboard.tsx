import { ArrowDown, ArrowUp, LogOut } from "lucide-react";
import { memo, useState } from "react";
import { Toaster } from "react-hot-toast";
import { BiMaleFemale, BiSearch } from "react-icons/bi";
import { RiNotification2Line, RiUser2Line } from "react-icons/ri";
import BarChart from "../../Components/admin/BarChart";
import DashboardTable from "../../Components/admin/DashboardTable";
import DoughnutChart from "../../Components/admin/DoughnutChart";
import NavBar from "../../Components/admin/NavBar";
import OverviewCard from "../../Components/admin/OverviewCard";
import WowSuchEmpty from "../../Components/WowSuchEmpty";
import { useErrorNotification } from "../../hooks/useErrorNotification";
import { useLogOut } from "../../hooks/useLogOut";
import { InventoryDataType } from "../../types/dashboard";
import Loader from "../../Components/Loader";
import { useDashboard } from "../../hooks/admin/useDashboard";



const Dashboard = () => {
  const [showLogOut, setShowLogOut] = useState<boolean>(false);
  const { dashboardData, isError, error, isPending } = useDashboard();
  const {handleLogOut}=useLogOut();

  useErrorNotification(isError, error);

  const handleShowLogOut = () => {
    setShowLogOut(prev => !prev);
  }

  return (
    <div className="md:flex ">

      <NavBar />

      {/* mainContainer */}
      {
        isPending ? <Loader /> :

          dashboardData?.stats ?

            <main className="md:flex-1 min-h-screen   bg-gray-100 p-8 ">

              {/* topContainer */}

              <div className="flex items-center relative">
                <BiSearch className="font-bold text-xl text-gray-700" />
                <input className="px-4 py-2 border-none focus:outline-none bg-gray-100 text-lg w-[90%]" type="text" placeholder="Search for users and other Stats" />
                <div className="flex gap-2  ml-auto">
                  <RiNotification2Line className=" self-center" />
                  <div onClick={handleShowLogOut} className="cursor-pointer">

                    <RiUser2Line className="text-3xl self-center"/>
                    {showLogOut ? <ArrowUp className="absolute -right-4 top-2 text-3xl" /> : <ArrowDown className="absolute -right-4 top-2 text-3xl" />}
                  </div>
                    {showLogOut &&
                      <div className="absolute -right-4 top-10 bg-gray-600 rounded-lg text-white h-[2rem] p-2 flex items-center justify-center font-semibold hover:bg-gray-800">
                        <LogOut />
                        <button onClick={handleLogOut} >LogOut</button>
                      </div>
                    }
                </div>
              </div>

              <hr className="md:mt-4 h-1 bg-gray-300 "></hr>

              {/* CardsSection */}

              <section className="mt-2 flex flex-wrap gap-3 justify-center md:justify-start  lg:justify-between xl:gap-10 xl:pl-16 xl:pr-16">

                {
                  dashboardData.stats.overviewCount.map((data, idx) => (
                    <OverviewCard key={idx} name={data.name} count={data.count} rate={data.rate} />
                  ))
                }

              </section>

              {/* Charts and inventory section  */}

              <section className="mt-5  min-h-[50vh] lg:flex gap-3">

                {/* Inventory Item In stock Percentage */}

                <div className=" bg-white rounded-lg w-[100%]  m-auto lg:m-0 p-3 lg:w-[25%] lg:h-[65vh] lg:mt-5 order-2">
                  <h1 className="font-bold text-xl text-center lg:text-3xl lg:mt-6">Inventory</h1>
                  <div className="h-3/4 flex flex-col justify-center items-center ">

                    {
                      dashboardData.stats.inventoryStats.map((item, idx) => (
                        <Inventory key={idx} name={item.name} count={item.count} percentage={item.percentage} />
                      ))
                    }

                  </div>
                </div>

                {/* BarChart */}

                <div className="mt-5 h-[30vh] flex-1 flex justify-center items-center lg:h-[65vh] ">
                  <div className="h-full w-full bg-white rounded-lg">
                    <BarChart
                      dataSet_1={dashboardData.stats.lastSixMnthsStats.ordersCreated}
                      dataSet_2={dashboardData.stats.lastSixMnthsStats.revenueGenerated}
                      title1="Revenue" title2="Orders"
                      bgColor1="rgb(0,115,255)"
                      bgColor2="rgba(53,162,235,0.8)"
                    />
                  </div>
                </div>

              </section>

              {/* Gender Ratio and  Top Transaction section*/}

              <section className="mt-5 lg:flex gap-10 ">

                {/* chart for male-female ratio*/}

                <div className="bg-white rounded-xl p-2 relative lg:w-[20rem] m-auto lg:m-0">
                  <h1 className="font-bold text-2xl text-center ">Gender Ratio</h1>
                  <BiMaleFemale size={30} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  <div className="w-[20rem] h-[20rem] mt-5 m-auto ">

                    <DoughnutChart backgroundColor={["pink", "blue"]} data={[dashboardData.stats.genderRatio.female, dashboardData.stats.genderRatio.male]} labels={["Female", "Male"]} cutout={90} />

                  </div>
                </div>
                <DashboardTable data={dashboardData.stats.latestTransactions} />
              </section>

            </main>
            :
            <WowSuchEmpty />
      }

      <Toaster position="top-center" />
    </div>
  )
};



const Inventory = memo(({ name, count, percentage }: InventoryDataType) => {
  const color = `hsl(${percentage / 100 * 120}, 100%, 50%)`;
  return (
    <div className="flex items-center gap-2 w-full my-2">
      <span className="min-w-[20%] font-semibold text-start">{name.charAt(0).toUpperCase()+name.slice(1)}</span>
      <div className="w-full rounded-lg h-2">
        <div
          className="h-2 rounded-lg"
          style={{
            backgroundColor: color,
            width: `${percentage}%`,
          }}
        ></div>
      </div>
      <span>({count})</span>
      <span className="max-w-10">{percentage}%</span>
    </div>
  );
});

export default Dashboard;
