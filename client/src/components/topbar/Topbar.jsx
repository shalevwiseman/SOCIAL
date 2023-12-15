import "./topbar.css";


export default function Topbar() {
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <span className="logo">Social</span>
        </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <input 
                    placeholder="Search for friend, post or video" 
                    className="searchInput"
                    />
            </div>
        </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Timeline</span>
            </div>
                 
        </div>
    </div>
    )
}

