/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/keys/route";
exports.ids = ["app/api/keys/route"];
exports.modules = {

/***/ "(rsc)/./app/api/keys/route.ts":
/*!*******************************!*\
  !*** ./app/api/keys/route.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DELETE: () => (/* binding */ DELETE),\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _configs_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/configs/db */ \"(rsc)/./configs/db.tsx\");\n/* harmony import */ var _configs_schema__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/configs/schema */ \"(rsc)/./configs/schema.ts\");\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! crypto */ \"crypto\");\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var drizzle_orm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! drizzle-orm */ \"(rsc)/./node_modules/drizzle-orm/sql/expressions/conditions.js\");\n\n\n\n\n\n// Generate a secure API key\nfunction generateApiKey() {\n    return `sk-${(0,crypto__WEBPACK_IMPORTED_MODULE_3__.randomBytes)(24).toString('hex')}`;\n}\n// Create new API key\nasync function POST(req) {\n    try {\n        const { name } = await req.json();\n        // Simulated userId, in production get the userId from the auth system\n        const userId = 1;\n        const key = generateApiKey();\n        const apiKey = await _configs_db__WEBPACK_IMPORTED_MODULE_1__.db.insert(_configs_schema__WEBPACK_IMPORTED_MODULE_2__.apiKeysTable).values({\n            userId,\n            name,\n            key,\n            createdAt: new Date(),\n            isActive: true\n        }).returning();\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            key: apiKey[0]\n        });\n    } catch (error) {\n        console.error('Error creating API key:', error);\n        return new next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse('Internal Server Error', {\n            status: 500\n        });\n    }\n}\n// Get all API keys for the user\nasync function GET() {\n    try {\n        // Simulated userId, in production get the userId from the auth system\n        const userId = 1;\n        const keys = await _configs_db__WEBPACK_IMPORTED_MODULE_1__.db.select().from(_configs_schema__WEBPACK_IMPORTED_MODULE_2__.apiKeysTable).where((0,drizzle_orm__WEBPACK_IMPORTED_MODULE_4__.eq)(_configs_schema__WEBPACK_IMPORTED_MODULE_2__.apiKeysTable.userId, userId));\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            keys\n        });\n    } catch (error) {\n        console.error('Error fetching API keys:', error);\n        return new next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse('Internal Server Error', {\n            status: 500\n        });\n    }\n}\n// Delete an API key\nasync function DELETE(req) {\n    try {\n        const { id } = await req.json();\n        // Simulated userId, in production get the userId from the auth system\n        const userId = 1;\n        await _configs_db__WEBPACK_IMPORTED_MODULE_1__.db.delete(_configs_schema__WEBPACK_IMPORTED_MODULE_2__.apiKeysTable).where((0,drizzle_orm__WEBPACK_IMPORTED_MODULE_4__.and)((0,drizzle_orm__WEBPACK_IMPORTED_MODULE_4__.eq)(_configs_schema__WEBPACK_IMPORTED_MODULE_2__.apiKeysTable.id, id), (0,drizzle_orm__WEBPACK_IMPORTED_MODULE_4__.eq)(_configs_schema__WEBPACK_IMPORTED_MODULE_2__.apiKeysTable.userId, userId)));\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true\n        });\n    } catch (error) {\n        console.error('Error deleting API key:', error);\n        return new next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse('Internal Server Error', {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2tleXMvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQTJDO0FBQ1Q7QUFDYztBQUNYO0FBQ0M7QUFFdEMsNEJBQTRCO0FBQzVCLFNBQVNNO0lBQ1AsT0FBTyxDQUFDLEdBQUcsRUFBRUgsbURBQVdBLENBQUMsSUFBSUksUUFBUSxDQUFDLFFBQVE7QUFDaEQ7QUFFQSxxQkFBcUI7QUFDZCxlQUFlQyxLQUFLQyxHQUFZO0lBQ3JDLElBQUk7UUFDRixNQUFNLEVBQUVDLElBQUksRUFBRSxHQUFHLE1BQU1ELElBQUlFLElBQUk7UUFDL0Isc0VBQXNFO1FBQ3RFLE1BQU1DLFNBQVM7UUFDZixNQUFNQyxNQUFNUDtRQUNaLE1BQU1RLFNBQVMsTUFBTWIsMkNBQUVBLENBQUNjLE1BQU0sQ0FBQ2IseURBQVlBLEVBQUVjLE1BQU0sQ0FBQztZQUNsREo7WUFDQUY7WUFDQUc7WUFDQUksV0FBVyxJQUFJQztZQUNmQyxVQUFVO1FBQ1osR0FBR0MsU0FBUztRQUNaLE9BQU9wQixxREFBWUEsQ0FBQ1csSUFBSSxDQUFDO1lBQUVVLFNBQVM7WUFBTVIsS0FBS0MsTUFBTSxDQUFDLEVBQUU7UUFBQztJQUMzRCxFQUFFLE9BQU9RLE9BQU87UUFDZEMsUUFBUUQsS0FBSyxDQUFDLDJCQUEyQkE7UUFDekMsT0FBTyxJQUFJdEIscURBQVlBLENBQUMseUJBQXlCO1lBQUV3QixRQUFRO1FBQUk7SUFDakU7QUFDRjtBQUVBLGdDQUFnQztBQUN6QixlQUFlQztJQUNwQixJQUFJO1FBQ0Ysc0VBQXNFO1FBQ3RFLE1BQU1iLFNBQVM7UUFDZixNQUFNYyxPQUFPLE1BQU16QiwyQ0FBRUEsQ0FBQzBCLE1BQU0sR0FBR0MsSUFBSSxDQUFDMUIseURBQVlBLEVBQUUyQixLQUFLLENBQUN6QiwrQ0FBRUEsQ0FBQ0YseURBQVlBLENBQUNVLE1BQU0sRUFBRUE7UUFDaEYsT0FBT1oscURBQVlBLENBQUNXLElBQUksQ0FBQztZQUFFZTtRQUFLO0lBQ2xDLEVBQUUsT0FBT0osT0FBTztRQUNkQyxRQUFRRCxLQUFLLENBQUMsNEJBQTRCQTtRQUMxQyxPQUFPLElBQUl0QixxREFBWUEsQ0FBQyx5QkFBeUI7WUFBRXdCLFFBQVE7UUFBSTtJQUNqRTtBQUNGO0FBRUEsb0JBQW9CO0FBQ2IsZUFBZU0sT0FBT3JCLEdBQVk7SUFDdkMsSUFBSTtRQUNGLE1BQU0sRUFBRXNCLEVBQUUsRUFBRSxHQUFHLE1BQU10QixJQUFJRSxJQUFJO1FBQzdCLHNFQUFzRTtRQUN0RSxNQUFNQyxTQUFTO1FBQ2YsTUFBTVgsMkNBQUVBLENBQUMrQixNQUFNLENBQUM5Qix5REFBWUEsRUFBRTJCLEtBQUssQ0FBQ3hCLGdEQUFHQSxDQUFDRCwrQ0FBRUEsQ0FBQ0YseURBQVlBLENBQUM2QixFQUFFLEVBQUVBLEtBQUszQiwrQ0FBRUEsQ0FBQ0YseURBQVlBLENBQUNVLE1BQU0sRUFBRUE7UUFDekYsT0FBT1oscURBQVlBLENBQUNXLElBQUksQ0FBQztZQUFFVSxTQUFTO1FBQUs7SUFDM0MsRUFBRSxPQUFPQyxPQUFPO1FBQ2RDLFFBQVFELEtBQUssQ0FBQywyQkFBMkJBO1FBQ3pDLE9BQU8sSUFBSXRCLHFEQUFZQSxDQUFDLHlCQUF5QjtZQUFFd0IsUUFBUTtRQUFJO0lBQ2pFO0FBQ0YiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcUk9EUklHT1xcRGVza3RvcFxcYW5pbWUtYXBpLW1haW5cXGFwcFxcYXBpXFxrZXlzXFxyb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XHJcbmltcG9ydCB7IGRiIH0gZnJvbSAnQC9jb25maWdzL2RiJztcclxuaW1wb3J0IHsgYXBpS2V5c1RhYmxlIH0gZnJvbSAnQC9jb25maWdzL3NjaGVtYSc7XHJcbmltcG9ydCB7IHJhbmRvbUJ5dGVzIH0gZnJvbSAnY3J5cHRvJztcclxuaW1wb3J0IHsgZXEsIGFuZCB9IGZyb20gJ2RyaXp6bGUtb3JtJztcclxuXHJcbi8vIEdlbmVyYXRlIGEgc2VjdXJlIEFQSSBrZXlcclxuZnVuY3Rpb24gZ2VuZXJhdGVBcGlLZXkoKSB7XHJcbiAgcmV0dXJuIGBzay0ke3JhbmRvbUJ5dGVzKDI0KS50b1N0cmluZygnaGV4Jyl9YDtcclxufVxyXG5cclxuLy8gQ3JlYXRlIG5ldyBBUEkga2V5XHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcTogUmVxdWVzdCkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB7IG5hbWUgfSA9IGF3YWl0IHJlcS5qc29uKCk7XHJcbiAgICAvLyBTaW11bGF0ZWQgdXNlcklkLCBpbiBwcm9kdWN0aW9uIGdldCB0aGUgdXNlcklkIGZyb20gdGhlIGF1dGggc3lzdGVtXHJcbiAgICBjb25zdCB1c2VySWQgPSAxO1xyXG4gICAgY29uc3Qga2V5ID0gZ2VuZXJhdGVBcGlLZXkoKTtcclxuICAgIGNvbnN0IGFwaUtleSA9IGF3YWl0IGRiLmluc2VydChhcGlLZXlzVGFibGUpLnZhbHVlcyh7XHJcbiAgICAgIHVzZXJJZCxcclxuICAgICAgbmFtZSxcclxuICAgICAga2V5LFxyXG4gICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKCksXHJcbiAgICAgIGlzQWN0aXZlOiB0cnVlXHJcbiAgICB9KS5yZXR1cm5pbmcoKTtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGtleTogYXBpS2V5WzBdIH0pO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBjcmVhdGluZyBBUEkga2V5OicsIGVycm9yKTtcclxuICAgIHJldHVybiBuZXcgTmV4dFJlc3BvbnNlKCdJbnRlcm5hbCBTZXJ2ZXIgRXJyb3InLCB7IHN0YXR1czogNTAwIH0pO1xyXG4gIH1cclxufVxyXG5cclxuLy8gR2V0IGFsbCBBUEkga2V5cyBmb3IgdGhlIHVzZXJcclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVCgpIHtcclxuICB0cnkge1xyXG4gICAgLy8gU2ltdWxhdGVkIHVzZXJJZCwgaW4gcHJvZHVjdGlvbiBnZXQgdGhlIHVzZXJJZCBmcm9tIHRoZSBhdXRoIHN5c3RlbVxyXG4gICAgY29uc3QgdXNlcklkID0gMTtcclxuICAgIGNvbnN0IGtleXMgPSBhd2FpdCBkYi5zZWxlY3QoKS5mcm9tKGFwaUtleXNUYWJsZSkud2hlcmUoZXEoYXBpS2V5c1RhYmxlLnVzZXJJZCwgdXNlcklkKSk7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBrZXlzIH0pO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBBUEkga2V5czonLCBlcnJvcik7XHJcbiAgICByZXR1cm4gbmV3IE5leHRSZXNwb25zZSgnSW50ZXJuYWwgU2VydmVyIEVycm9yJywgeyBzdGF0dXM6IDUwMCB9KTtcclxuICB9XHJcbn1cclxuXHJcbi8vIERlbGV0ZSBhbiBBUEkga2V5XHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBERUxFVEUocmVxOiBSZXF1ZXN0KSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHsgaWQgfSA9IGF3YWl0IHJlcS5qc29uKCk7XHJcbiAgICAvLyBTaW11bGF0ZWQgdXNlcklkLCBpbiBwcm9kdWN0aW9uIGdldCB0aGUgdXNlcklkIGZyb20gdGhlIGF1dGggc3lzdGVtXHJcbiAgICBjb25zdCB1c2VySWQgPSAxO1xyXG4gICAgYXdhaXQgZGIuZGVsZXRlKGFwaUtleXNUYWJsZSkud2hlcmUoYW5kKGVxKGFwaUtleXNUYWJsZS5pZCwgaWQpLCBlcShhcGlLZXlzVGFibGUudXNlcklkLCB1c2VySWQpKSk7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBzdWNjZXNzOiB0cnVlIH0pO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBkZWxldGluZyBBUEkga2V5OicsIGVycm9yKTtcclxuICAgIHJldHVybiBuZXcgTmV4dFJlc3BvbnNlKCdJbnRlcm5hbCBTZXJ2ZXIgRXJyb3InLCB7IHN0YXR1czogNTAwIH0pO1xyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiZGIiLCJhcGlLZXlzVGFibGUiLCJyYW5kb21CeXRlcyIsImVxIiwiYW5kIiwiZ2VuZXJhdGVBcGlLZXkiLCJ0b1N0cmluZyIsIlBPU1QiLCJyZXEiLCJuYW1lIiwianNvbiIsInVzZXJJZCIsImtleSIsImFwaUtleSIsImluc2VydCIsInZhbHVlcyIsImNyZWF0ZWRBdCIsIkRhdGUiLCJpc0FjdGl2ZSIsInJldHVybmluZyIsInN1Y2Nlc3MiLCJlcnJvciIsImNvbnNvbGUiLCJzdGF0dXMiLCJHRVQiLCJrZXlzIiwic2VsZWN0IiwiZnJvbSIsIndoZXJlIiwiREVMRVRFIiwiaWQiLCJkZWxldGUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/keys/route.ts\n");

