import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


import {
    // General Pages
    Dashboard,
    UnderConstruction,
    ErrorPage,
    TestRootLayout, Test1Page, Test2Page, Test3Page,
    OrdersTemplate,
    RootLayout,
    AuthenticationPage,

    // Company pages
    CompanyRootLayout,
    EmployeesRootLayout,
    Employees, AddEmployee, ViewEmployee, EditEmployee, employeesLoader, employeeDetailLoader,
    EmployeeGroupsRootLayout,
    EmployeeGroups, AddEmployeeGroup, EditEmployeeGroup, ViewEmployeeGroup, employeeGroupsLoader, employeeGroupDetailLoader,

    // Product pages
    ProductRootLayout,
    Products,
    Categories,
    ProductGroups,
    ProductGroupDetail,
    EditProductGroup,
    AddProductGroup,
    ProductGroupReport,


    // Parties pages
    PartiesRootLayout,
    //Clients
    Clients,
    ClientGroups,
    ClientGroupDetail,
    AddClientGroup,
    EditClientGroup,
    ClientGroupReport,
    // Suppliers
    Suppliers,
    SupplierGroups,
    SupplierGroupDetail,
    AddSupplierGroup,
    EditSupplierGroup,
    SupplierGroupReport,


    // CRM pages
    CRMStats,
    CrmMap,
    CRMRootLayout,

    // App pages
    AppRootLayout, QA,
    AssortmentsRootLayout, Assortments, AddAssortment, ViewAssortment, EditAssortment, assortmentsLoader, assortmentDetailLoader,
    BannersRootLayout, Banners, AddBanner, ViewBanner, EditBanner, bannersLoader, bannerDetailLoader,
    BrandsRootLayout, Brands, AddBrand, ViewBrand, EditBrand,
    ListingsRootLayout, Listings, AddListing, ViewListing, EditListing, listingsLoader, listingDetailLoader,
    PostsRootLayout, Posts, AddPost, ViewPost, EditPost,  postsLoader,  postDetailLoader,


    // Orders
    OrderRootLayout,
    Orders,
    OrderDetail,
    ordersLoader, orderDetailLoader,
    // Notifications
    NotificationRootLayout,
    Tags,
    Notifications,
    AddNotification,
    EditNotification,
    NotificationDetail,
    NotificationReport,
    

    // POS pages
    PosRootLayout,
    OPaymentRootLayout,ViewOPayment, AddOPayment, EditOPayment, OPayments, opaymentDetailLoader, opaymentsLoader,



    // Other pages
    Customers,
    Kanban,
    ColorPicker,
    Editor,
    Calendar,
    Line,
    Area,
    Bar,
    Pie,
    Financial,
    Pyramid,
    Stacked,
    ColorMapping,
  } from './pages';




import "./App.css";
import { update } from "@syncfusion/ej2/inplace-editor";
import { useStateContext } from "./contexts/ContextProvider";



