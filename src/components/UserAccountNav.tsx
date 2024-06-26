"use client"

import { FC } from "react"
import { User } from 'next-auth'
import { DropdownMenu, DropdownMenuTrigger } from "./ui/DropdownMenu"
import UserAvatar from "./UserAvatar"
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu"
import Link from "next/link"
import { signOut } from "next-auth/react"

interface UserAccountNavProps {
  user: Pick<User, 'name' | 'image' | 'email'>
}

const UserAccountNav: FC<UserAccountNavProps> = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          className="h-8 w-8"
          user={{
            name: user.name || null,
            image: user.image || null
          }} />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-white" align="end" >

        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && <p className="w-[200px] truncate text-sm text-zinc-700">{user.email}</p>}
          </div>
        </div>

        <DropdownMenuSeparator className="h-2" />

        <DropdownMenuItem asChild>
          <Link href='/'>Feed</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href='/settings'>Settings</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="h-3" />

        <DropdownMenuItem className="cursor-pointer" asChild onClick={(event) => {
          event.preventDefault();
          signOut({
            callbackUrl: `${window.location.origin}/sign-in`,
            redirect: true,
          })
        }}>
          <Link href='/sign-out'>Sign Out</Link>
        </DropdownMenuItem>


      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserAccountNav;
