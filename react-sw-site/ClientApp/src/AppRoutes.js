import MapContainer from "./components/MapContainer";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import AutoAddressMap from "./components/InputData";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/map',
    element: <MapContainer />
  },
  {
      path: '/fetch-data',
      element: <FetchData />
  },
  {
      path: '/test',
      element: <AutoAddressMap />
  }
];

export default AppRoutes;