/***/ }),

/***/ "(rsc)/./configs/db.tsx":
/*!************************!*\
  !*** ./configs/db.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   db: () => (/* binding */ db)\n/* harmony export */ });\n/* harmony import */ var drizzle_orm_neon_serverless__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! drizzle-orm/neon-serverless */ \"(rsc)/./node_modules/drizzle-orm/neon-serverless/driver.js\");\n/* harmony import */ var _neondatabase_serverless__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @neondatabase/serverless */ \"(rsc)/./node_modules/@neondatabase/serverless/index.mjs\");\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dotenv */ \"(rsc)/./node_modules/dotenv/lib/main.js\");\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n// Load environment variables\ndotenv__WEBPACK_IMPORTED_MODULE_1__.config();\nconst connectionString = \"postgresql://Animeapi_owner:npg_ybLRT27GuwPV@ep-summer-glade-a8ixf8q4-pooler.eastus2.azure.neon.tech/Animeapi?sslmode=require\";\nif (!connectionString) {\n    throw new Error('Database connection string not found in environment variables');\n}\nconst pool = new _neondatabase_serverless__WEBPACK_IMPORTED_MODULE_0__.Pool({\n    connectionString\n});\nconst db = (0,drizzle_orm_neon_serverless__WEBPACK_IMPORTED_MODULE_2__.drizzle)(pool);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9jb25maWdzL2RiLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFzRDtBQUNOO0FBQ2Y7QUFFakMsNkJBQTZCO0FBQzdCRSwwQ0FBYTtBQUViLE1BQU1FLG1CQUFtQkMsK0hBQWlEO0FBQzFFLElBQUksQ0FBQ0Qsa0JBQWtCO0lBQ25CLE1BQU0sSUFBSUksTUFBTTtBQUNwQjtBQUVBLE1BQU1DLE9BQU8sSUFBSVIsMERBQUlBLENBQUM7SUFBRUc7QUFBaUI7QUFDbEMsTUFBTU0sS0FBS1Ysb0VBQU9BLENBQUNTLE1BQU0iLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcUk9EUklHT1xcRGVza3RvcFxcYW5pbWUtYXBpLW1haW5cXGNvbmZpZ3NcXGRiLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkcml6emxlIH0gZnJvbSAnZHJpenpsZS1vcm0vbmVvbi1zZXJ2ZXJsZXNzJztcclxuaW1wb3J0IHsgUG9vbCB9IGZyb20gJ0BuZW9uZGF0YWJhc2Uvc2VydmVybGVzcyc7XHJcbmltcG9ydCAqIGFzIGRvdGVudiBmcm9tICdkb3RlbnYnO1xyXG5cclxuLy8gTG9hZCBlbnZpcm9ubWVudCB2YXJpYWJsZXNcclxuZG90ZW52LmNvbmZpZygpO1xyXG5cclxuY29uc3QgY29ubmVjdGlvblN0cmluZyA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX05FT05fREJfQ09OTkVDVElPTl9TVFJJTkc7XHJcbmlmICghY29ubmVjdGlvblN0cmluZykge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdEYXRhYmFzZSBjb25uZWN0aW9uIHN0cmluZyBub3QgZm91bmQgaW4gZW52aXJvbm1lbnQgdmFyaWFibGVzJyk7XHJcbn1cclxuXHJcbmNvbnN0IHBvb2wgPSBuZXcgUG9vbCh7IGNvbm5lY3Rpb25TdHJpbmcgfSk7XHJcbmV4cG9ydCBjb25zdCBkYiA9IGRyaXp6bGUocG9vbCk7Il0sIm5hbWVzIjpbImRyaXp6bGUiLCJQb29sIiwiZG90ZW52IiwiY29uZmlnIiwiY29ubmVjdGlvblN0cmluZyIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19ORU9OX0RCX0NPTk5FQ1RJT05fU1RSSU5HIiwiRXJyb3IiLCJwb29sIiwiZGIiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./configs/db.tsx\n");

