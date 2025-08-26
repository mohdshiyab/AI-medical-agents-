"use client"
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs';
import { UserDetalContext } from '@/context/UserDetailContext';

export type UserDetail={
    name:string,
    email:string,
    credits:number
}

function Provider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

const {user}=useUser();
const [userDetail,setUserDetail]= useState<any>();

    useEffect(() => {
        user && CreateNewUser();
    }, [user])


    const CreateNewUser = async () => {

        const result = await axios.post('/api/users');
        console.log(result.data);
        setUserDetail(result.data);
    }

    return (
        <div>
            <UserDetalContext.Provider value={{userDetail,setUserDetail}}>
            {children}
            </UserDetalContext.Provider>
            </div>
    )
}

export default Provider