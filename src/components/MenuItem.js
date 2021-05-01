import React from 'react'

function MenuItem({handleMenuItemClick}) {
    const menuItems = ['Summary', 'Statistics','Analysis','Financial']
    return (
        <div className="flex flex-col">
           {menuItems.map((menuItem,index)=>{
               return (
                   <p key={index} onClick={e=>handleMenuItemClick(index)} className="text-4xl w-full text-center p-6 cursor-pointer hover:bg-gray-100">{menuItem}</p>
               )
           })}
        </div>
    )
}

export default MenuItem
