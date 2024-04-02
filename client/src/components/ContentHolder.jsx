import "../styles/ContentHolder.css";
import Sidebar from './Sidebar'
import Comp1 from './Comp1'
import Comp2 from './Comp2' 
import Comp3 from './Comp3'
import Comp4 from './Comp4'

function ContentHolder() {
    return (
        <div className="content-holder">
            <Sidebar />
            <div className="main-content">
                <Comp1 />
            </div>
        </div>
    );
}

export default ContentHolder;
