import AppLayout from "../components/layout/AppLayout";
import Home from "./Home"; // Import the original Home component

// Wrap Home with AppLayout
const HomeWithLayout = AppLayout(Home);

export default HomeWithLayout;
