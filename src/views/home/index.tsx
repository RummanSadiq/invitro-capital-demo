import classNames from "classnames";
import { HeroSection } from "@/app/(home)/_components/HeroSection";
import { FeaturesSection } from "@/app/(home)/_components/FeaturesSection";
import { CTASection } from "@/app/(home)/_components/CTASection";
import { FunctionComponent } from "react";

export const HomeView: FunctionComponent = () => {
  return (
    <main
      className={classNames("flex flex-col px-4 py-12")}
      role="main"
      aria-labelledby="page-title"
    >
      <HeroSection />
      <FeaturesSection />
      <CTASection />
    </main>
  );
};
