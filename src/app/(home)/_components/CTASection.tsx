import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FunctionComponent } from "react";
import classNames from "classnames";
import { ROUTES } from "@/utils/route";

export const CTASection: FunctionComponent = () => {
  return (
    <section
      className={classNames(
        "bg-black text-white rounded-lg p-8 md:p-12 text-center"
      )}
      aria-labelledby="cta-heading"
      role="complementary"
    >
      <h2 id="cta-heading" className={classNames("text-3xl font-bold mb-4")}>
        Ready to Book Your Appointment?
      </h2>
      <p
        className={classNames("text-lg mb-6 max-w-2xl mx-auto")}
        id="cta-description"
      >
        Join thousands of patients who have simplified their healthcare journey
        with our booking platform.
      </p>
      <div
        className={classNames("flex flex-col sm:flex-row gap-4 justify-center")}
        role="group"
        aria-label="Call to action buttons"
      >
        <Button
          variant="secondary"
          size="lg"
          aria-describedby="cta-description"
        >
          <Link href={ROUTES.doctor} className={classNames("")}>
            Find a Doctor
          </Link>
        </Button>
        <Button
          variant="secondary"
          size="lg"
          aria-describedby="cta-description"
        >
          <Link href={ROUTES.appointment} className={classNames("")}>
            My Appointments
          </Link>
        </Button>
      </div>
    </section>
  );
};
