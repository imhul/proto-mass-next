"use client"

import Link from "next/link"
import ThemeToggle from "@/components/theme-toggle"
import Menu from "@/components/menu"
import Image from "next/image"

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800">
      <Link href="/">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
      </Link>
      <Menu />
      <ThemeToggle />
    </header>
  )
}

export default Header
