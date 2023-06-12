import MapContainer from "./components/MapContainer";
import ServiceTag from "./components/AddServiceTag";
import { Home } from "./components/Home";
import AutoAddressMap from "./components/InputData";
import TestPage from "./components/TestPage";

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
    },
    {
        path: '/test2',
        element: <TestPage />
    }

];

export default AppRoutes;
