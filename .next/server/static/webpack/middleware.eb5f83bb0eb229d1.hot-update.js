"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("middleware",{

/***/ "(middleware)/./middleware.tsx":
/*!************************!*\
  !*** ./middleware.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _clerk_nextjs_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @clerk/nextjs/server */ \"(middleware)/./node_modules/@clerk/nextjs/dist/esm/server/clerkMiddleware.js\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(middleware)/./node_modules/next/dist/esm/api/server.js\");\n\n\nconst openApiRoutes = [\n    \"/api/v1/anime\",\n    \"/api/v1/anime/\"\n];\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_clerk_nextjs_server__WEBPACK_IMPORTED_MODULE_1__.clerkMiddleware)((auth, req)=>{\n    const { pathname } = req.nextUrl;\n    if (pathname === \"/api/v1/anime\" || pathname.startsWith(\"/api/v1/anime/\")) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.next();\n    }\n    return auth().protect();\n}));\nconst config = {\n    matcher: [\n        \"/((?!_next/static|_next/image|favicon.ico).*)\",\n        \"/(api|trpc)(.*)\"\n    ]\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vbWlkZGxld2FyZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUF1RDtBQUNaO0FBRzNDLE1BQU1FLGdCQUFnQjtJQUNwQjtJQUNBO0NBQ0Q7QUFFRCxpRUFBZUYscUVBQWVBLENBQUMsQ0FBQ0csTUFBTUM7SUFDcEMsTUFBTSxFQUFFQyxRQUFRLEVBQUUsR0FBR0QsSUFBSUUsT0FBTztJQUNoQyxJQUFJRCxhQUFhLG1CQUFtQkEsU0FBU0UsVUFBVSxDQUFDLG1CQUFtQjtRQUN6RSxPQUFPTixxREFBWUEsQ0FBQ08sSUFBSTtJQUMxQjtJQUNBLE9BQU9MLE9BQU9NLE9BQU87QUFDdkIsRUFBRSxFQUFDO0FBRUksTUFBTUMsU0FBUztJQUNwQkMsU0FBUztRQUNQO1FBQ0E7S0FDRDtBQUNILEVBQUUiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcUk9EUklHT1xcRGVza3RvcFxcYW5pbWUtYXBpLW1haW5cXG1pZGRsZXdhcmUudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNsZXJrTWlkZGxld2FyZSB9IGZyb20gXCJAY2xlcmsvbmV4dGpzL3NlcnZlclwiO1xuaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XG5pbXBvcnQgdHlwZSB7IE5leHRSZXF1ZXN0IH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XG5cbmNvbnN0IG9wZW5BcGlSb3V0ZXMgPSBbXG4gIFwiL2FwaS92MS9hbmltZVwiLFxuICBcIi9hcGkvdjEvYW5pbWUvXCJcbl07XG5cbmV4cG9ydCBkZWZhdWx0IGNsZXJrTWlkZGxld2FyZSgoYXV0aCwgcmVxOiBOZXh0UmVxdWVzdCkgPT4ge1xuICBjb25zdCB7IHBhdGhuYW1lIH0gPSByZXEubmV4dFVybDtcbiAgaWYgKHBhdGhuYW1lID09PSBcIi9hcGkvdjEvYW5pbWVcIiB8fCBwYXRobmFtZS5zdGFydHNXaXRoKFwiL2FwaS92MS9hbmltZS9cIikpIHtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLm5leHQoKTtcbiAgfVxuICByZXR1cm4gYXV0aCgpLnByb3RlY3QoKTtcbn0pO1xuXG5leHBvcnQgY29uc3QgY29uZmlnID0ge1xuICBtYXRjaGVyOiBbXG4gICAgXCIvKCg/IV9uZXh0L3N0YXRpY3xfbmV4dC9pbWFnZXxmYXZpY29uLmljbykuKilcIixcbiAgICBcIi8oYXBpfHRycGMpKC4qKVwiXG4gIF1cbn07Il0sIm5hbWVzIjpbImNsZXJrTWlkZGxld2FyZSIsIk5leHRSZXNwb25zZSIsIm9wZW5BcGlSb3V0ZXMiLCJhdXRoIiwicmVxIiwicGF0aG5hbWUiLCJuZXh0VXJsIiwic3RhcnRzV2l0aCIsIm5leHQiLCJwcm90ZWN0IiwiY29uZmlnIiwibWF0Y2hlciJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(middleware)/./middleware.tsx\n");

/***/ })

});