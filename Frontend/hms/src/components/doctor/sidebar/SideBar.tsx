import React from "react";
import { Avatar, Text } from "@mantine/core"
import {IconHeartbeat, IconLayoutGrid, IconStethoscope, IconMoodHeart, IconCalendarCheck, IconVaccine, IconUser } from "@tabler/icons-react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const links = [
    {
        name:"Dashboard", url:"/doctor/dashboard", icon:<IconLayoutGrid stroke={1.5}/>
    },
    {
        name:"Profile", url:"/doctor/profile", icon:<IconUser stroke={1.5}/>
    },
    {
        name:"Patients", url:"/doctor/patients", icon:<IconMoodHeart stroke={1.5}/>
    },
    {
        name:"Appointments", url:"/doctor/appointments", icon:<IconCalendarCheck stroke={1.5}/>
    },
    {
        name:"Pharmacy", url:"/doctor/pharmacy", icon:<IconVaccine stroke={1.5}/>
    }
]

const SideBar = () => {
    const user = useSelector((state:any) => state.user);
    return (
        <div className="flex">
            <div className="w-64"></div>
        <div className="w-64 fixed flex flex-col gap-8 items-center h-screen overflow-y-auto hide-scrollbar" style={{backgroundColor: '#212529'}}>
            <div className="flex gap-1 items-center z-[500] py-3 fixed" style={{color: "#1fad9f", backgroundColor: '#212529'}}>
                <IconHeartbeat size='30' stroke={2.5}/>
                <span className="font-heading font-semibold text-2xl">Medix</span>
            </div>

            <div className="flex flex-col mt-20 gap-8 w-full px-4">
                <div className="flex items-center gap-1 flex-col">
                    <div className="p-1 bg-white rounded-full shadow-lg">
                        <Avatar src="/avatar.jpg" size={"xl"} alt="it's me" />
                    </div>
                    <span className="text-md font-medium text-neutral-100" >{user?.name}</span>
                    <Text c='dimmed' size="xs">{user?.role}</Text>
                </div>

                <div className="flex flex-col gap-2">
                    {
                        links.map((link) => {
                        return <NavLink to={link.url} key={link.url} style={({isActive}) => isActive ? {backgroundColor: '#1fad9f', color: 'black'} : {color: 'white'}} className="flex items-center gap-5 w-full font-medium px-4 py-5 my-0.5 rounded-lg hover:bg-gray-500 transition-colors duration-200 hover:-translate-y-1">
                            {link.icon}
                            <span>{link.name}</span>

                        </NavLink>
                        })
                    }
                </div>
            </div>
        </div>
        </div>
    )
}

export default SideBar;