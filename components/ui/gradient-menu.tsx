import React from 'react';
import { IoHomeOutline, IoCafeOutline, IoLeafOutline, IoHeartOutline, IoGiftOutline } from 'react-icons/io5';

const menuItems = [
    { title: 'Home', icon: <IoHomeOutline />, gradientFrom: '#F472B6', gradientTo: '#EC4899' },
    { title: 'Beans', icon: <IoCafeOutline />, gradientFrom: '#FB7185', gradientTo: '#F43F5E' },
    { title: 'Origin', icon: <IoLeafOutline />, gradientFrom: '#FBCFE8', gradientTo: '#F472B6' },
    { title: 'Gift', icon: <IoGiftOutline />, gradientFrom: '#FDA4AF', gradientTo: '#FB7185' },
    { title: 'Love', icon: <IoHeartOutline />, gradientFrom: '#F9A8D4', gradientTo: '#EC4899' }
];

export default function GradientMenu() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-[#1a0a10]">
            <ul className="flex gap-6">
                {menuItems.map(({ title, icon, gradientFrom, gradientTo }, idx) => (
                    <li
                        key={idx}
                        style={{
                            '--gradient-from': gradientFrom,
                            '--gradient-to': gradientTo
                        } as React.CSSProperties}
                        className="relative w-[60px] h-[60px] bg-white/10 shadow-lg rounded-full flex items-center justify-center transition-all duration-500 hover:w-[180px] hover:shadow-none group cursor-pointer border border-white/10"
                    >
                        {/* Gradient background on hover */}
                        <span className="absolute inset-0 rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] opacity-0 transition-all duration-500 group-hover:opacity-100"></span>

                        {/* Blur glow */}
                        <span className="absolute top-[10px] inset-x-0 h-full rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] blur-[15px] opacity-0 -z-10 transition-all duration-500 group-hover:opacity-50"></span>

                        {/* Icon */}
                        <span className="relative z-10 transition-all duration-500 group-hover:scale-0 delay-0">
                            <span className="text-2xl text-white/60">{icon}</span>
                        </span>

                        {/* Title */}
                        <span className="absolute text-white uppercase tracking-wide text-sm transition-all duration-500 scale-0 group-hover:scale-100 delay-150">
                            {title}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
