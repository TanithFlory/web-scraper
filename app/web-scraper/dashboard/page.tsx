import RecentSearchesTable from "@/app/components/RecentSearchesTable/RecentSearchesTable";
import Wrapper from "@/app/utils/Wrapper/Wrapper";

export default function Page() {
  return (
    <Wrapper className="!max-w-[1100px]">
      <RecentSearchesTable />
    </Wrapper>
  );
}
