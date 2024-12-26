import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Pagefirst from './Components/Pagefirst/Pagefirst';
import Studentform from './Components/Studentform/Studentform';
import StudentEventform from './Components/StudentEventform/StudentEventform';
import AddNewEventform from './Components/AddNewEventform/AddNewEventform';
import EventList from './Components/EventList/EventList';
import StudentEventList from './Components/StudentEventList/StudentEventList';
import YearLevel from './Components/YearLevel/BSITYearLevel';
import CoursesList from './Components/CoursesList/CoursesList';
import Login from './Components/Login/Login';
import LoginAdmin from './Components/Login/LoginAdmin';
import Adminpage from './Components/Adminpage/Adminpage';
import StudentProfile from './Components/StudentProfile/StudentProfile';
// 
import Firstyearlist from './Components/BSIT/Firstyearlist';
import BSITSecondyearlist from './Components/BSIT/BSITSecondyearlist';
import BSITThirdyearlist from './Components/BSIT/BSITThirdyearlist';
import BSITFourthyearlist from './Components/BSIT/BSITFourthyearlist';

import Updatefirstyear from './Components/BSITUpdate/Updatefirstyear';
import Updatesecondyear from './Components/BSITUpdate/Updatesecondyear';
import Updatethirdyear from './Components/BSITUpdate/Updatethirdyear';
import Updatefourtheyear from './Components/BSITUpdate/Updatefourtheyear';
// 
import BLISYearLevel from './Components/YearLevel/BLISYearLevel';
import FirstyrBLIS from './Components/BLIS/FirstyrBLIS';
import SecondYearBLIS from './Components/BLIS/SecondYearBLIS.js';
import ThirdYearBLIS from './Components/BLIS/ThirdYearBLIS.js';
import FourthYearBLIS from './Components/BLIS/FourthYearBLIS.js';

import UpdateFirstyearBLIS from './Components/BLISUpdate/UpdateFirstyearBLIS.js';
import UpdateSecondyearBLIS from './Components/BLISUpdate/UpdateSecondyearBLIS.js';
import Notification from './Components/Notification/Notification.js';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Pagefirst />} />
          {/* Log in student, Log in Admin */}
          <Route path="/login" element={<Login />} />
          <Route path="/loginAdmin" element={<LoginAdmin />} />

          {/* Admin landing page */}
          <Route path="/adminpage" element={<Adminpage />} />

          {/* BSIT year level. 1st, 2nd, 3rd, 4th */}
          <Route path="/yearlevel" element={<YearLevel />} />
          <Route path="/firstyearlist" element={<Firstyearlist />} />
          <Route path="/bsitsecondyearlist" element={<BSITSecondyearlist />} />
          <Route path="/bsitthirdyearlist" element={<BSITThirdyearlist />} />
          <Route path="/bsitfourthyearlist" element={<BSITFourthyearlist />} />

          <Route path="/firstyearlist/updatefrstyear/:id" element={<Updatefirstyear />} />
          <Route path="/bsitsecondyearlist/updatesecondyear/:id" element={<Updatesecondyear />} />
          <Route path="/bsitthirdyearlist/updatethirdyear/:id" element={<Updatethirdyear />} />
          <Route path="/bsitfourthyearlist/updatefourthyear/:id" element={<Updatefourtheyear />} />

          {/* BLIS year level. 1st, 2nd, 3rd, 4th */}
          <Route path="/BLISyearlevel" element={<BLISYearLevel />} />
          <Route path="/BLISfirstyearlist" element={<FirstyrBLIS />} />
          <Route path="/BLISsecondyearlist" element={<SecondYearBLIS />} />
          <Route path="/BLISthirdyearlist" element={<ThirdYearBLIS />} />
          <Route path="/BLISfourthyearlist" element={<FourthYearBLIS />} />

          <Route path="/BLISfirstyearlist/updatefirstyearblis/:id" element={<UpdateFirstyearBLIS />} />
          <Route path="/BLISsecondyearlist/updatesecondyearblis/:id" element={<UpdateSecondyearBLIS />} />
          


          <Route path="/studentform" element={<Studentform />} />     
         

          <Route path="/studenteventform" element={<StudentEventform />} />
          <Route path="/addeventform" element={<AddNewEventform />} />
          <Route path="/studenteventlist" element={<StudentEventList />} />
          <Route path="/studentprofile" element={<StudentProfile />} />
          <Route path="/courselist" element={<CoursesList />} />
          <Route path="/eventlist" element={<EventList />} />


        
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

///////////////////////////////////////////////////////////

          

          
          
          
          
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// }

// export default App;


