import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {Navbar} from "@/components/layout/Navbar";
import {Footer} from "@/components/layout/Footer";
import classNames from "classnames";
import {AppointmentsProvider} from "@/context/useAppointmentContext";
import {Toaster} from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HealthConnect - Doctor Appointment Booking",
  description: "Book appointments with top doctors in your area",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppointmentsProvider>
          <Navbar />
          <main id="main-content" className={classNames("bg-gray-50")}>
            {children}
          </main>
          <Footer />
          <Toaster />
        </AppointmentsProvider>
      </body>
    </html>
  );
}
