"use client";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";

const links = [
  {
    label: "Products",
    href: "/",
  },
  {
    label: "Pricing",
    href: "/",
  },
  {
    label: "Blog",
    href: "/",
  },
];

const Navbar = () => {
  return (
    <div className="w-full flex justify-between p-5 items-center px-5 md:px-20">
      <div>
        <div className="hidden md:flex items-center">
          <h3 className="text-2xl font-bold">LOGO</h3>
          <div className="ml-10 uppercase gap-5 flex font-semibold">
            {links.map((link, index) => (
              <Link href={link.href} key={index}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger>
              <MenuIcon />
            </SheetTrigger>
            <SheetContent side="left" className="w-[35%] flex flex-col gap-1">
              {links.map((link, index) => (
                <Link
                  href={link.href}
                  key={index}
                  className="hover:bg-gray-200 p-2 rounded-md"
                >
                  {link.label}
                </Link>
              ))}
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div>User MEnu</div>
    </div>
  );
};

export default Navbar;
