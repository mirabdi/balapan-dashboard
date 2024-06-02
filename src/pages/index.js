export { default as Dashboard } from "./Dashboard";
export { default as Kanban } from "./Old/Kanban";
export { default as Editor } from "./Old/Editor";
export { default as Customers } from "./Old/Customers";
export { default as ColorPicker } from "./Old/ColorPicker";
export { default as Calendar } from "./Old/Calendar";
export { default as OrdersTemplate } from "./Old/OrdersTemplate";

export { default as Area } from "./Charts/Area.jsx";
export { default as Bar } from "./Charts/Bar";
export { default as ColorMapping } from "./Charts/ColorMapping";
export { default as Financial } from "./Charts/Financial";
export { default as Line } from "./Charts/Line";
export { default as Pie } from "./Charts/Pie";
export { default as Pyramid } from "./Charts/Pyramid";
export { default as Stacked } from "./Charts/Stacked";

// !Utils:
export { default as UnderConstruction } from "./UnderConstruction";
export { default as RootLayout } from "./Root";
export { default as ErrorPage } from "./Error";
export { default as AuthenticationPage } from "./Authentication";

// !Tests
export { default as TestRootLayout } from "./Test/TestRoot";
export { default as Test1Page } from "./Test/Test1";
export { default as Test2Page } from "./Test/Test2";
export { default as Test3Page } from "./Test/Test3";

// !Company 
export { default as CompanyRootLayout } from "./Company/CompanyRoot";

export { default as EmployeesRootLayout } from "./Company/Employees/EmployeesRoot";
export { default as Employees } from "./Company/Employees/Employees";
export { default as AddEmployee } from "./Company/Employees/AddEmployee";
export { default as ViewEmployee } from "./Company/Employees/ViewEmployee";
export { default as EditEmployee } from "./Company/Employees/EditEmployee";
export { employeesLoader,  employeeDetailLoader } from './Company/Employees/Services';

export { default as EmployeeGroupsRootLayout } from "./Company/EmployeeGroups/EmployeeGroupsRoot";
export { default as EmployeeGroups } from "./Company/EmployeeGroups/EmployeeGroups";
export { default as AddEmployeeGroup } from "./Company/EmployeeGroups/AddEmployeeGroup";
export { default as EditEmployeeGroup } from "./Company/EmployeeGroups/EditEmployeeGroup";
export { default as ViewEmployeeGroup } from "./Company/EmployeeGroups/ViewEmployeeGroup";
export { employeeGroupsLoader,  employeeGroupDetailLoader } from './Company/EmployeeGroups/Services';


// !Dashboard
export { default as DevRootLayout } from "./Dev/DevRoot";
export { default as SectionRootLayout } from "./Dev/sections/SectionRoot";
export { default as Sections } from "./Dev/sections/Sections";
export { default as AddSection } from "./Dev/sections/AddSection";
export { default as EditSection } from "./Dev/sections/EditSection";
export { default as ViewSection } from "./Dev/sections/ViewSection";

// !Products
export { default as ProductRootLayout } from './Products/ProductRoot';
export { default as Products } from './Products/Products';
export { default as Categories } from './Products/Categories';
export { default as ProductGroups } from './Products/ProductGroups/ProductGroups';
export { default as ProductGroupDetail } from './Products/ProductGroups/ProductGroupDetail';
export { default as EditProductGroup } from './Products/ProductGroups/EditProductGroup';
export { default as AddProductGroup } from './Products/ProductGroups/AddProductGroup';
export { default as ProductGroupReport } from './Products/ProductGroups/ProductGroupReport';

// !Parties
export { default as PartiesRootLayout } from './Parties/PartiesRoot';
// !Clients
export { default as Clients } from './Parties/Clients';
export { default as ClientGroups } from './Parties/ClientGroups/ClientGroups';
export { default as AddClientGroup } from './Parties/ClientGroups/AddClientGroup';
export { default as EditClientGroup } from './Parties/ClientGroups/EditClientGroup';
export { default as ClientGroupReport } from './Parties/ClientGroups/ClientGroupReport';
export { default as ClientGroupDetail } from './Parties/ClientGroups/ClientGroupDetail';
// !Suppliers
export { default as Suppliers } from './Parties/Suppliers';
export { default as SupplierGroups } from './Parties/SupplierGroups/SupplierGroups';
export { default as AddSupplierGroup } from './Parties/SupplierGroups/AddSupplierGroup';
export { default as EditSupplierGroup } from './Parties/SupplierGroups/EditSupplierGroup';
export { default as SupplierGroupReport } from './Parties/SupplierGroups/SupplierGroupReport';
export { default as SupplierGroupDetail } from './Parties/SupplierGroups/SupplierGroupDetail';


