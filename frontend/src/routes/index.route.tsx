import authRoutes from "./Auth.route";
import chatRoutes from "./Chat.route";
import dashboardRoutes from "./Dashboard.route";
import homeRoutes from "./Home.route";
import productRoutes from "./Product.route";
import userRoutes from "./UserProfile.route";


const allRoutes = [
  ...homeRoutes,
  ...authRoutes,
  ...productRoutes,
  ...chatRoutes,
  ...userRoutes,
  ...dashboardRoutes,
  
];

export default allRoutes;