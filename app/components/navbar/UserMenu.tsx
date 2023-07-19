'use client'

import { AiOutlineMenu } from "react-icons/ai"
import Avatar from "../Avatar"
import { useCallback, useState } from "react"
import MenuItem from "./MenuItem"
import useRegisterModal from "@/app/hooks/useRegisterModal"
import useLoginModal from "@/app/hooks/useLoginModal"
import { signOut } from "next-auth/react"
import { SafeUser } from "@/app/types"
import { User } from "@prisma/client"
import useRentModal from "@/app/hooks/useRentModal"

interface UserMenuProps {
    currentUser?: User | null
}

const UserMenu = ({ currentUser }:UserMenuProps) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal()
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = useCallback(()=>{
    setIsOpen(prev=>!prev);
  },[])

  const onRent = useCallback(()=>{
    if(!currentUser) return loginModal.onOpen();

    // Open Rental Modal
    rentModal.onOpen();
  },[currentUser, loginModal, rentModal])

  return (
    <div className="relative">
        <div className="flex flw-row items-center gap-3">
            <div
                onClick={onRent}
                className="
                    hidden
                    md:block
                    text-sm font-semibold
                    py-3 px-4
                    rounded-full
                    hover:bg-neutral-100
                    transition
                    cursor-pointer
                "
            >
                Airbnb your home
            </div>
            <div
                onClick={toggleOpen}
                className="
                    p-4
                    md:py-1
                    md:px-2
                    border-[1px]
                    border-neutral-200
                    flex flex-row items-center gap-3 
                    rounded-full
                    cursor-pointer
                    hover:shadow-md
                    transition
                "
            >
                <AiOutlineMenu />
                <div className="hidden md:block">
                    <Avatar src={currentUser?.image}/>
                </div>
            </div>
        </div>

        {isOpen && (
            <div className="absolute w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm rounded-xl shadow-md">
                <div className="flex flex-col cursor-pointer">
                    {
                        currentUser ? (
                        <>
                            <MenuItem onClick={()=>{}} label="My Trips"/>
                            <MenuItem onClick={() =>{}} label="My Favariotes"/>
                            <MenuItem onClick={()=>{}} label="My Revervations"/>
                            <MenuItem onClick={() =>{}} label="My Properties"/>
                            <MenuItem onClick={rentModal.onOpen} label="Airbnb my home"/>
                            <hr />
                            <MenuItem onClick={signOut} label="로그아웃"/>
                        </>
                        ) :
                        (
                        <>
                            <MenuItem onClick={loginModal.onOpen} label="로그인"/>
                            <MenuItem onClick={registerModal.onOpen} label="회원가입"/>
                            <MenuItem onClick={()=>{}} label="로그아웃"/>
                        </>
                        )
                    }

                </div>
            </div>
        )}

    </div>
  )
}

export default UserMenu