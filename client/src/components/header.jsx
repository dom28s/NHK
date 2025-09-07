import React from 'react'
import {
    Newspaper,
    Copy,
    BookType,
    Bot,
    User,
    Slack
} from 'lucide-react';

function Header() {

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'News', href: '/news', icon: <Newspaper /> },
        { name: 'Flip Card', href: '/flip_card', icon: <Copy /> },
        { name: 'Bot', href: '/bot', icon: <Bot /> },
    ]

    return (
        <div className='w-full h-[80px] grid grid-cols-3  items-center'>
            <div className='flex flex-row items-center justify-start p-4  '>
                <Slack size={32} />
            </div>
            <div className='flex flex-row items-center justify-evenly h-[50px] border rounded-2xl bg-gray-800 '>
                <Newspaper className='' />
                <Copy size={32} />
                <BookType size={32} />
                <Bot size={32} />
            </div>
            <div className='flex flex-row items-center justify-end p-4 '>
                <User size={32} />
            </div>

        </div>
    )
}
export default Header