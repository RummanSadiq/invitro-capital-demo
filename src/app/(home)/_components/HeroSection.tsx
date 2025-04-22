import Link from "next/link";
import { Button } from "@/components/ui/button";
import classNames from "classnames";
import { FunctionComponent } from "react";
import { ROUTES } from "@/utils/route";

export const HeroSection: FunctionComponent = () => {
  return (
    <section
      className={classNames(
        "flex flex-col items-center justify-center text-center mb-16",
      )}
    >
      <h1
        className={classNames(
          "text-4xl md:text-5xl font-bold text-gray-900 mb-4",
        )}
      >
        Book Your Doctor Appointment with Ease
      </h1>
      <p className={classNames("text-xl text-gray-600 max-w-2xl mb-8")}>
        Find and schedule appointments with the best healthcare professionals in
        your area. No waiting times, no hassle.
      </p>
      <Button size="lg" asChild>
        <Link href={ROUTES.doctor}>Find a Doctor</Link>
      </Button>
    </section>
  );
};
