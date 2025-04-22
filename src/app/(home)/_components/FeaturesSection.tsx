import { CalendarDays, User, MapPin } from "lucide-react";
import { FunctionComponent } from "react";
import { FeatureCard } from "@/app/(home)/_components/FutureCard";

const features = [
  {
    icon: <User className="size-8 text-black" />,
    title: "Find a Doctor",
    description:
      "Browse through our extensive list of qualified doctors and specialists in your area.",
  },
  {
    icon: <CalendarDays className="size-8 text-black" />,
    title: "Book Appointment",
    description:
      "Select a convenient time slot from the doctor's available schedule.",
  },
  {
    icon: <MapPin className="size-8 text-black" />,
    title: "Visit Doctor",
    description:
      "Get directions to the doctor's office and receive appointment reminders.",
  },
];

export const FeaturesSection: FunctionComponent = () => {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
};
