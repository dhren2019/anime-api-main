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
exports.id = "app/api/user/route";
exports.ids = ["app/api/user/route"];
exports.modules = {

/***/ "(rsc)/./app/api/user/route.tsx":
/*!********************************!*\
  !*** ./app/api/user/route.tsx ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var drizzle_orm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! drizzle-orm */ \"(rsc)/./node_modules/drizzle-orm/sql/expressions/conditions.js\");\n/* harmony import */ var _configs_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/configs/db */ \"(rsc)/./configs/db.tsx\");\n/* harmony import */ var _configs_schema__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/configs/schema */ \"(rsc)/./configs/schema.ts\");\n/* harmony import */ var _clerk_nextjs_server__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @clerk/nextjs/server */ \"(rsc)/./node_modules/@clerk/nextjs/dist/esm/app-router/server/currentUser.js\");\n\n\n\n\n\nasync function POST(req) {\n    try {\n        const user = await (0,_clerk_nextjs_server__WEBPACK_IMPORTED_MODULE_3__.currentUser)();\n        if (!user || !user.primaryEmailAddress?.emailAddress) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Unauthorized or missing email address\"\n            }, {\n                status: 401\n            });\n        }\n        const email = user.primaryEmailAddress.emailAddress;\n        // Check if user already exists\n        const existingUsers = await _configs_db__WEBPACK_IMPORTED_MODULE_1__.db.select().from(_configs_schema__WEBPACK_IMPORTED_MODULE_2__.usersTable).where((0,drizzle_orm__WEBPACK_IMPORTED_MODULE_4__.eq)(_configs_schema__WEBPACK_IMPORTED_MODULE_2__.usersTable.email, email));\n        if (existingUsers.length > 0) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(existingUsers[0]);\n        }\n        // Insert new user\n        const insertedUsers = await _configs_db__WEBPACK_IMPORTED_MODULE_1__.db.insert(_configs_schema__WEBPACK_IMPORTED_MODULE_2__.usersTable).values({\n            name: user.fullName ?? \"\",\n            email: email\n        }).returning();\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(insertedUsers[0]);\n    } catch (e) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: e.message || \"Server error\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3VzZXIvcm91dGUudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUF3RDtBQUN2QjtBQUNDO0FBQ1k7QUFDSztBQUU1QyxlQUFlSyxLQUFLQyxHQUFnQjtJQUN2QyxJQUFJO1FBQ0EsTUFBTUMsT0FBTyxNQUFNSCxpRUFBV0E7UUFFOUIsSUFBSSxDQUFDRyxRQUFRLENBQUNBLEtBQUtDLG1CQUFtQixFQUFFQyxjQUFjO1lBQ2xELE9BQU9ULHFEQUFZQSxDQUFDVSxJQUFJLENBQ3BCO2dCQUFFQyxPQUFPO1lBQXdDLEdBQ2pEO2dCQUFFQyxRQUFRO1lBQUk7UUFFdEI7UUFFQSxNQUFNQyxRQUFRTixLQUFLQyxtQkFBbUIsQ0FBQ0MsWUFBWTtRQUVuRCwrQkFBK0I7UUFDL0IsTUFBTUssZ0JBQWdCLE1BQU1aLDJDQUFFQSxDQUN6QmEsTUFBTSxHQUNOQyxJQUFJLENBQUNiLHVEQUFVQSxFQUNmYyxLQUFLLENBQUNoQiwrQ0FBRUEsQ0FBQ0UsdURBQVVBLENBQUNVLEtBQUssRUFBRUE7UUFFaEMsSUFBSUMsY0FBY0ksTUFBTSxHQUFHLEdBQUc7WUFDMUIsT0FBT2xCLHFEQUFZQSxDQUFDVSxJQUFJLENBQUNJLGFBQWEsQ0FBQyxFQUFFO1FBQzdDO1FBRUEsa0JBQWtCO1FBQ2xCLE1BQU1LLGdCQUFnQixNQUFNakIsMkNBQUVBLENBQ3pCa0IsTUFBTSxDQUFDakIsdURBQVVBLEVBQ2pCa0IsTUFBTSxDQUFDO1lBQ0pDLE1BQU1mLEtBQUtnQixRQUFRLElBQUk7WUFDdkJWLE9BQU9BO1FBQ1gsR0FDQ1csU0FBUztRQUVkLE9BQU94QixxREFBWUEsQ0FBQ1UsSUFBSSxDQUFDUyxhQUFhLENBQUMsRUFBRTtJQUM3QyxFQUFFLE9BQU9NLEdBQVE7UUFDYixPQUFPekIscURBQVlBLENBQUNVLElBQUksQ0FBQztZQUFFQyxPQUFPYyxFQUFFQyxPQUFPLElBQUk7UUFBZSxHQUFHO1lBQUVkLFFBQVE7UUFBSTtJQUNuRjtBQUNKIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXFJPRFJJR09cXERlc2t0b3BcXGFuaW1lLWFwaS1tYWluXFxhcHBcXGFwaVxcdXNlclxccm91dGUudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcclxuaW1wb3J0IHsgZXEgfSBmcm9tIFwiZHJpenpsZS1vcm1cIjtcclxuaW1wb3J0IHsgZGIgfSBmcm9tIFwiQC9jb25maWdzL2RiXCI7XHJcbmltcG9ydCB7IHVzZXJzVGFibGUgfSBmcm9tIFwiQC9jb25maWdzL3NjaGVtYVwiO1xyXG5pbXBvcnQgeyBjdXJyZW50VXNlciB9IGZyb20gXCJAY2xlcmsvbmV4dGpzL3NlcnZlclwiO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxOiBOZXh0UmVxdWVzdCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgY3VycmVudFVzZXIoKTtcclxuXHJcbiAgICAgICAgaWYgKCF1c2VyIHx8ICF1c2VyLnByaW1hcnlFbWFpbEFkZHJlc3M/LmVtYWlsQWRkcmVzcykge1xyXG4gICAgICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgICAgICAgICAgICB7IGVycm9yOiBcIlVuYXV0aG9yaXplZCBvciBtaXNzaW5nIGVtYWlsIGFkZHJlc3NcIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBzdGF0dXM6IDQwMSB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBlbWFpbCA9IHVzZXIucHJpbWFyeUVtYWlsQWRkcmVzcy5lbWFpbEFkZHJlc3M7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHVzZXIgYWxyZWFkeSBleGlzdHNcclxuICAgICAgICBjb25zdCBleGlzdGluZ1VzZXJzID0gYXdhaXQgZGJcclxuICAgICAgICAgICAgLnNlbGVjdCgpXHJcbiAgICAgICAgICAgIC5mcm9tKHVzZXJzVGFibGUpXHJcbiAgICAgICAgICAgIC53aGVyZShlcSh1c2Vyc1RhYmxlLmVtYWlsLCBlbWFpbCkpO1xyXG5cclxuICAgICAgICBpZiAoZXhpc3RpbmdVc2Vycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihleGlzdGluZ1VzZXJzWzBdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEluc2VydCBuZXcgdXNlclxyXG4gICAgICAgIGNvbnN0IGluc2VydGVkVXNlcnMgPSBhd2FpdCBkYlxyXG4gICAgICAgICAgICAuaW5zZXJ0KHVzZXJzVGFibGUpXHJcbiAgICAgICAgICAgIC52YWx1ZXMoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogdXNlci5mdWxsTmFtZSA/PyBcIlwiLFxyXG4gICAgICAgICAgICAgICAgZW1haWw6IGVtYWlsLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAucmV0dXJuaW5nKCk7XHJcblxyXG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihpbnNlcnRlZFVzZXJzWzBdKTtcclxuICAgIH0gY2F0Y2ggKGU6IGFueSkge1xyXG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBlLm1lc3NhZ2UgfHwgXCJTZXJ2ZXIgZXJyb3JcIiB9LCB7IHN0YXR1czogNTAwIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJlcSIsImRiIiwidXNlcnNUYWJsZSIsImN1cnJlbnRVc2VyIiwiUE9TVCIsInJlcSIsInVzZXIiLCJwcmltYXJ5RW1haWxBZGRyZXNzIiwiZW1haWxBZGRyZXNzIiwianNvbiIsImVycm9yIiwic3RhdHVzIiwiZW1haWwiLCJleGlzdGluZ1VzZXJzIiwic2VsZWN0IiwiZnJvbSIsIndoZXJlIiwibGVuZ3RoIiwiaW5zZXJ0ZWRVc2VycyIsImluc2VydCIsInZhbHVlcyIsIm5hbWUiLCJmdWxsTmFtZSIsInJldHVybmluZyIsImUiLCJtZXNzYWdlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/user/route.tsx\n");

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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fuser%2Froute&page=%2Fapi%2Fuser%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Froute.tsx&appDir=C%3A%5CUsers%5CRODRIGO%5CDesktop%5Canime-api-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CRODRIGO%5CDesktop%5Canime-api-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fuser%2Froute&page=%2Fapi%2Fuser%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Froute.tsx&appDir=C%3A%5CUsers%5CRODRIGO%5CDesktop%5Canime-api-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CRODRIGO%5CDesktop%5Canime-api-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_RODRIGO_Desktop_anime_api_main_app_api_user_route_tsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/user/route.tsx */ \"(rsc)/./app/api/user/route.tsx\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/user/route\",\n        pathname: \"/api/user\",\n        filename: \"route\",\n        bundlePath: \"app/api/user/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\RODRIGO\\\\Desktop\\\\anime-api-main\\\\app\\\\api\\\\user\\\\route.tsx\",\n    nextConfigOutput,\n    userland: C_Users_RODRIGO_Desktop_anime_api_main_app_api_user_route_tsx__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZ1c2VyJTJGcm91dGUmcGFnZT0lMkZhcGklMkZ1c2VyJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGdXNlciUyRnJvdXRlLnRzeCZhcHBEaXI9QyUzQSU1Q1VzZXJzJTVDUk9EUklHTyU1Q0Rlc2t0b3AlNUNhbmltZS1hcGktbWFpbiU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDUk9EUklHTyU1Q0Rlc2t0b3AlNUNhbmltZS1hcGktbWFpbiZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDc0I7QUFDbkc7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXFJPRFJJR09cXFxcRGVza3RvcFxcXFxhbmltZS1hcGktbWFpblxcXFxhcHBcXFxcYXBpXFxcXHVzZXJcXFxccm91dGUudHN4XCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS91c2VyL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvdXNlclwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvdXNlci9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXFJPRFJJR09cXFxcRGVza3RvcFxcXFxhbmltZS1hcGktbWFpblxcXFxhcHBcXFxcYXBpXFxcXHVzZXJcXFxccm91dGUudHN4XCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fuser%2Froute&page=%2Fapi%2Fuser%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Froute.tsx&appDir=C%3A%5CUsers%5CRODRIGO%5CDesktop%5Canime-api-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CRODRIGO%5CDesktop%5Canime-api-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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

/***/ "../app-render/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/server/app-render/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/action-async-storage.external.js");

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

/***/ "node:async_hooks":
/*!***********************************!*\
  !*** external "node:async_hooks" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:async_hooks");

/***/ }),

/***/ "node:crypto":
/*!******************************!*\
  !*** external "node:crypto" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:crypto");

/***/ }),

/***/ "node:fs":
/*!**************************!*\
  !*** external "node:fs" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:fs");

/***/ }),

/***/ "node:path":
/*!****************************!*\
  !*** external "node:path" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:path");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/@clerk","vendor-chunks/next","vendor-chunks/tslib","vendor-chunks/cookie","vendor-chunks/map-obj","vendor-chunks/no-case","vendor-chunks/lower-case","vendor-chunks/snakecase-keys","vendor-chunks/snake-case","vendor-chunks/dot-case","vendor-chunks/drizzle-orm","vendor-chunks/@neondatabase","vendor-chunks/dotenv"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fuser%2Froute&page=%2Fapi%2Fuser%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Froute.tsx&appDir=C%3A%5CUsers%5CRODRIGO%5CDesktop%5Canime-api-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CRODRIGO%5CDesktop%5Canime-api-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();