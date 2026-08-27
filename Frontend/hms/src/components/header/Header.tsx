import React, { useEffect } from "react";
import ProfileMenu from "./ProfileMenu";
import { ActionIcon, Button } from "@mantine/core";
import {IconBellRinging, IconLayoutSidebarLeftCollapseFilled} from '@tabler/icons-react'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeJwt } from "../../slices/JwtSlice";
import { removeUser } from "../../slices/UserSlice";
import { jwtDecode } from "jwt-decode";

const Header = () => {
    const jwt = useSelector((state:any) => state.jwt);
    const user = useSelector((state:any) => state.user);
    const dispatch = useDispatch();
    
    const handleLogout = () => {
        console.log("Logging out...");
        dispatch(removeJwt());
        dispatch(removeUser());
    }
    return (
        <div className="bg-neutral-100 w-full h-16 flex justify-between px-5 items-center cursor-pointer shadow-md">
            <ActionIcon color="#1fad9f" variant="transparent" size={"lg"} aria-label="Settings" >
                <IconLayoutSidebarLeftCollapseFilled style={{ width:'70%', height:'70%'}} stroke={1.5} />
            </ActionIcon>
            <div className="flex gap-5 items-center">
                {jwt? <Button color="red" onClick={handleLogout}>logout</Button>:<Link to="login"><Button>login</Button></Link>}
                {jwt && <><ActionIcon color="#1fad9f" variant="transparent" size={"md"} aria-label="Settings" >
                    <IconBellRinging style={{ width:'90%', height:'90%'}} stroke={2} />
                </ActionIcon>
            <ProfileMenu /></>}
            </div>
        </div>
    );
}

export default Header;