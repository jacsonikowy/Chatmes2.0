"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var react_hook_form_1 = require("react-hook-form");
var Icons_1 = require("./Icons");
var FriendRequest = function (_a) {
    var email = _a.email;
    var _b = react_hook_form_1.useForm(), register = _b.register, handleSubmit = _b.handleSubmit, errors = _b.formState.errors;
    var handleAccept = function () { };
    var handleCancel = function () { };
    return (react_1["default"].createElement("form", null,
        react_1["default"].createElement("div", { className: "flex gap-5 items-center" },
            react_1["default"].createElement(lucide_react_1.UserPlus2, null),
            react_1["default"].createElement("span", null, email),
            react_1["default"].createElement("div", { className: "flex gap-2" },
                react_1["default"].createElement("div", { onClick: function () { } },
                    react_1["default"].createElement(Icons_1.Icons.accept, null)),
                react_1["default"].createElement("div", { onClick: function () { } },
                    react_1["default"].createElement(Icons_1.Icons.cancel, null))))));
};
exports["default"] = FriendRequest;
