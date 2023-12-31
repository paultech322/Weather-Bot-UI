import React from "react"
import SkeletonTableBody from "../SkeletonTableBody"
import TableRow from "../TableRow"
import TableHead from "../TableHead"
import { TelegramUser } from "../types"
import SearchInput from "../SearchInput"
import Pagination from "../Pagination"
import { useAdminProvider } from "../../../../providers/AdminProvider"

const Table = () => {
  const { paginatedUser } = useAdminProvider()

  return (
    <>
      <div className="w-[90%] xl:w-[80%] flex justify-end pb-[10px]">
        <SearchInput />
      </div>
      <table
        className="w-[90%] xl:w-[80%] font-poppins bg-white
        border-black border-[2px]"
      >
        <thead className="border-b-[2px] border-black border-solid">
          <tr className="text-black">
            <TableHead className="border-r-[2px] border-black">User ID</TableHead>
            <TableHead className="border-r-[2px] border-black">User Name</TableHead>
            <TableHead className="border-r-[2px] border-black">Join At</TableHead>
            <TableHead>Action</TableHead>
          </tr>
        </thead>
        {paginatedUser ? (
          <tbody>
            {paginatedUser.length ? (
              paginatedUser.map((user: TelegramUser) => <TableRow key={user.userid} user={user} />)
            ) : (
              <tr className="text-black text-center">
                <td colSpan={4} className="p-4">
                  No Telegram Users
                </td>
              </tr>
            )}
          </tbody>
        ) : (
          <SkeletonTableBody />
        )}
      </table>
      <div className="w-[90%] xl:w-[80%] flex justify-end pb-[10px]">
        <Pagination />
      </div>
    </>
  )
}

export default Table
