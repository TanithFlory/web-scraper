import Wrapper from "@/app/utils/Wrapper/Wrapper";
import informationData from "./informationData";
import MoreInfoCard from "../Cards/MoreInfoCard";

export default function MoreInformation() {
  return (
    <section>
      <Wrapper className="flex items-center justify-center gap-4 flex-wrap">
        {informationData.map((item, index) => {
          return <MoreInfoCard {...item} key={index} />;
        })}
      </Wrapper>
    </section>
  );
}
