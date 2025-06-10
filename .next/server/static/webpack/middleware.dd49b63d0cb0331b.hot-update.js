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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _clerk_nextjs_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @clerk/nextjs/server */ \"(middleware)/./node_modules/@clerk/nextjs/dist/esm/server/clerkMiddleware.js\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(middleware)/./node_modules/next/dist/esm/api/server.js\");\n\n\nconst openApiRoutes = [\n    \"/api/v1/anime\",\n    \"/api/v1/anime/\"\n];\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_clerk_nextjs_server__WEBPACK_IMPORTED_MODULE_1__.clerkMiddleware)((auth, req)=>{\n    const { pathname } = req.nextUrl;\n    if (pathname === \"/api/v1/anime\" || pathname.startsWith(\"/api/v1/anime/\")) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.next();\n    }\n    // Clerk protegerá el resto automáticamente\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.next();\n}));\nconst config = {\n    matcher: [\n        \"/((?!_next/static|_next/image|favicon.ico).*)\",\n        \"/(api|trpc)(.*)\"\n    ]\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vbWlkZGxld2FyZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUF1RDtBQUNaO0FBRzNDLE1BQU1FLGdCQUFnQjtJQUNwQjtJQUNBO0NBQ0Q7QUFFRCxpRUFBZUYscUVBQWVBLENBQUMsQ0FBQ0csTUFBTUM7SUFDcEMsTUFBTSxFQUFFQyxRQUFRLEVBQUUsR0FBR0QsSUFBSUUsT0FBTztJQUNoQyxJQUFJRCxhQUFhLG1CQUFtQkEsU0FBU0UsVUFBVSxDQUFDLG1CQUFtQjtRQUN6RSxPQUFPTixxREFBWUEsQ0FBQ08sSUFBSTtJQUMxQjtJQUNBLDJDQUEyQztJQUMzQyxPQUFPUCxxREFBWUEsQ0FBQ08sSUFBSTtBQUMxQixFQUFFLEVBQUM7QUFFSSxNQUFNQyxTQUFTO0lBQ3BCQyxTQUFTO1FBQ1A7UUFDQTtLQUNEO0FBQ0gsRUFBRSIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxST0RSSUdPXFxEZXNrdG9wXFxhbmltZS1hcGktbWFpblxcbWlkZGxld2FyZS50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY2xlcmtNaWRkbGV3YXJlIH0gZnJvbSBcIkBjbGVyay9uZXh0anMvc2VydmVyXCI7XG5pbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcbmltcG9ydCB0eXBlIHsgTmV4dFJlcXVlc3QgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcblxuY29uc3Qgb3BlbkFwaVJvdXRlcyA9IFtcbiAgXCIvYXBpL3YxL2FuaW1lXCIsXG4gIFwiL2FwaS92MS9hbmltZS9cIlxuXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xlcmtNaWRkbGV3YXJlKChhdXRoLCByZXE6IE5leHRSZXF1ZXN0KSA9PiB7XG4gIGNvbnN0IHsgcGF0aG5hbWUgfSA9IHJlcS5uZXh0VXJsO1xuICBpZiAocGF0aG5hbWUgPT09IFwiL2FwaS92MS9hbmltZVwiIHx8IHBhdGhuYW1lLnN0YXJ0c1dpdGgoXCIvYXBpL3YxL2FuaW1lL1wiKSkge1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UubmV4dCgpO1xuICB9XG4gIC8vIENsZXJrIHByb3RlZ2Vyw6EgZWwgcmVzdG8gYXV0b23DoXRpY2FtZW50ZVxuICByZXR1cm4gTmV4dFJlc3BvbnNlLm5leHQoKTtcbn0pO1xuXG5leHBvcnQgY29uc3QgY29uZmlnID0ge1xuICBtYXRjaGVyOiBbXG4gICAgXCIvKCg/IV9uZXh0L3N0YXRpY3xfbmV4dC9pbWFnZXxmYXZpY29uLmljbykuKilcIixcbiAgICBcIi8oYXBpfHRycGMpKC4qKVwiXG4gIF1cbn07Il0sIm5hbWVzIjpbImNsZXJrTWlkZGxld2FyZSIsIk5leHRSZXNwb25zZSIsIm9wZW5BcGlSb3V0ZXMiLCJhdXRoIiwicmVxIiwicGF0aG5hbWUiLCJuZXh0VXJsIiwic3RhcnRzV2l0aCIsIm5leHQiLCJjb25maWciLCJtYXRjaGVyIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(middleware)/./middleware.tsx\n");

/***/ })

});