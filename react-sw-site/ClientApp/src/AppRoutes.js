import MapContainer from "./components/MapContainer";
import ServiceTag from "./components/AddServiceTag";
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
      path: '/ServiceTags',
      element: <ServiceTag />
  },
  {
      path: '/test',
      element: <AutoAddressMap />
  }
];

export default AppRoutes;