/***/ }),

/***/ "(rsc)/./configs/schema.ts":
/*!***************************!*\
  !*** ./configs/schema.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   animesTable: () => (/* binding */ animesTable),\n/* harmony export */   apiKeysTable: () => (/* binding */ apiKeysTable),\n/* harmony export */   usersTable: () => (/* binding */ usersTable)\n/* harmony export */ });\n/* harmony import */ var drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! drizzle-orm/pg-core */ \"(rsc)/./node_modules/drizzle-orm/pg-core/table.js\");\n/* harmony import */ var drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! drizzle-orm/pg-core */ \"(rsc)/./node_modules/drizzle-orm/pg-core/columns/integer.js\");\n/* harmony import */ var drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! drizzle-orm/pg-core */ \"(rsc)/./node_modules/drizzle-orm/pg-core/columns/varchar.js\");\n/* harmony import */ var drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! drizzle-orm/pg-core */ \"(rsc)/./node_modules/drizzle-orm/pg-core/columns/timestamp.js\");\n/* harmony import */ var drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! drizzle-orm/pg-core */ \"(rsc)/./node_modules/drizzle-orm/pg-core/columns/boolean.js\");\n/* harmony import */ var drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! drizzle-orm/pg-core */ \"(rsc)/./node_modules/drizzle-orm/pg-core/columns/text.js\");\n\nconst usersTable = (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_0__.pgTable)(\"users\", {\n    id: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_1__.integer)().primaryKey().generatedAlwaysAsIdentity(),\n    name: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.varchar)({\n        length: 255\n    }).notNull(),\n    email: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.varchar)({\n        length: 255\n    }).notNull().unique()\n});\nconst apiKeysTable = (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_0__.pgTable)(\"api_keys\", {\n    id: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_1__.integer)().primaryKey().generatedAlwaysAsIdentity(),\n    userId: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_1__.integer)().references(()=>usersTable.id).notNull(),\n    name: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.varchar)({\n        length: 255\n    }).notNull(),\n    key: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.varchar)({\n        length: 255\n    }).notNull().unique(),\n    lastUsed: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_3__.timestamp)(\"timestamptz\"),\n    createdAt: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_3__.timestamp)(\"timestamptz\").defaultNow().notNull(),\n    isActive: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_4__.boolean)().default(true).notNull()\n});\nconst animesTable = (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_0__.pgTable)(\"animes\", {\n    id: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_1__.integer)().primaryKey().generatedAlwaysAsIdentity(),\n    title: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.varchar)({\n        length: 255\n    }).notNull(),\n    type: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.varchar)({\n        length: 50\n    }),\n    episodes: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_1__.integer)(),\n    status: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.varchar)({\n        length: 50\n    }),\n    animeSeason: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.varchar)({\n        length: 50\n    }),\n    picture: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_5__.text)(),\n    thumbnail: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_5__.text)(),\n    sources: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_5__.text)().array(),\n    synonyms: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_5__.text)().array(),\n    relations: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_5__.text)().array(),\n    tags: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_5__.text)().array()\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9jb25maWdzL3NjaGVtYS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBMEY7QUFFbkYsTUFBTU0sYUFBYUwsNERBQU9BLENBQUMsU0FBUztJQUN2Q00sSUFBSVAsNERBQU9BLEdBQUdRLFVBQVUsR0FBR0MseUJBQXlCO0lBQ3BEQyxNQUFNUiw0REFBT0EsQ0FBQztRQUFFUyxRQUFRO0lBQUksR0FBR0MsT0FBTztJQUN0Q0MsT0FBT1gsNERBQU9BLENBQUM7UUFBRVMsUUFBUTtJQUFJLEdBQUdDLE9BQU8sR0FBR0UsTUFBTTtBQUNwRCxHQUFHO0FBRUksTUFBTUMsZUFBZWQsNERBQU9BLENBQUMsWUFBWTtJQUM1Q00sSUFBSVAsNERBQU9BLEdBQUdRLFVBQVUsR0FBR0MseUJBQXlCO0lBQ3BETyxRQUFRaEIsNERBQU9BLEdBQUdpQixVQUFVLENBQUMsSUFBTVgsV0FBV0MsRUFBRSxFQUFFSyxPQUFPO0lBQ3pERixNQUFNUiw0REFBT0EsQ0FBQztRQUFFUyxRQUFRO0lBQUksR0FBR0MsT0FBTztJQUN0Q00sS0FBS2hCLDREQUFPQSxDQUFDO1FBQUVTLFFBQVE7SUFBSSxHQUFHQyxPQUFPLEdBQUdFLE1BQU07SUFDOUNLLFVBQVVmLDhEQUFTQSxDQUFDO0lBQ3BCZ0IsV0FBV2hCLDhEQUFTQSxDQUFDLGVBQWVpQixVQUFVLEdBQUdULE9BQU87SUFDeERVLFVBQVVqQiw0REFBT0EsR0FBR2tCLE9BQU8sQ0FBQyxNQUFNWCxPQUFPO0FBQzdDLEdBQUc7QUFFSSxNQUFNWSxjQUFjdkIsNERBQU9BLENBQUMsVUFBVTtJQUN6Q00sSUFBSVAsNERBQU9BLEdBQUdRLFVBQVUsR0FBR0MseUJBQXlCO0lBQ3BEZ0IsT0FBT3ZCLDREQUFPQSxDQUFDO1FBQUVTLFFBQVE7SUFBSSxHQUFHQyxPQUFPO0lBQ3ZDYyxNQUFNeEIsNERBQU9BLENBQUM7UUFBRVMsUUFBUTtJQUFHO0lBQzNCZ0IsVUFBVTNCLDREQUFPQTtJQUNqQjRCLFFBQVExQiw0REFBT0EsQ0FBQztRQUFFUyxRQUFRO0lBQUc7SUFDN0JrQixhQUFhM0IsNERBQU9BLENBQUM7UUFBRVMsUUFBUTtJQUFHO0lBQ2xDbUIsU0FBUzNCLHlEQUFJQTtJQUNiNEIsV0FBVzVCLHlEQUFJQTtJQUNmNkIsU0FBUzdCLHlEQUFJQSxHQUFHOEIsS0FBSztJQUNyQkMsVUFBVS9CLHlEQUFJQSxHQUFHOEIsS0FBSztJQUN0QkUsV0FBV2hDLHlEQUFJQSxHQUFHOEIsS0FBSztJQUN2QkcsTUFBTWpDLHlEQUFJQSxHQUFHOEIsS0FBSztBQUN0QixHQUFHIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXFJPRFJJR09cXERlc2t0b3BcXGFuaW1lLWFwaS1tYWluXFxjb25maWdzXFxzY2hlbWEudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW50ZWdlciwgcGdUYWJsZSwgdmFyY2hhciwgdGV4dCwgdGltZXN0YW1wLCBib29sZWFuIH0gZnJvbSBcImRyaXp6bGUtb3JtL3BnLWNvcmVcIjtcclxuXHJcbmV4cG9ydCBjb25zdCB1c2Vyc1RhYmxlID0gcGdUYWJsZShcInVzZXJzXCIsIHtcclxuICAgIGlkOiBpbnRlZ2VyKCkucHJpbWFyeUtleSgpLmdlbmVyYXRlZEFsd2F5c0FzSWRlbnRpdHkoKSxcclxuICAgIG5hbWU6IHZhcmNoYXIoeyBsZW5ndGg6IDI1NSB9KS5ub3ROdWxsKCksXHJcbiAgICBlbWFpbDogdmFyY2hhcih7IGxlbmd0aDogMjU1IH0pLm5vdE51bGwoKS51bmlxdWUoKSxcclxufSk7XHJcblxyXG5leHBvcnQgY29uc3QgYXBpS2V5c1RhYmxlID0gcGdUYWJsZShcImFwaV9rZXlzXCIsIHtcclxuICAgIGlkOiBpbnRlZ2VyKCkucHJpbWFyeUtleSgpLmdlbmVyYXRlZEFsd2F5c0FzSWRlbnRpdHkoKSxcclxuICAgIHVzZXJJZDogaW50ZWdlcigpLnJlZmVyZW5jZXMoKCkgPT4gdXNlcnNUYWJsZS5pZCkubm90TnVsbCgpLFxyXG4gICAgbmFtZTogdmFyY2hhcih7IGxlbmd0aDogMjU1IH0pLm5vdE51bGwoKSxcclxuICAgIGtleTogdmFyY2hhcih7IGxlbmd0aDogMjU1IH0pLm5vdE51bGwoKS51bmlxdWUoKSxcclxuICAgIGxhc3RVc2VkOiB0aW1lc3RhbXAoXCJ0aW1lc3RhbXB0elwiKSxcclxuICAgIGNyZWF0ZWRBdDogdGltZXN0YW1wKFwidGltZXN0YW1wdHpcIikuZGVmYXVsdE5vdygpLm5vdE51bGwoKSxcclxuICAgIGlzQWN0aXZlOiBib29sZWFuKCkuZGVmYXVsdCh0cnVlKS5ub3ROdWxsKCksXHJcbn0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IGFuaW1lc1RhYmxlID0gcGdUYWJsZShcImFuaW1lc1wiLCB7XHJcbiAgICBpZDogaW50ZWdlcigpLnByaW1hcnlLZXkoKS5nZW5lcmF0ZWRBbHdheXNBc0lkZW50aXR5KCksXHJcbiAgICB0aXRsZTogdmFyY2hhcih7IGxlbmd0aDogMjU1IH0pLm5vdE51bGwoKSxcclxuICAgIHR5cGU6IHZhcmNoYXIoeyBsZW5ndGg6IDUwIH0pLCAvLyBUViwgTW92aWUsIE9WQSwgZXRjLlxyXG4gICAgZXBpc29kZXM6IGludGVnZXIoKSxcclxuICAgIHN0YXR1czogdmFyY2hhcih7IGxlbmd0aDogNTAgfSksIC8vIEZpbmlzaGVkLCBDdXJyZW50bHkgQWlyaW5nLCBldGMuXHJcbiAgICBhbmltZVNlYXNvbjogdmFyY2hhcih7IGxlbmd0aDogNTAgfSksIC8vIFNlYXNvbiBpbmZvXHJcbiAgICBwaWN0dXJlOiB0ZXh0KCksIC8vIFVSTCB0byB0aGUgcGljdHVyZVxyXG4gICAgdGh1bWJuYWlsOiB0ZXh0KCksIC8vIFVSTCB0byB0aGUgdGh1bWJuYWlsXHJcbiAgICBzb3VyY2VzOiB0ZXh0KCkuYXJyYXkoKSwgLy8gQXJyYXkgb2Ygc291cmNlIFVSTHNcclxuICAgIHN5bm9ueW1zOiB0ZXh0KCkuYXJyYXkoKSwgLy8gQWx0ZXJuYXRpdmUgdGl0bGVzXHJcbiAgICByZWxhdGlvbnM6IHRleHQoKS5hcnJheSgpLCAvLyBSZWxhdGVkIGFuaW1lIFVSTHNcclxuICAgIHRhZ3M6IHRleHQoKS5hcnJheSgpLCAvLyBUYWdzL2dlbnJlc1xyXG59KTsiXSwibmFtZXMiOlsiaW50ZWdlciIsInBnVGFibGUiLCJ2YXJjaGFyIiwidGV4dCIsInRpbWVzdGFtcCIsImJvb2xlYW4iLCJ1c2Vyc1RhYmxlIiwiaWQiLCJwcmltYXJ5S2V5IiwiZ2VuZXJhdGVkQWx3YXlzQXNJZGVudGl0eSIsIm5hbWUiLCJsZW5ndGgiLCJub3ROdWxsIiwiZW1haWwiLCJ1bmlxdWUiLCJhcGlLZXlzVGFibGUiLCJ1c2VySWQiLCJyZWZlcmVuY2VzIiwia2V5IiwibGFzdFVzZWQiLCJjcmVhdGVkQXQiLCJkZWZhdWx0Tm93IiwiaXNBY3RpdmUiLCJkZWZhdWx0IiwiYW5pbWVzVGFibGUiLCJ0aXRsZSIsInR5cGUiLCJlcGlzb2RlcyIsInN0YXR1cyIsImFuaW1lU2Vhc29uIiwicGljdHVyZSIsInRodW1ibmFpbCIsInNvdXJjZXMiLCJhcnJheSIsInN5bm9ueW1zIiwicmVsYXRpb25zIiwidGFncyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./configs/schema.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fkeys%2Froute&page=%2Fapi%2Fkeys%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fkeys%2Froute.ts&appDir=C%3A%5CUsers%5CRODRIGO%5CDesktop%5Canime-api-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CRODRIGO%5CDesktop%5Canime-api-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fkeys%2Froute&page=%2Fapi%2Fkeys%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fkeys%2Froute.ts&appDir=C%3A%5CUsers%5CRODRIGO%5CDesktop%5Canime-api-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CRODRIGO%5CDesktop%5Canime-api-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_RODRIGO_Desktop_anime_api_main_app_api_keys_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/keys/route.ts */ \"(rsc)/./app/api/keys/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/keys/route\",\n        pathname: \"/api/keys\",\n        filename: \"route\",\n        bundlePath: \"app/api/keys/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\RODRIGO\\\\Desktop\\\\anime-api-main\\\\app\\\\api\\\\keys\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_RODRIGO_Desktop_anime_api_main_app_api_keys_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZrZXlzJTJGcm91dGUmcGFnZT0lMkZhcGklMkZrZXlzJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGa2V5cyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNST0RSSUdPJTVDRGVza3RvcCU1Q2FuaW1lLWFwaS1tYWluJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNST0RSSUdPJTVDRGVza3RvcCU1Q2FuaW1lLWFwaS1tYWluJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNxQjtBQUNsRztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcUk9EUklHT1xcXFxEZXNrdG9wXFxcXGFuaW1lLWFwaS1tYWluXFxcXGFwcFxcXFxhcGlcXFxca2V5c1xcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkva2V5cy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2tleXNcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2tleXMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxST0RSSUdPXFxcXERlc2t0b3BcXFxcYW5pbWUtYXBpLW1haW5cXFxcYXBwXFxcXGFwaVxcXFxrZXlzXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fkeys%2Froute&page=%2Fapi%2Fkeys%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fkeys%2Froute.ts&appDir=C%3A%5CUsers%5CRODRIGO%5CDesktop%5Canime-api-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CRODRIGO%5CDesktop%5Canime-api-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/drizzle-orm","vendor-chunks/@neondatabase","vendor-chunks/dotenv"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fkeys%2Froute&page=%2Fapi%2Fkeys%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fkeys%2Froute.ts&appDir=C%3A%5CUsers%5CRODRIGO%5CDesktop%5Canime-api-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CRODRIGO%5CDesktop%5Canime-api-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();