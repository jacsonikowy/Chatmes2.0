"use client";
"use strict";
exports.__esModule = true;
var image_1 = require("next/image");
var react_1 = require("react");
var nextjs_1 = require("@clerk/nextjs");
var lucide_react_1 = require("lucide-react");
// const Chat = ({ user }: { user: UserResource }) => {
var Chat = function () {
    var user1 = nextjs_1.useUser();
    var user = user1.user;
    if (!user) {
        return react_1["default"].createElement("div", null, "Loading...");
    }
    return (react_1["default"].createElement("div", { className: "w-full h-[calc(100vh-100px)]" },
        react_1["default"].createElement("div", { className: "flex py-[12.5px] pl-[25px] gap-6 items-center border-b-2 border-slate-300" },
            react_1["default"].createElement(image_1["default"], { className: "rounded-full", src: user.imageUrl, width: 75, height: 75, alt: user.imageUrl }),
            react_1["default"].createElement("span", null, user.username)),
        react_1["default"].createElement("div", { className: "flex h-full w-full" },
            react_1["default"].createElement("div", { className: "place-self-end flex items-center justify-center w-full px-6 pb-4 gap-4" },
                react_1["default"].createElement("textarea", { className: "border-2 border-slate-300 rounded-lg w-full", name: "", id: "", rows: 3 }),
                react_1["default"].createElement("div", { className: "w-14 h-14 rounded-full text-white bg-[#00b086] flex items-center px-[14px]" },
                    react_1["default"].createElement(lucide_react_1.Send, null))))));
};
exports["default"] = Chat;
