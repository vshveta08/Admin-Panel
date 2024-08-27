import { SideBar } from './SideBar'
import { Outlet } from 'react-router-dom'

export default function AppLayout() {
  return (
    <div>
      <SideBar />
      <Outlet />
    </div>
  )
}
