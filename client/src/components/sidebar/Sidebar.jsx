import "./sidebar.css"
import { RssFeed } from "@mui/icons-material"



export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="siidebarwrapper">
        <ul className="sidebarList">
            <li className="sidebarListItem">
                <RssFeed className="sidebarIcon" />
                <span className="sidebarListItemText">Feed</span>
            </li>
        </ul>
      </div>
    </div>
  )
}
