"use client";
import React, {FunctionComponent, useCallback, useState} from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import classNames from "classnames";

export const Navbar: FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const closeNavbar = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <nav className={classNames("bg-white shadow-sm")}>
      <div className={classNames("container mx-auto px-4")}>
        <div className={classNames("flex justify-between items-center h-16")}>
          {/* Logo */}
          <div className={classNames("flex-shrink-0")}>
            <Link href="/" className={classNames("flex items-center")}>
              <span className={classNames("font-bold text-xl")}>
                HealthConnect
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className={classNames("hidden md:block")}>
            <div className={classNames("ml-10 flex items-center space-x-4")}>
              <Link
                href="/"
                className={classNames(
                  "text-gray-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium"
                )}
              >
                Home
              </Link>
              <Link
                href="/doctors"
                className={classNames(
                  "text-gray-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium"
                )}
              >
                Find Doctors
              </Link>
              <Link
                href="/appointments"
                className={classNames(
                  "text-gray-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium"
                )}
              >
                My Appointments
              </Link>
            </div>
          </div>

          {/* User Section */}
          <div className={classNames("hidden md:flex items-center space-x-2")}>
            <Button variant="ghost" asChild>
              <Link href="/">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="/">Sign up</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className={classNames("md:hidden")}>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className={classNames("w-[300px] p-0")}
              >
                <SheetTitle className={classNames("sr-only")}>
                  Mobile Navigation
                </SheetTitle>
                <SheetDescription className={classNames("sr-only")}>
                  Navigation menu for mobile devices
                </SheetDescription>
                <div className={classNames("flex flex-col h-full")}>
                  <div
                    className={classNames("px-6 py-6 border-b border-gray-200")}
                  >
                    <Link
                      href="/"
                      className={classNames("flex items-center")}
                      onClick={closeNavbar}
                    >
                      <span
                        className={classNames("text-black font-bold text-xl")}
                      >
                        HealthConnect
                      </span>
                    </Link>
                  </div>

                  <nav className={classNames("flex-1 px-6 py-6 space-y-4")}>
                    <SheetClose asChild>
                      <Link
                        href="/"
                        className={classNames(
                          "block text-gray-700 hover:bg-gray-100 hover:text-blue-600 px-3 py-3 rounded-md text-base font-medium transition-colors"
                        )}
                      >
                        Home
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/doctors"
                        className={classNames(
                          "block text-gray-700 hover:bg-gray-100 hover:text-blue-600 px-3 py-3 rounded-md text-base font-medium transition-colors"
                        )}
                      >
                        Find Doctors
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/appointments"
                        className={classNames(
                          "block text-gray-700 hover:bg-gray-100 hover:text-blue-600 px-3 py-3 rounded-md text-base font-medium transition-colors"
                        )}
                      >
                        My Appointments
                      </Link>
                    </SheetClose>
                  </nav>

                  <div
                    className={classNames(
                      "px-6 py-6 border-t border-gray-200 space-y-3"
                    )}
                  >
                    <SheetClose asChild>
                      <Button
                        variant="outline"
                        asChild
                        className={classNames("w-full")}
                      >
                        <Link href="/">Log in</Link>
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button asChild className={classNames("w-full")}>
                        <Link href="/">Sign up</Link>
                      </Button>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
