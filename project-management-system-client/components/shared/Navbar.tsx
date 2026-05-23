"use client";

import { motion } from "framer-motion";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";

import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

import NextLink from "next/link";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/icons";
import Image from "next/image";
import image from "@/assets/logo/logo1.jpg";

export const Navbar = () => {
  return (
    <HeroUINavbar
      maxWidth="xl"
      position="sticky"
      className="
      bg-white/60 dark:bg-black/40
      backdrop-blur-xl
      border-b border-white/20 dark:border-white/10
      shadow-sm
    "
    >
      {/* Left Section */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        {/* Logo */}
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-2" href="/">
            <Image
              src={image}
              alt="FedIQ Logo"
              width={32}
              height={32}
              priority
              className="rounded-full"
            />

            <motion.span
              className="
              font-bold text-xl
              bg-gradient-to-r
              from-primary
              via-secondary
              to-primary
              bg-clip-text
              text-transparent
            "
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              style={{ backgroundSize: "200% 200%" }}
            >
              FedIQ
            </motion.span>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      {/* Right Section */}
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>

        <NavbarItem className="hidden md:flex">
          <Button
            as={Link}
            className="
            text-sm font-normal
            text-default-600
            bg-white/70 dark:bg-white/10
            backdrop-blur-md
            border border-white/20
          "
            variant="flat"
          >
            Login
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Section */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
