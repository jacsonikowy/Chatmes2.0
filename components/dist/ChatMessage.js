"use strict";
exports.__esModule = true;
var image_1 = require("next/image");
var react_1 = require("react");
var ChatMessage = function (_a) {
    var user = _a.user, variant = _a.variant, message = _a.message;
    if (variant === "primary") {
        return (react_1["default"].createElement("div", { className: "flex gap-4" },
            react_1["default"].createElement(image_1["default"], { width: 56, height: 56, src: user.imageUrl, alt: user.username || "image" }),
            react_1["default"].createElement("div", { className: "rounded-lg px-4 py-5 shadow-md border border-slate-300" },
                react_1["default"].createElement("span", { className: "text-black" }, message))));
    }
    return (react_1["default"].createElement("div", { className: "flex gap-4" },
        react_1["default"].createElement("div", { className: "rounded-lg px-4 py-5 shadow-md border-white bg-[#00b086]" },
            react_1["default"].createElement("span", { className: "text-white" }, message)),
        react_1["default"].createElement(image_1["default"], { width: 56, height: 56, src: user.imageUrl, alt: user.username || "image" })));
};
exports["default"] = ChatMessage;