function App() {
    const { token } = useStateContext();
    const router = createBrowserRouter([
        {
            path: "/",
            element: <RootLayout/>,
            error: <ErrorPage/>,
            children: [
                // {index: true, element: <ErrorPage/>},
                {index: true, element: <UnderConstruction/>},
                {path: "company", element: <CompanyRootLayout/>, children:
                    [
                        {index: true, element: <UnderConstruction/>},
                        {path: "employees", element: <EmployeesRootLayout/>, children: [
                            {index: true, element: <Employees key="activeEmployees"/>, loader: () => employeesLoader(false, token)},
                            {path: "archived", element: <Employees key="archivedEmployees"/>, loader: () => employeesLoader(true, token)},
                            {path: "new", element: <AddEmployee/>},
                            {path: ":id", id: "employee-detail", loader: ({ params, request }) => employeeDetailLoader({ request, params, token }), children: [
                                {index: true, element: <ViewEmployee/>},
                                {path: "edit", element: <EditEmployee/>},
                            ]},
                        ]},
                        {path: "employee-groups", element: <EmployeeGroupsRootLayout/>, children: [
                            {index: true, element: <EmployeeGroups key="activeEmployeeGroups"/>, loader: () => employeeGroupsLoader(false, token)},
                            {path: "archived", element: <EmployeeGroups key="archivedEmployeeGroups"/>, loader: () => employeeGroupsLoader(true, token)},
                            {path: "new", element: <AddEmployeeGroup/>},
                            {path: ":id", id: "employee-group-detail", loader: ({ params, request }) => employeeGroupDetailLoader({ request, params, token }),children: [
                                {index: true, element: <ViewEmployeeGroup/>},
                                {path: "edit", element: <EditEmployeeGroup/>},
                            ]},
                        ]},
                        {path: ":id", element: <UnderConstruction />},
                    ]
                },
                {path: "products", element: <ProductRootLayout/>, children: [
                    {index: true, element: <Products/>},
                    {path: "categories", element: <Categories/>},
                    {path: "groups", children: [
                        {index: true, element: <ProductGroups/>},
                        {path: ":id", children: [
                            {index: true, element: <ProductGroupDetail/>},
                            {path: "edit", element: <EditProductGroup/>},
                            {path: "report", element: <ProductGroupReport/>},
                        ]},
                        {path: "new", element: <AddProductGroup/>},
                        
                    ]},
                
                ]},
                {path: "parties", element: <PartiesRootLayout/>, children: [
                    {path: "clients/", children: [
                        {index: true, element: <Clients/>},
                        {path: "groups", children: [
                            {index: true, element: <ClientGroups/>},
                            {path: "new", element: <AddClientGroup/>},
                            {path: ":id", children: [
                                {index: true, element: <ClientGroupDetail/>},
                                {path: "edit", element: <EditClientGroup/>},
                                {path: "report", element: <ClientGroupReport/>},
                            ]},
                        ]},
                    ]},
                    {path: "suppliers/",  children: [
                        {index: true, element: <Suppliers/>},
                        {path: "groups", children: [
                            {index: true, element: <SupplierGroups/>},
                            {path: "new", element: <AddSupplierGroup/>},
                            {path: ":id", children: [
                                {index: true, element: <SupplierGroupDetail/>},
                                {path: "edit", element: <EditSupplierGroup/>},
                                {path: "report", element: <SupplierGroupReport/>},
                            ]},
                        ]},
                    
                    ]},
                ]},
                {path: "crm", element: <CRMRootLayout/>, children: [
                    {index: true, element: <CRMStats/>},
                    {path: "map", element: <CrmMap/>},
                    {path: "orders", element: <OrderRootLayout/>, children: [
                        {index: true, element: <Orders status="all" key="all"/>, loader: () => ordersLoader("all", token)},
                        {   
                            path: "all", 
                            element: <Orders status="all" key="all"/>, 
                            loader: () => ordersLoader("all", token)
                        },
                        {
                            path: "cart", 
                            element: <Orders status="cart" key="cart"/>,
                            id: "cart-orders-list",
                            loader: () => ordersLoader("cart", token),
                        },
                        {
                            path: "ordered", 
                            element: <Orders status="ordered" key="ordered"/>,
                            id: "ordered-orders-list",
                            loader: () => ordersLoader("ordered", token),
                        },
                        {
                            path: "preparing", 
                            element: <Orders status="preparing" key="preparing"/>,
                            id: "preparing-orders-list",
                            loader: () => ordersLoader("preparing", token),
                        },
                        {
                            path: "ready", 
                            element: <Orders status="ready" key="ready"/>,
                            id: "ready-orders-list",
                            loader: () => ordersLoader("ready", token),
                        },
                        {
                            path: "delivering", 
                            element: <Orders status="delivering" key="delivering"/>,
                            id: "delivering-orders-list",
                            loader: () => ordersLoader("delivering", token),
                        },
                        {
                            path: "completed", 
                            element: <Orders status="completed" key="completed"/>,
                            id: "completed-orders-list",
                            loader: () => ordersLoader("completed", token),
                        },
                        {
                            path: "canceled", 
                            element: <Orders status="canceled" key="canceled"/>,
                            id: "canceled-orders-list",
                            loader: () => ordersLoader("canceled", token),
                        },                        
                        {path: ":id", element: <OrderDetail/>},
                    ]},
                    {path: "notifications", element: <NotificationRootLayout/>, children:[
                        {index: true, element: <Notifications/>},
                        {path: "new", element: <AddNotification/>},
                        {path: "tags", element: <Tags/>},
                        {path: ":id", children: [
                            {index: true, element: <NotificationDetail/>},
                            {path: "edit", element: <EditNotification/>},
                            {path: "report", element: <NotificationReport/>},
                        ]},
                    ]},
                ]},
                {path: "app", element: <AppRootLayout/>, 
                    children: [
                        {index: true, element: <UnderConstruction/>},
                        // Assortments
                        {
                            path: "assortments", 
                            element: <AssortmentsRootLayout/>, 
                            children: [
                                {   
                                    index: true, 
                                    id: 'active-assortments-list',
                                    element: <Assortments status="active"  key="activeAssortments"/>, 
                                    loader: () => assortmentsLoader("active", token)
                                },
                                {   
                                    path: "active",
                                    element: <Assortments status="active" key="activeAssortments"/>, 
                                    loader: () => assortmentsLoader("active", token)
                                },
                                {   
                                    path: "catalog",
                                    id: 'catalog-assortments-list',
                                    element: <Assortments status="catalog" key="catalogAssortments"/>, 
                                    loader: () => assortmentsLoader("catalog", token)
                                },
                                {   
                                    path: "archived",
                                    id: 'archived-assortments-list',
                                    element: <Assortments status="archived" key="archivedAssortments"/>, 
                                    loader: () => assortmentsLoader("archived", token)
                                },
                                {path: "new", element: <AddAssortment/>},
                                {
                                    path: ":id", 
                                    id: "assortment-detail",
                                    loader: ({ params, request }) => assortmentDetailLoader({ request, params, token }),
                                    children: [
                                        {index: true, element: <ViewAssortment/>},
                                        {path: "edit", element: <EditAssortment key={new Date().toISOString()}/>},
                                    ],
                                },
                            ],
                        },
                        // Listings
                        {
                            path: "listings",
                            element: <ListingsRootLayout/>,
                            children: [
                                {index: true, element: <Listings key="activeListings"/>, loader: () => listingsLoader(false, token)},
                                {path: "archived", element: <Listings archived={true} key="archivedListings"/>, loader: () => listingsLoader(true, token)},
                                {path: "new", element: <AddListing/>},
                                {
                                    path: ":id",
                                    id: "listing-detail",
                                    loader: ({ params, request }) => listingDetailLoader({ request, params, token }),
                                    children: [
                                        {index: true, element: <ViewListing/>},
                                        {path: "edit", element: <EditListing/>},
                                    ],
                                },
                            ],
                        },
                        // Posts
                        {
                            path: "posts",
                            element: <PostsRootLayout/>,
                            children: [
                                {index: true, element: <Posts  key="activePosts"/>, loader: () => postsLoader(false,token)},
                                {path: "archived", element: <Posts  key="archivedPosts"/>, loader: () => postsLoader(true,token)},
                                {path: "new", element: <AddPost/>},
                                {
                                    path: ":id",
                                    id: "post-detail",
                                    loader: ({ params, request }) => postDetailLoader({ request, params, token }),
                                    children: [
                                        {index: true, element: <ViewPost/>},
                                        {path: "delete", element: <ViewPost/>},
                                        {path: "edit", element: <EditPost/>},
                                    ],
                                },
                            ],
                        },
                        // Banners
                        {
                            path: "banners",
                            element: <BannersRootLayout/>,
                            children: [
                                {index: true, element: <Banners key="activeBanners"/>, loader: () => bannersLoader(false, token)},
                                {path: "archived", element: <Banners archived={true} key="archivedBanners"/>, loader: () => bannersLoader(true, token)},
                                {path: "new", element: <AddBanner/>},
                                {
                                    path: ":id",
                                    id: "banner-detail",
                                    loader: ({ params, request }) => bannerDetailLoader({ request, params, token }),
                                    children: [
                                        {index: true, element: <ViewBanner/>},
                                        {path: "edit", element: <EditBanner/>},
                                    ],
                                },
                            ],
                        },
                        // Brands
                        {
                            path: "brands",
                            element: <BrandsRootLayout/>,
                            children: [
                                {index: true, element: <Brands/>},
                                {path: "archived", element: <Brands archived={true}/>},
                                {path: "new", element: <AddBrand/>},
                                {
                                    path: ":id",
                                    children: [
                                        {index: true, element: <ViewBrand/>},
                                        {path: "edit", element: <EditBrand/>},
                                    ],
                                },
                            ],
                        },
                        {
                            path: "qas",
                            element: <QA/>
                        }
                        
                        // Add other app pages here
                    ],
                  },              
                {path: "pos", element: <PosRootLayout/>, children: [
                    {index: true, element: <UnderConstruction/>},
                    {path: "opay", element: <OPaymentRootLayout/>, children: [
                        {index: true, element: <OPayments key="activeOPayments"/>, loader: () => opaymentsLoader(false, token)},
                        {path: "active", element: <OPayments key="activeOPayments"/>, loader: () => opaymentsLoader(false, token)},
                        {path: "archived", element: <OPayments archived={true} key="archivedOPayments"/>, loader: () => opaymentsLoader(true, token)},
            
                        {path: "new", element: <AddOPayment/>},
                        {path: ":id", element: <ViewOPayment/>},
                    ]},
                ]},
                {path: "dashboard", element: <UnderConstruction/>},
                {path: "orders-template", element: <OrdersTemplate/>},
                {path: "customers", element: <Customers/>},
                {path: "test", element: <TestRootLayout/>, children: [
                    {path: "1", element: <Test1Page/>},
                    {path: "2", element: <Test2Page/>},
                    {path: "3", element: <Test3Page/>},
                ]},
    
                {path: "kanban", element: <Kanban/>},
                {path: "editor", element: <Editor/>},
                {path: "color-picker", element: <ColorPicker/>},
                {path: "calendar", element: <Calendar/>},
                
                {path: "line", element: <Line/>},
                {path: "area", element: <Area/>},
                {path: "bar", element: <Bar/>},
                {path: "pie", element: <Pie/>},
                {path: "financial", element: <Financial/>},
                {path: "color-mapping", element: <ColorMapping/>},
                {path: "pyramid", element: <Pyramid/>},
                {path: "stacked", element: <Stacked/>}
            ]
        }
    ])

    return (
        <RouterProvider router={router}/>
    );
}

export default App;
