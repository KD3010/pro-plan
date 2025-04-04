"use client";
import { useAppDispatch, useAppSelector } from '@/app/StoreProvider';
import { setIsSidebarCollapsed } from '@/store';
import { useGetAllProjectsQuery } from '@/store/api';
import { AlertCircle, AlertOctagon, AlertTriangle, Briefcase, ChevronDown, HomeIcon, Layers3, LockIcon, Search, Settings, ShieldAlert, User, Users, X, type LucideIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

const SidebarLinksArr = [
    { icon: HomeIcon, label: "Home", href: "/" },
    { icon: Briefcase, label: "Project Timeline", href: "/timeline" },
    { icon: Search, label: "Search", href: "/search" },
    { icon: Settings, label: "Settings", href: "/settings" },
    { icon: User, label: "Users", href: "/users" },
    { icon: Users, label: "Team", href: "/teams" }
]

const PriorityLinksArr = [
    { icon: AlertCircle, label: "Blocker", href: "/priority/blocker" },
    { icon: ShieldAlert, label: "Critical", href: "/priority/critical" },
    { icon: AlertTriangle, label: "Major", href: "/priority/major" },
    { icon: AlertOctagon, label: "Minor", href: "/priority/minor" },
    { icon: Layers3, label: "Backlog", href: "/priority/backlog" },
]

const Sidebar = () => {
    const dispatch = useAppDispatch();
    const { isSidebarCollapsed } = useAppSelector((state) => state.global);

    const { data: projects } = useGetAllProjectsQuery();

    const [showProjects, setShowProjects] = useState<boolean>(false)
    const [showPriority, setShowPriority] = useState<boolean>(false)

    const sidebarClass = `fixed flex flex-col h-[100%] justify-between shadow-xl transition-all  duration-300 h-full z-40
        dark:bg-black overflow-y-auto bg-white ${isSidebarCollapsed ? "w-0 hidden" : "w-64"}
    `

  return (
    <div className={sidebarClass}>
        <div className='flex h-[100%] w-full flex-col justify-start'>
            {/* TOP LOGO */}
            <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
                <div className='text-xl font-bold text-gray-800 dark:text-white'>
                    Issue Tracker 2.0
                </div>
                {isSidebarCollapsed ? null : (
                    <button className='py-3' onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}>
                        <X className='h-6 w-6 text-gray-800 hover:text-gray-500 dark:text-white' />
                    </button>
                )}
            </div>

            {/* TEAM */}
            <div className='flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700'>
                <Image src={"/kd.jpg"} width={64} height={64} alt='Logo'/>
                <div>
                    <h3 className='text-md font-bold tracking-wide dark:text-gray-200'>KD Team</h3>
                    <div className="flex mt-1 items-start gap-2">
                        <LockIcon className='mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400 ' />
                        <p className='text-xs text-gray-500'>Private</p>
                    </div>
                </div>
            </div>

            {/* NAVBAR LINKS */}
            <nav className='z-10 w-full overflow-x-hidden'>
                {SidebarLinksArr.map((link, ind) => <SidebarLink key={ind} icon={link.icon} label={link.label} href={link.href}/>)}
                {/* PROJECTS LINKS */}
                <button 
                    onClick={() => setShowProjects((prev) => !prev)} 
                    className='flex w-full items-center justify-between px-7 py-3 text-gray-500'
                >
                    <span className=''>Projects</span>
                    <ChevronDown className={`h-5 w-5 transform-all duration-100 ${showProjects ? "-rotate-180" : "rotate-0"}`}/>
                </button>
                {showProjects ? (
                    projects?.map((project) => <SidebarLink key={project.id} icon={Briefcase} label={project.name} href={`/projects/${project.id}`}/>)
                ) : null}

                {/* PRIORITY LINKS */}
                <button 
                    onClick={() => setShowPriority((prev) => !prev)} 
                    className='flex w-full items-center justify-between px-7 py-3 text-gray-500'
                >
                    <span className=''>Priority</span>
                    <ChevronDown className={`h-5 w-5 transform-all duration-100 ${showPriority ? "-rotate-180" : "rotate-0"}`}/>
                </button>
                {showPriority ? (
                    PriorityLinksArr.map((priority, ind) => <SidebarLink key={ind} icon={priority.icon} label={priority.label} href={priority.href}/>)
                ) : null}
            </nav>
        </div>
    </div>
  )
}

interface SidebarLinkProps {
    href: string,
    icon: LucideIcon,
    label: string,
    // isCollapsed: boolean
}

const SidebarLink = ({href, icon: Icon, label}: SidebarLinkProps) => {
    const pathname = usePathname();
    const isActive = pathname === href || (pathname === "/" && href === "/dashboard");

    return (
        <Link href={href} className="w-full">
            <div className={`relative flex cursor-pointer items-center gap-3 transition-colors hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700
                ${isActive ? "bg-gray-100 text-white dark:bg-gray-600" : ""}
                justify-start px-7 py-3`}>
                    {isActive && (<div className='absolute left-0 top-0 h-[100%] w-[5px] bg-blue-200' />)}

                    <Icon className='h-6 w-6 text-gray-800 dark:text-gray-100' />
                    <span className='font-medium text-gray-800 dark:text-gray-100'>{label}</span>
            </div>
        </Link>
    )
}

export default Sidebar;