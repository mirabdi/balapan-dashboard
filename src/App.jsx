import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


import {
    // General Pages
    Dashboard,
    UnderConstruction,
    ErrorPage,
    TestPage,
    OrdersTemplate,
    RootLayout,

    // Company pages
    CompanyRootLayout,
    EmployeesRootLayout,
    Employees, AddEmployee, ViewEmployee, EditEmployee, employeesLoader, employeeDetailLoader,

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
    AppRootLayout,
    AssortmentsRootLayout, Assortments, AddAssortment, ViewAssortment, EditAssortment,
    BannersRootLayout, Banners, AddBanner, ViewBanner, EditBanner, bannersLoader, bannerDetailLoader,
    BrandsRootLayout, Brands, AddBrand, ViewBrand, EditBrand,
    ListingsRootLayout, Listings, AddListing, ViewListing, EditListing, listingsLoader, listingDetailLoader,
    PostsRootLayout, Posts, AddPost, ViewPost, EditPost,  postsLoader,  postDetailLoader,


    // Orders
    OrderRootLayout,
    Orders,
    OrderDetail,
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


const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout/>,
        error: <ErrorPage/>,
        children: [
            // {index: true, element: <Dashboard/>},
            // {index: true, element: <UnderConstruction/>},
            {path: "company", element: <CompanyRootLayout/>, children:
                [
                    {index: true, element: <UnderConstruction/>},
                    {path: "employees", element: <EmployeesRootLayout/>, children: [
                        {index: true, element: <Employees key="activeEmployees"/>, loader: () => employeesLoader(false)},
                        {path: "archived", element: <Employees key="archivedEmployees"/>, loader: () => employeesLoader(true)},
                        {path: "new", element: <AddEmployee/>},
                        {path: ":id", id: "employee-detail", loader: employeeDetailLoader, children: [
                            {index: true, element: <ViewEmployee/>},
                            {path: "edit", element: <EditEmployee/>},
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
                    {index: true, element: <Orders status="ordered" key="ordered"/>},
                    {path: "cart", element: <Orders status="cart" key="cart"/>},
                    {path: "ordered", element: <Orders status="ordered" key="ordered"/>},
                    {path: "preparing", element: <Orders status="preparing" key="preparing"/>},
                    {path: "ready", element: <Orders status="ready" key="ready"/>},
                    {path: "delivering", element: <Orders status="delivering" key="delivering"/>},
                    {path: "completed", element: <Orders status="completed" key="completed"/>},
                    {path: "canceled", element: <Orders status="canceled" key="canceled"/>},
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
            {
                path: "app", 
                element: <AppRootLayout/>, 
                children: [
                    {index: true, element: <UnderConstruction/>},
                    {
                        path: "assortments", 
                        element: <AssortmentsRootLayout/>, 
                        children: [
                            {index: true, element: <Assortments/>},
                            {path: "archived", element: <Assortments archived={true}/>},
                            {path: "new", element: <AddAssortment/>},
                            {
                                path: ":id", 
                                children: [
                                    {index: true, element: <ViewAssortment/>},
                                    {path: "edit", element: <EditAssortment/>},
                                ],
                            },
                        ],
                    },
                    // Banners
                    {
                        path: "banners",
                        element: <BannersRootLayout/>,
                        children: [
                            {index: true, element: <Banners key="activeBanners"/>, loader: () => bannersLoader(false)},
                            {path: "archived", element: <Banners archived={true} key="archivedBanners"/>, loader: () => bannersLoader(true)},
                            {path: "new", element: <AddBanner/>},
                            {
                                path: ":id",
                                id: "banner-detail",
                                loader: bannerDetailLoader,
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
                    // Listings
                    {
                        path: "listings",
                        element: <ListingsRootLayout/>,
                        children: [
                            {index: true, element: <Listings key="activeListings"/>, loader: () => listingsLoader(false)},
                            {path: "archived", element: <Listings archived={true} key="archivedListings"/>, loader: () => listingsLoader(true)},
                            {path: "new", element: <AddListing/>},
                            {
                                path: ":id",
                                id: "listing-detail",
                                loader: listingDetailLoader,
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
                            {index: true, element: <Posts  key="activePosts"/>, loader: () => postsLoader(false)},
                            {path: "archived", element: <Posts  key="archivedPosts"/>, loader: () => postsLoader(true)},
                            {path: "new", element: <AddPost/>},
                            {
                                path: ":id",
                                id: "post-detail",
                                loader: postDetailLoader,
                                children: [
                                    {index: true, element: <ViewPost/>},
                                    {path: "delete", element: <ViewPost/>},
                                    {path: "edit", element: <EditPost/>},
                                ],
                            },
                        ],
                    },
                    // Add other app pages here
                ],
              },              
            {path: "pos", element: <PosRootLayout/>, children: [
                {index: true, element: <UnderConstruction/>},
                {path: "payment", element: <UnderConstruction/>},
            ]},
            {path: "dashboard", element: <UnderConstruction/>},
            {path: "orders", element: <OrdersTemplate/>},
            {path: "customers", element: <Customers/>},
            {path: "test", element: <TestPage/>},

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

function App() {
    return (
        <RouterProvider router={router}/>
    );
}

export default App;
