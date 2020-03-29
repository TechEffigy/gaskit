import React, { useEffect, useState } from "react";

import Header from "./components/Header";
import Questions from "./components/Questions";
import Ask from "./components/Ask";

import UserLocation from "./context/UserLocation";

import "./App.css";

const getGeoLoc = cb => {
  navigator.geolocation.getCurrentPosition(
    res => {
      cb(res);
    },
    err => {
      console.log(err);
    }
  );
};

const App = () => {
  const [userLoc, setUserLoc] = useState([0, 0]);

  useEffect(() => {
    getGeoLoc(loc => setUserLoc([loc.coords.latitude, loc.coords.longitude]));
  }, []);

  return (
    <UserLocation.Provider value={userLoc}>
      <div className="cortex">
        <Header />
        <Ask />
        <main>
          <Questions />
        </main>
      </div>
    </UserLocation.Provider>
  );
};

export default App;

// import { fireDb } from "./services/firebase";
// import { GeoFire } from "geofire";
//  let geoRef = fireDb.ref("geofire");
//let geoFire = new GeoFire(geoRef);

// geoFire
//   .set("nuri sushi", [-33.92417276934845, 18.421965967411793])
//   .then(() => {
//     console.log("location added successfully");
//   })
//   .catch(err => console.log(err));

// geoFire.get("test").then(loc => {
//   console.log(loc);
// });

// getGeoLoc(loc => {
//   let geoQ = geoFire.query({
//     center: [loc.coords.latitude, loc.coords.longitude],
//     radius: 1
//   });

//   geoQ.on("key_entered", (key, loc, dist) => {
//     console.log(key, loc, dist);
//   });
// });
