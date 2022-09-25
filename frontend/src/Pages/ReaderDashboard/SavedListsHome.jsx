import { Route,Routes } from 'react-router-dom';
import SavedList from './SavedListsPage';
import ReadingListView from './ReadingListView';
const SavedListsHome = ()=>{
    return(
        <Routes>
            <Route exact path="/" element={<SavedList  />} />
            <Route exact path="/reading-list" element={<ReadingListView />} />
        </Routes>
    )
}
export default SavedListsHome