"use strict";
exports.__esModule = true;
var image_1 = require("next/image");
var react_1 = require("react");
var MessagesUser = function (_a) {
    var image = _a.image, name = _a.name, latestMessage = _a.latestMessage;
    return (react_1["default"].createElement("div", { className: "flex items-center gap-2" },
        react_1["default"].createElement(image_1["default"], { className: "shadow-md rounded-full", alt: "someguy", src: image, width: 50, height: 50 }),
        react_1["default"].createElement("div", { className: "flex flex-col" },
            react_1["default"].createElement("span", { className: "font-semibold" }, name),
            react_1["default"].createElement("p", { className: "text-xs font-semibold text-slate-500" }, latestMessage))));
};
exports["default"] = MessagesUser;
