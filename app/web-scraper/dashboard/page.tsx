import RecentSearchesTable from "@/app/components/RecentSearchesTable/RecentSearchesTable";
import Wrapper from "@/app/utils/Wrapper/Wrapper";
import { ToastContainer } from "react-toastify";

export default function Page() {
  return (
    <Wrapper className="!max-w-[1100px]">
      <RecentSearchesTable />
      <ToastContainer position="bottom-left" autoClose={2000} />
    </Wrapper>
  );
}
