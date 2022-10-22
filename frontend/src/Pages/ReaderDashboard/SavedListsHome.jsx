import { Route,Routes } from 'react-router-dom';
import SavedList from './SavedListsPage';
import ReadingListView from './ReadingListView';
import CustomListView from './CustomListView';
const SavedListsHome = ()=>{
    return(
        <>
        <Routes>
            <Route exact path="/" element={<SavedList  />} />
            <Route exact path="/reading-list" element={<ReadingListView />} />
            <Route exact path="/custom-list/:listId" element={<CustomListView />} />
        </Routes>
        </>
    )
}
export default SavedListsHome;