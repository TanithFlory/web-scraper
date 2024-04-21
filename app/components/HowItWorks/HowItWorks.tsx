import Wrapper from "@/app/utils/Wrapper/Wrapper";
import howItWorksData from "./howItWorksData";
import HowItWorksCard from "../Cards/HowItWorksCard";

export default function HowItWorks() {
  return (
    <section>
      <Wrapper className="pb-20">
        <div className="mb-4">
          <h3 className="text-fs-400 text-textActive text-center font-bold">
            How It Works
          </h3>
        </div>
        <div>
          <div className="flex items-center justify-center flex-wrap gap-4">
            {howItWorksData.map((item, index) => {
              return <HowItWorksCard key={index} {...item} index={index + 1} />;
            })}
          </div>
        </div>
      </Wrapper>
    </section>
  );
}