// !CRM
export { default as CRMStats } from './CRM/CRMStats';
export { default as CRMRootLayout } from './CRM/CRMRoot';
export { default as CrmMap } from "./CRM/CrmMap";

// !Orders
export { default as Orders } from "./CRM/Orders/Orders";
export { default as OrderDetail } from "./CRM/Orders/OrderDetail";
export { default as OrderRootLayout } from "./CRM/Orders/OrderRoot";
export { orderDetailLoader,  ordersLoader } from './CRM/Orders/Services';


// !Notifications
export { default as NotificationRootLayout } from "./CRM/Notifications/NotificationRoot";
export { default as Tags } from "./CRM/Notifications/Tags";
export { default as Notifications } from "./CRM/Notifications/Notifications";
export { default as AddNotification } from "./CRM/Notifications/AddNotification";
export { default as EditNotification } from "./CRM/Notifications/EditNotification";
export { default as NotificationDetail } from "./CRM/Notifications/NotificationDetail";
export { default as NotificationReport } from "./CRM/Notifications/NotificationReport";


// !App
export { default as AppRootLayout } from "./App/AppRoot";
export { default as QA } from "./App/QA";


// !Assortments
export { default as AssortmentsRootLayout } from "./App/assortments/AssortmentRoot";
export { default as Assortments } from "./App/assortments/Assortments";
export { default as AddAssortment } from "./App/assortments/AddAssortment";
export { default as ViewAssortment } from "./App/assortments/ViewAssortment";
export { default as EditAssortment } from "./App/assortments/EditAssortment";
export { assortmentsLoader,  assortmentDetailLoader } from './App/assortments/Services';

// !Banners
export {default as BannersRootLayout} from "./App/banners/BannersRoot";
export {default as Banners} from "./App/banners/Banners";
export {default as AddBanner} from "./App/banners/AddBanner";
export {default as ViewBanner} from "./App/banners/ViewBanner";
export {default as EditBanner} from "./App/banners/EditBanner";
export { bannersLoader,  bannerDetailLoader } from './App/banners/Services';

// !Brands
export {default as BrandsRootLayout} from "./App/brands/BrandsRoot";
export {default as Brands} from "./App/brands/Brands";
export {default as AddBrand} from "./App/brands/AddBrand";
export {default as ViewBrand} from "./App/brands/ViewBrand";
export {default as EditBrand} from "./App/brands/EditBrand";

// !Categories
export { default as ListingsRootLayout } from "./App/listings/ListingsRoot";
export { default as Listings } from "./App/listings/Listings";
export { default as AddListing } from "./App/listings/AddListing";
export { default as ViewListing } from "./App/listings/ViewListing";
export { default as EditListing } from "./App/listings/EditListing";
export { listingsLoader,  listingDetailLoader } from './App/listings/Services';

// !Categories
export { default as PostsRootLayout } from "./App/posts/PostsRoot";
export { default as Posts } from "./App/posts/Posts";
export { default as AddPost } from "./App/posts/AddPost";
export { default as ViewPost } from "./App/posts/ViewPost";
export { default as EditPost } from "./App/posts/EditPost";
export { postsLoader,  postDetailLoader } from './App/posts/Services';






// !POS
export { default as PosRootLayout } from "./Pos/PosRoot";
export { default as AddOPayment } from "./Pos/OPayments/AddOPayment";
export { default as EditOPayment } from "./Pos/OPayments/EditOPayment";
export { default as ViewOPayment } from "./Pos/OPayments/ViewOPayment";
export { default as OPayments } from "./Pos/OPayments/OPayments";
export { default as OPaymentRootLayout } from "./Pos/OPayments/OPaymentRoot";
export { opaymentDetailLoader,  opaymentsLoader } from './Pos/OPayments/Services';