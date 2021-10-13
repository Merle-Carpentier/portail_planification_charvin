import Authorized from '../../Components/Authorized/Authorized.js'
import { useState, useEffect } from 'react'
import AdminWharehouse from '../../Components/page admin/AdminWharehouse/AdminWharehouse.js'
import './Admin.css'

export default function Admin() {


    return (
        <>
            <Authorized />

            <div className="admin">
            <AdminWharehouse />
            </div>

            <h1>Admin</h1>

        </>
    )
}

