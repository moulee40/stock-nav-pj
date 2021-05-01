import React from 'react'

function MenuItem({handleMenuItemClick,currentNavItem}) {
    const menuItems = ['Summary', 'Statistics','Analysis','Financial']
    return (
        <div className="flex flex-col">
           {menuItems.map((menuItem,index)=>{
               return (
                   <p key={index} onClick={e=>handleMenuItemClick(index)} className={`text-3xl ${currentNavItem === index ? 'bg-gray-500 text-white' : 'text-gray-700 hover:bg-gray-100'} font-medium text-center p-6 cursor-pointer `}>{menuItem}</p>
               )
           })}
        </div>
    )
}

export default MenuItem
