"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var lucide_react_2 = require("lucide-react");
var lucide_react_3 = require("lucide-react");
var lucide_react_4 = require("lucide-react");
var lucide_react_5 = require("lucide-react");
var link_1 = require("next/link");
var nextjs_1 = require("@clerk/nextjs");
var lucide_react_6 = require("lucide-react");
var navigation_1 = require("next/navigation");
var Sidebar = function () {
    var user = nextjs_1.useUser().user;
    var pathname = navigation_1.usePathname();
    var _a = react_1.useState(true), activeSidebar = _a[0], setActiveSidebar = _a[1];
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { className: "hidden sm:flex flex-col max-w-[220px] z-40 h-screen border-r-2 border-slate-300" },
            react_1["default"].createElement("div", { className: "sm:flex gap-3 px-7 py-8 items-center hidden" },
                react_1["default"].createElement(lucide_react_2.MessageCircle, { size: 36, strokeWidth: 1.5 }),
                react_1["default"].createElement("span", { className: "font-semibold text-2xl text-[#00b086]" }, "ChatMes")),
            react_1["default"].createElement("div", { className: "h-0.5 w-full bg-slate-300" }),
            react_1["default"].createElement("div", { className: "flex flex-col justify-between h-full px-7 py-10" },
                react_1["default"].createElement("div", { className: "flex flex-col gap-6" },
                    react_1["default"].createElement("div", { className: "flex gap-3 items-center hover:text-[#00b086] " + (pathname === "/dashboard/messages"
                            ? "text-[#00b086]"
                            : "text-black") },
                        react_1["default"].createElement(lucide_react_3.MessagesSquare, null),
                        react_1["default"].createElement(link_1["default"], { href: "/dashboard/messages" }, "Messages")),
                    react_1["default"].createElement("div", { className: "flex gap-3 items-center hover:text-[#00b086] " + (pathname === "/dashboard/friends"
                            ? "text-[#00b086]"
                            : "text-black") },
                        react_1["default"].createElement(lucide_react_4.Users2, null),
                        react_1["default"].createElement(link_1["default"], { href: "/dashboard/friends" }, "Friends")),
                    react_1["default"].createElement("div", { className: "flex gap-3 items-center hover:text-[#00b086] " + (pathname === "/dashboard/settings"
                            ? "text-[#00b086]"
                            : "text-black") },
                        react_1["default"].createElement(lucide_react_5.Settings, null),
                        react_1["default"].createElement(link_1["default"], { href: "/dashboard/settings" }, "Settings"))),
                react_1["default"].createElement("div", { className: "flex gap-4 items-center" },
                    react_1["default"].createElement(nextjs_1.UserButton, { afterSignOutUrl: "/" }),
                    react_1["default"].createElement("p", null, user === null || user === void 0 ? void 0 : user.username)))),
        react_1["default"].createElement("div", { className: "block sm:hidden z-10" },
            react_1["default"].createElement("div", { className: "block sm:hidden absolute p-4 z-20 cursor-pointer " + (activeSidebar ? "hidden" : "block"), onClick: function () {
                    setActiveSidebar(!activeSidebar);
                } },
                react_1["default"].createElement(lucide_react_6.Menu, null)),
            react_1["default"].createElement("div", { className: "absolute z-10 top-4 text-center w-full" },
                react_1["default"].createElement("span", { className: "text-[#00b086]  font-semibold text-xl" }, "Chatmes")),
            pathname === "/dashboard/messages" ? (react_1["default"].createElement("div", { className: "absolute right-4 top-4" },
                react_1["default"].createElement(lucide_react_3.MessagesSquare, null))) : (react_1["default"].createElement(react_1["default"].Fragment, null)),
            react_1["default"].createElement("div", { className: "relative " + (activeSidebar ? "flex" : "hidden") + " flex flex-col justify-between h-full z-10 px-7 py-10 border-r-2 border-slate-300 bg-white" },
                react_1["default"].createElement("div", { className: "absolute top-3 right-3", onClick: function () {
                        setActiveSidebar(!activeSidebar);
                    } },
                    react_1["default"].createElement(lucide_react_1.X, null)),
                react_1["default"].createElement("div", { className: "flex flex-col gap-6 " },
                    react_1["default"].createElement("div", { className: "flex gap-3 items-center hover:text-[#00b086]" },
                        react_1["default"].createElement(lucide_react_3.MessagesSquare, null),
                        react_1["default"].createElement(link_1["default"], { href: "/dashboard/messages" }, "Messages")),
                    react_1["default"].createElement("div", { className: "flex gap-3 items-center hover:text-[#00b086]" },
                        react_1["default"].createElement(lucide_react_4.Users2, null),
                        react_1["default"].createElement(link_1["default"], { href: "/dashboard/friends" }, "Friends")),
                    react_1["default"].createElement("div", { className: "flex gap-3 items-center hover:text-[#00b086]" },
                        react_1["default"].createElement(lucide_react_5.Settings, null),
                        react_1["default"].createElement(link_1["default"], { href: "/dashboard/settings" }, "Settings"))),
                react_1["default"].createElement("div", { className: "flex gap-4 items-center" },
                    react_1["default"].createElement(nextjs_1.UserButton, { afterSignOutUrl: "/" }),
                    react_1["default"].createElement("p", null, user === null || user === void 0 ? void 0 : user.username))))));
};
exports["default"] = Sidebar;
