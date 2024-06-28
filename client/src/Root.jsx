
// & С моего Соло-проекта (если надо исключить НавБарс  пары страниц)
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./widgets/Navbar/Navbar";

export default function Root({ user, setUser }) {
  // const location = useLocation();
  const excludeNavBar =
    location.pathname === "/" ||
    location.pathname === "/signin" ||
    location.pathname === "/signup";

  return (
    <>
      {!excludeNavBar && <Navbar user={user} setUser={setUser} />}
      <div style={{ marginTop:  "100px", padding: "0",  width: "100%" }}>
        <Outlet />
      </div>
    </>
  );
}

// & С лекции (навбар всегда вверху)
// // import NavBar from './components/ui/NavBar'
// import { Outlet } from 'react-router-dom';
// import Navbar from './widgets/Navbar/Navbar';

// export default function Root({ user, setUser }) {
//   return (
//     <>
//       <Navbar user={user} setUser={setUser} />
//       <div style={{ marginTop: '70px' }}>
//         <Outlet />
//       </div>
//     </>
//   );
// }
