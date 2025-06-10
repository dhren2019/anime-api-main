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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DELETE: () => (/* binding */ DELETE),\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _configs_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/configs/db */ \"(rsc)/./configs/db.tsx\");\n/* harmony import */ var _configs_schema__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/configs/schema */ \"(rsc)/./configs/schema.ts\");\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! crypto */ \"crypto\");\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var drizzle_orm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! drizzle-orm */ \"(rsc)/./node_modules/drizzle-orm/sql/expressions/conditions.js\");\n/* harmony import */ var _clerk_nextjs_server__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @clerk/nextjs/server */ \"(rsc)/./node_modules/@clerk/nextjs/dist/esm/app-router/server/currentUser.js\");\n\n\n\n\n\n\n// Generate a secure API key\nfunction generateApiKey() {\n    return `sk-${(0,crypto__WEBPACK_IMPORTED_MODULE_3__.randomBytes)(24).toString('hex')}`;\n}\n// Create new API key\nasync function POST(req) {\n    try {\n        const user = await (0,_clerk_nextjs_server__WEBPACK_IMPORTED_MODULE_4__.currentUser)();\n        if (!user || !user.primaryEmailAddress?.emailAddress) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        const { name, plan } = await req.json();\n        // plan puede ser 'free' o 'pro', por defecto 'free'\n        const planType = plan === 'pro' ? 'pro' : 'free';\n        const requestsLimit = planType === 'pro' ? 150 : 10;\n        // Get the user from our database\n        const dbUser = await _configs_db__WEBPACK_IMPORTED_MODULE_1__.db.select().from(_configs_schema__WEBPACK_IMPORTED_MODULE_2__.usersTable).where((0,drizzle_orm__WEBPACK_IMPORTED_MODULE_5__.eq)(_configs_schema__WEBPACK_IMPORTED_MODULE_2__.usersTable.email, user.primaryEmailAddress.emailAddress)).limit(1);\n        if (!dbUser.length) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"User not found\"\n            }, {\n                status: 404\n            });\n        }\n        const key = generateApiKey();\n        const apiKey = await _configs_db__WEBPACK_IMPORTED_MODULE_1__.db.insert(_configs_schema__WEBPACK_IMPORTED_MODULE_2__.apiKeysTable).values({\n            userId: dbUser[0].id,\n            name,\n            key,\n            createdAt: new Date(),\n            isActive: true,\n            plan: planType,\n            requestsLimit,\n            requestsCount: 0\n        }).returning();\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            key: apiKey[0]\n        });\n    } catch (error) {\n        console.error('Error creating API key:', error, error?.message, JSON.stringify(error));\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: error?.message || JSON.stringify(error) || 'Internal Server Error'\n        }, {\n            status: 500\n        });\n    }\n}\n// Get all API keys for the user\nasync function GET() {\n    try {\n        const user = await (0,_clerk_nextjs_server__WEBPACK_IMPORTED_MODULE_4__.currentUser)();\n        console.log('Usuario Clerk:', user);\n        if (!user || !user.primaryEmailAddress?.emailAddress) {\n            console.log('No autenticado');\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        // Get the user from our database\n        const dbUser = await _configs_db__WEBPACK_IMPORTED_MODULE_1__.db.select().from(_configs_schema__WEBPACK_IMPORTED_MODULE_2__.usersTable).where((0,drizzle_orm__WEBPACK_IMPORTED_MODULE_5__.eq)(_configs_schema__WEBPACK_IMPORTED_MODULE_2__.usersTable.email, user.primaryEmailAddress.emailAddress)).limit(1);\n        console.log('Usuario en DB:', dbUser);\n        if (!dbUser.length) {\n            console.log('Usuario no encontrado en DB');\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"User not found\"\n            }, {\n                status: 404\n            });\n        }\n        const keys = await _configs_db__WEBPACK_IMPORTED_MODULE_1__.db.select().from(_configs_schema__WEBPACK_IMPORTED_MODULE_2__.apiKeysTable).where((0,drizzle_orm__WEBPACK_IMPORTED_MODULE_5__.eq)(_configs_schema__WEBPACK_IMPORTED_MODULE_2__.apiKeysTable.userId, dbUser[0].id));\n        console.log('API Keys encontradas:', keys);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            keys\n        });\n    } catch (error) {\n        console.error('Error fetching API keys:', error, error?.message, JSON.stringify(error));\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: error?.message || JSON.stringify(error) || 'Internal Server Error'\n        }, {\n            status: 500\n        });\n    }\n}\n// Delete an API key\nasync function DELETE(req) {\n    try {\n        const user = await (0,_clerk_nextjs_server__WEBPACK_IMPORTED_MODULE_4__.currentUser)();\n        if (!user || !user.primaryEmailAddress?.emailAddress) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        const { id } = await req.json();\n        // Get the user from our database\n        const dbUser = await _configs_db__WEBPACK_IMPORTED_MODULE_1__.db.select().from(_configs_schema__WEBPACK_IMPORTED_MODULE_2__.usersTable).where((0,drizzle_orm__WEBPACK_IMPORTED_MODULE_5__.eq)(_configs_schema__WEBPACK_IMPORTED_MODULE_2__.usersTable.email, user.primaryEmailAddress.emailAddress)).limit(1);\n        if (!dbUser.length) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"User not found\"\n            }, {\n                status: 404\n            });\n        }\n        await _configs_db__WEBPACK_IMPORTED_MODULE_1__.db.delete(_configs_schema__WEBPACK_IMPORTED_MODULE_2__.apiKeysTable).where((0,drizzle_orm__WEBPACK_IMPORTED_MODULE_5__.and)((0,drizzle_orm__WEBPACK_IMPORTED_MODULE_5__.eq)(_configs_schema__WEBPACK_IMPORTED_MODULE_2__.apiKeysTable.id, id), (0,drizzle_orm__WEBPACK_IMPORTED_MODULE_5__.eq)(_configs_schema__WEBPACK_IMPORTED_MODULE_2__.apiKeysTable.userId, dbUser[0].id)));\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true\n        });\n    } catch (error) {\n        console.error('Error deleting API key:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: error.message || 'Internal Server Error'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QiwyQ0FBRUEsQ0FDcEJzQixNQUFNLEdBQ05DLElBQUksQ0FBQ3JCLHVEQUFVQSxFQUNmc0IsS0FBSyxDQUFDcEIsK0NBQUVBLENBQUNGLHVEQUFVQSxDQUFDdUIsS0FBSyxFQUFFZCxLQUFLQyxtQkFBbUIsQ0FBQ0MsWUFBWSxHQUNoRWEsS0FBSyxDQUFDO1FBRVQsSUFBSSxDQUFDTCxPQUFPTSxNQUFNLEVBQUU7WUFDbEIsT0FBTzVCLHFEQUFZQSxDQUFDZSxJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBaUIsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQ3RFO1FBRUEsTUFBTWhCLDJDQUFFQSxDQUNMZ0QsTUFBTSxDQUFDL0MseURBQVlBLEVBQ25CdUIsS0FBSyxDQUNKbkIsZ0RBQUdBLENBQ0RELCtDQUFFQSxDQUFDSCx5REFBWUEsQ0FBQ2dDLEVBQUUsRUFBRUEsS0FDcEI3QiwrQ0FBRUEsQ0FBQ0gseURBQVlBLENBQUMrQixNQUFNLEVBQUVYLE1BQU0sQ0FBQyxFQUFFLENBQUNZLEVBQUU7UUFJMUMsT0FBT2xDLHFEQUFZQSxDQUFDZSxJQUFJLENBQUM7WUFBRXlCLFNBQVM7UUFBSztJQUMzQyxFQUFFLE9BQU94QixPQUFZO1FBQ25CeUIsUUFBUXpCLEtBQUssQ0FBQywyQkFBMkJBO1FBQ3pDLE9BQU9oQixxREFBWUEsQ0FBQ2UsSUFBSSxDQUN0QjtZQUFFQyxPQUFPQSxNQUFNMEIsT0FBTyxJQUFJO1FBQXdCLEdBQ2xEO1lBQUV6QixRQUFRO1FBQUk7SUFFbEI7QUFDRiIsInNvdXJjZXMiOlsiL1VzZXJzL3JvZHJpZ29nbG9kb3NpbmRvL0Rlc2t0b3AvYW5pbWUtYXBpLW1haW4vYXBwL2FwaS9rZXlzL3JvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcbmltcG9ydCB7IGRiIH0gZnJvbSAnQC9jb25maWdzL2RiJztcbmltcG9ydCB7IGFwaUtleXNUYWJsZSwgdXNlcnNUYWJsZSB9IGZyb20gJ0AvY29uZmlncy9zY2hlbWEnO1xuaW1wb3J0IHsgcmFuZG9tQnl0ZXMgfSBmcm9tICdjcnlwdG8nO1xuaW1wb3J0IHsgZXEsIGFuZCB9IGZyb20gJ2RyaXp6bGUtb3JtJztcbmltcG9ydCB7IGN1cnJlbnRVc2VyIH0gZnJvbSBcIkBjbGVyay9uZXh0anMvc2VydmVyXCI7XG5cbi8vIEdlbmVyYXRlIGEgc2VjdXJlIEFQSSBrZXlcbmZ1bmN0aW9uIGdlbmVyYXRlQXBpS2V5KCkge1xuICByZXR1cm4gYHNrLSR7cmFuZG9tQnl0ZXMoMjQpLnRvU3RyaW5nKCdoZXgnKX1gO1xufVxuXG4vLyBDcmVhdGUgbmV3IEFQSSBrZXlcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcTogUmVxdWVzdCkge1xuICB0cnkge1xuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBjdXJyZW50VXNlcigpO1xuICAgIFxuICAgIGlmICghdXNlciB8fCAhdXNlci5wcmltYXJ5RW1haWxBZGRyZXNzPy5lbWFpbEFkZHJlc3MpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH0sIHsgc3RhdHVzOiA0MDEgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgeyBuYW1lLCBwbGFuIH0gPSBhd2FpdCByZXEuanNvbigpO1xuICAgIC8vIHBsYW4gcHVlZGUgc2VyICdmcmVlJyBvICdwcm8nLCBwb3IgZGVmZWN0byAnZnJlZSdcbiAgICBjb25zdCBwbGFuVHlwZSA9IHBsYW4gPT09ICdwcm8nID8gJ3BybycgOiAnZnJlZSc7XG4gICAgY29uc3QgcmVxdWVzdHNMaW1pdCA9IHBsYW5UeXBlID09PSAncHJvJyA/IDE1MCA6IDEwO1xuICAgIFxuICAgIC8vIEdldCB0aGUgdXNlciBmcm9tIG91ciBkYXRhYmFzZVxuICAgIGNvbnN0IGRiVXNlciA9IGF3YWl0IGRiXG4gICAgICAuc2VsZWN0KClcbiAgICAgIC5mcm9tKHVzZXJzVGFibGUpXG4gICAgICAud2hlcmUoZXEodXNlcnNUYWJsZS5lbWFpbCwgdXNlci5wcmltYXJ5RW1haWxBZGRyZXNzLmVtYWlsQWRkcmVzcykpXG4gICAgICAubGltaXQoMSk7XG5cbiAgICBpZiAoIWRiVXNlci5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIlVzZXIgbm90IGZvdW5kXCIgfSwgeyBzdGF0dXM6IDQwNCB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBrZXkgPSBnZW5lcmF0ZUFwaUtleSgpO1xuICAgIGNvbnN0IGFwaUtleSA9IGF3YWl0IGRiLmluc2VydChhcGlLZXlzVGFibGUpLnZhbHVlcyh7XG4gICAgICB1c2VySWQ6IGRiVXNlclswXS5pZCxcbiAgICAgIG5hbWUsXG4gICAgICBrZXksXG4gICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKCksXG4gICAgICBpc0FjdGl2ZTogdHJ1ZSxcbiAgICAgIHBsYW46IHBsYW5UeXBlLFxuICAgICAgcmVxdWVzdHNMaW1pdCxcbiAgICAgIHJlcXVlc3RzQ291bnQ6IDBcbiAgICB9KS5yZXR1cm5pbmcoKTtcblxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGtleTogYXBpS2V5WzBdIH0pO1xuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgY29uc29sZS5lcnJvcignRXJyb3IgY3JlYXRpbmcgQVBJIGtleTonLCBlcnJvciwgZXJyb3I/Lm1lc3NhZ2UsIEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgeyBlcnJvcjogZXJyb3I/Lm1lc3NhZ2UgfHwgSlNPTi5zdHJpbmdpZnkoZXJyb3IpIHx8ICdJbnRlcm5hbCBTZXJ2ZXIgRXJyb3InIH0sIFxuICAgICAgeyBzdGF0dXM6IDUwMCB9XG4gICAgKTtcbiAgfVxufVxuXG4vLyBHZXQgYWxsIEFQSSBrZXlzIGZvciB0aGUgdXNlclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVCgpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgY3VycmVudFVzZXIoKTtcbiAgICBjb25zb2xlLmxvZygnVXN1YXJpbyBDbGVyazonLCB1c2VyKTtcblxuICAgIGlmICghdXNlciB8fCAhdXNlci5wcmltYXJ5RW1haWxBZGRyZXNzPy5lbWFpbEFkZHJlc3MpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdObyBhdXRlbnRpY2FkbycpO1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfSwgeyBzdGF0dXM6IDQwMSB9KTtcbiAgICB9XG5cbiAgICAvLyBHZXQgdGhlIHVzZXIgZnJvbSBvdXIgZGF0YWJhc2VcbiAgICBjb25zdCBkYlVzZXIgPSBhd2FpdCBkYlxuICAgICAgLnNlbGVjdCgpXG4gICAgICAuZnJvbSh1c2Vyc1RhYmxlKVxuICAgICAgLndoZXJlKGVxKHVzZXJzVGFibGUuZW1haWwsIHVzZXIucHJpbWFyeUVtYWlsQWRkcmVzcy5lbWFpbEFkZHJlc3MpKVxuICAgICAgLmxpbWl0KDEpO1xuXG4gICAgY29uc29sZS5sb2coJ1VzdWFyaW8gZW4gREI6JywgZGJVc2VyKTtcblxuICAgIGlmICghZGJVc2VyLmxlbmd0aCkge1xuICAgICAgY29uc29sZS5sb2coJ1VzdWFyaW8gbm8gZW5jb250cmFkbyBlbiBEQicpO1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiVXNlciBub3QgZm91bmRcIiB9LCB7IHN0YXR1czogNDA0IH0pO1xuICAgIH1cblxuICAgIGNvbnN0IGtleXMgPSBhd2FpdCBkYlxuICAgICAgLnNlbGVjdCgpXG4gICAgICAuZnJvbShhcGlLZXlzVGFibGUpXG4gICAgICAud2hlcmUoZXEoYXBpS2V5c1RhYmxlLnVzZXJJZCwgZGJVc2VyWzBdLmlkKSk7XG5cbiAgICBjb25zb2xlLmxvZygnQVBJIEtleXMgZW5jb250cmFkYXM6Jywga2V5cyk7XG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBrZXlzIH0pO1xuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgQVBJIGtleXM6JywgZXJyb3IsIGVycm9yPy5tZXNzYWdlLCBKU09OLnN0cmluZ2lmeShlcnJvcikpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgIHsgZXJyb3I6IGVycm9yPy5tZXNzYWdlIHx8IEpTT04uc3RyaW5naWZ5KGVycm9yKSB8fCAnSW50ZXJuYWwgU2VydmVyIEVycm9yJyB9LCBcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxuICAgICk7XG4gIH1cbn1cblxuLy8gRGVsZXRlIGFuIEFQSSBrZXlcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBERUxFVEUocmVxOiBSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgY29uc3QgdXNlciA9IGF3YWl0IGN1cnJlbnRVc2VyKCk7XG4gICAgXG4gICAgaWYgKCF1c2VyIHx8ICF1c2VyLnByaW1hcnlFbWFpbEFkZHJlc3M/LmVtYWlsQWRkcmVzcykge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfSwgeyBzdGF0dXM6IDQwMSB9KTtcbiAgICB9XG5cbiAgICBjb25zdCB7IGlkIH0gPSBhd2FpdCByZXEuanNvbigpO1xuICAgIFxuICAgIC8vIEdldCB0aGUgdXNlciBmcm9tIG91ciBkYXRhYmFzZVxuICAgIGNvbnN0IGRiVXNlciA9IGF3YWl0IGRiXG4gICAgICAuc2VsZWN0KClcbiAgICAgIC5mcm9tKHVzZXJzVGFibGUpXG4gICAgICAud2hlcmUoZXEodXNlcnNUYWJsZS5lbWFpbCwgdXNlci5wcmltYXJ5RW1haWxBZGRyZXNzLmVtYWlsQWRkcmVzcykpXG4gICAgICAubGltaXQoMSk7XG5cbiAgICBpZiAoIWRiVXNlci5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIlVzZXIgbm90IGZvdW5kXCIgfSwgeyBzdGF0dXM6IDQwNCB9KTtcbiAgICB9XG5cbiAgICBhd2FpdCBkYlxuICAgICAgLmRlbGV0ZShhcGlLZXlzVGFibGUpXG4gICAgICAud2hlcmUoXG4gICAgICAgIGFuZChcbiAgICAgICAgICBlcShhcGlLZXlzVGFibGUuaWQsIGlkKSwgXG4gICAgICAgICAgZXEoYXBpS2V5c1RhYmxlLnVzZXJJZCwgZGJVc2VyWzBdLmlkKVxuICAgICAgICApXG4gICAgICApO1xuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgc3VjY2VzczogdHJ1ZSB9KTtcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGRlbGV0aW5nIEFQSSBrZXk6JywgZXJyb3IpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgIHsgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ0ludGVybmFsIFNlcnZlciBFcnJvcicgfSwgXG4gICAgICB7IHN0YXR1czogNTAwIH1cbiAgICApO1xuICB9XG59XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiZGIiLCJhcGlLZXlzVGFibGUiLCJ1c2Vyc1RhYmxlIiwicmFuZG9tQnl0ZXMiLCJlcSIsImFuZCIsImN1cnJlbnRVc2VyIiwiZ2VuZXJhdGVBcGlLZXkiLCJ0b1N0cmluZyIsIlBPU1QiLCJyZXEiLCJ1c2VyIiwicHJpbWFyeUVtYWlsQWRkcmVzcyIsImVtYWlsQWRkcmVzcyIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsIm5hbWUiLCJwbGFuIiwicGxhblR5cGUiLCJyZXF1ZXN0c0xpbWl0IiwiZGJVc2VyIiwic2VsZWN0IiwiZnJvbSIsIndoZXJlIiwiZW1haWwiLCJsaW1pdCIsImxlbmd0aCIsImtleSIsImFwaUtleSIsImluc2VydCIsInZhbHVlcyIsInVzZXJJZCIsImlkIiwiY3JlYXRlZEF0IiwiRGF0ZSIsImlzQWN0aXZlIiwicmVxdWVzdHNDb3VudCIsInJldHVybmluZyIsInN1Y2Nlc3MiLCJjb25zb2xlIiwibWVzc2FnZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJHRVQiLCJsb2ciLCJrZXlzIiwiREVMRVRFIiwiZGVsZXRlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/keys/route.ts\n");

/***/ }),

/***/ "(rsc)/./configs/db.tsx":
/*!************************!*\
  !*** ./configs/db.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   db: () => (/* binding */ db)\n/* harmony export */ });\n/* harmony import */ var drizzle_orm_neon_serverless__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! drizzle-orm/neon-serverless */ \"(rsc)/./node_modules/drizzle-orm/neon-serverless/driver.js\");\n/* harmony import */ var _neondatabase_serverless__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @neondatabase/serverless */ \"(rsc)/./node_modules/@neondatabase/serverless/index.mjs\");\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dotenv */ \"(rsc)/./node_modules/dotenv/lib/main.js\");\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n// Load environment variables\ndotenv__WEBPACK_IMPORTED_MODULE_1__.config();\nconst connectionString = \"postgresql://Animeapi_owner:npg_ybLRT27GuwPV@ep-summer-glade-a8ixf8q4-pooler.eastus2.azure.neon.tech/Animeapi?sslmode=require\";\nif (!connectionString) {\n    throw new Error('Database connection string not found in environment variables');\n}\nconst pool = new _neondatabase_serverless__WEBPACK_IMPORTED_MODULE_0__.Pool({\n    connectionString\n});\nconst db = (0,drizzle_orm_neon_serverless__WEBPACK_IMPORTED_MODULE_2__.drizzle)(pool);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9jb25maWdzL2RiLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFzRDtBQUNOO0FBQ2Y7QUFFakMsNkJBQTZCO0FBQzdCRSwwQ0FBYTtBQUViLE1BQU1FLG1CQUFtQkMsK0hBQWlEO0FBQzFFLElBQUksQ0FBQ0Qsa0JBQWtCO0lBQ25CLE1BQU0sSUFBSUksTUFBTTtBQUNwQjtBQUVBLE1BQU1DLE9BQU8sSUFBSVIsMERBQUlBLENBQUM7SUFBRUc7QUFBaUI7QUFDbEMsTUFBTU0sS0FBS1Ysb0VBQU9BLENBQUNTLE1BQU0iLCJzb3VyY2VzIjpbIi9Vc2Vycy9yb2RyaWdvZ2xvZG9zaW5kby9EZXNrdG9wL2FuaW1lLWFwaS1tYWluL2NvbmZpZ3MvZGIudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRyaXp6bGUgfSBmcm9tICdkcml6emxlLW9ybS9uZW9uLXNlcnZlcmxlc3MnO1xuaW1wb3J0IHsgUG9vbCB9IGZyb20gJ0BuZW9uZGF0YWJhc2Uvc2VydmVybGVzcyc7XG5pbXBvcnQgKiBhcyBkb3RlbnYgZnJvbSAnZG90ZW52JztcblxuLy8gTG9hZCBlbnZpcm9ubWVudCB2YXJpYWJsZXNcbmRvdGVudi5jb25maWcoKTtcblxuY29uc3QgY29ubmVjdGlvblN0cmluZyA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX05FT05fREJfQ09OTkVDVElPTl9TVFJJTkc7XG5pZiAoIWNvbm5lY3Rpb25TdHJpbmcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0RhdGFiYXNlIGNvbm5lY3Rpb24gc3RyaW5nIG5vdCBmb3VuZCBpbiBlbnZpcm9ubWVudCB2YXJpYWJsZXMnKTtcbn1cblxuY29uc3QgcG9vbCA9IG5ldyBQb29sKHsgY29ubmVjdGlvblN0cmluZyB9KTtcbmV4cG9ydCBjb25zdCBkYiA9IGRyaXp6bGUocG9vbCk7Il0sIm5hbWVzIjpbImRyaXp6bGUiLCJQb29sIiwiZG90ZW52IiwiY29uZmlnIiwiY29ubmVjdGlvblN0cmluZyIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19ORU9OX0RCX0NPTk5FQ1RJT05fU1RSSU5HIiwiRXJyb3IiLCJwb29sIiwiZGIiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./configs/db.tsx\n");

/***/ }),

/***/ "(rsc)/./configs/schema.ts":
/*!***************************!*\
  !*** ./configs/schema.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   animesTable: () => (/* binding */ animesTable),\n/* harmony export */   apiKeysTable: () => (/* binding */ apiKeysTable),\n/* harmony export */   usersTable: () => (/* binding */ usersTable)\n/* harmony export */ });\n/* harmony import */ var drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! drizzle-orm/pg-core */ \"(rsc)/./node_modules/drizzle-orm/pg-core/table.js\");\n/* harmony import */ var drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! drizzle-orm/pg-core */ \"(rsc)/./node_modules/drizzle-orm/pg-core/columns/integer.js\");\n/* harmony import */ var drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! drizzle-orm/pg-core */ \"(rsc)/./node_modules/drizzle-orm/pg-core/columns/varchar.js\");\n/* harmony import */ var drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! drizzle-orm/pg-core */ \"(rsc)/./node_modules/drizzle-orm/pg-core/columns/timestamp.js\");\n/* harmony import */ var drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! drizzle-orm/pg-core */ \"(rsc)/./node_modules/drizzle-orm/pg-core/columns/boolean.js\");\n/* harmony import */ var drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! drizzle-orm/pg-core */ \"(rsc)/./node_modules/drizzle-orm/pg-core/columns/text.js\");\n\nconst usersTable = (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_0__.pgTable)(\"users\", {\n    id: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_1__.integer)().primaryKey().generatedAlwaysAsIdentity(),\n    name: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.varchar)({\n        length: 255\n    }).notNull(),\n    email: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.varchar)({\n        length: 255\n    }).notNull().unique()\n});\nconst apiKeysTable = (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_0__.pgTable)(\"api_keys\", {\n    id: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_1__.integer)().primaryKey().generatedAlwaysAsIdentity(),\n    userId: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_1__.integer)().references(()=>usersTable.id).notNull(),\n    name: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.varchar)({\n        length: 255\n    }).notNull(),\n    key: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.varchar)({\n        length: 255\n    }).notNull().unique(),\n    lastUsed: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_3__.timestamp)().defaultNow(),\n    createdAt: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_3__.timestamp)().defaultNow().notNull(),\n    isActive: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_4__.boolean)().default(true).notNull(),\n    plan: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.varchar)({\n        length: 20\n    }).default('free').notNull(),\n    requestsCount: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_1__.integer)().default(0).notNull(),\n    requestsLimit: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_1__.integer)().default(10).notNull()\n});\nconst animesTable = (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_0__.pgTable)(\"animes\", {\n    id: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_1__.integer)().primaryKey().generatedAlwaysAsIdentity(),\n    title: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.varchar)({\n        length: 255\n    }).notNull(),\n    type: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.varchar)({\n        length: 50\n    }),\n    episodes: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_1__.integer)(),\n    status: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.varchar)({\n        length: 50\n    }),\n    animeSeason: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.varchar)({\n        length: 50\n    }),\n    picture: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_5__.text)(),\n    thumbnail: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_5__.text)(),\n    sources: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_5__.text)().array(),\n    synonyms: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_5__.text)().array(),\n    relations: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_5__.text)().array(),\n    tags: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_5__.text)().array()\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9jb25maWdzL3NjaGVtYS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBMEY7QUFFbkYsTUFBTU0sYUFBYUwsNERBQU9BLENBQUMsU0FBUztJQUN2Q00sSUFBSVAsNERBQU9BLEdBQUdRLFVBQVUsR0FBR0MseUJBQXlCO0lBQ3BEQyxNQUFNUiw0REFBT0EsQ0FBQztRQUFFUyxRQUFRO0lBQUksR0FBR0MsT0FBTztJQUN0Q0MsT0FBT1gsNERBQU9BLENBQUM7UUFBRVMsUUFBUTtJQUFJLEdBQUdDLE9BQU8sR0FBR0UsTUFBTTtBQUNwRCxHQUFHO0FBRUksTUFBTUMsZUFBZWQsNERBQU9BLENBQUMsWUFBWTtJQUM1Q00sSUFBSVAsNERBQU9BLEdBQUdRLFVBQVUsR0FBR0MseUJBQXlCO0lBQ3BETyxRQUFRaEIsNERBQU9BLEdBQUdpQixVQUFVLENBQUMsSUFBTVgsV0FBV0MsRUFBRSxFQUFFSyxPQUFPO0lBQ3pERixNQUFNUiw0REFBT0EsQ0FBQztRQUFFUyxRQUFRO0lBQUksR0FBR0MsT0FBTztJQUN0Q00sS0FBS2hCLDREQUFPQSxDQUFDO1FBQUVTLFFBQVE7SUFBSSxHQUFHQyxPQUFPLEdBQUdFLE1BQU07SUFDOUNLLFVBQVVmLDhEQUFTQSxHQUFHZ0IsVUFBVTtJQUNoQ0MsV0FBV2pCLDhEQUFTQSxHQUFHZ0IsVUFBVSxHQUFHUixPQUFPO0lBQzNDVSxVQUFVakIsNERBQU9BLEdBQUdrQixPQUFPLENBQUMsTUFBTVgsT0FBTztJQUN6Q1ksTUFBTXRCLDREQUFPQSxDQUFDO1FBQUVTLFFBQVE7SUFBRyxHQUFHWSxPQUFPLENBQUMsUUFBUVgsT0FBTztJQUNyRGEsZUFBZXpCLDREQUFPQSxHQUFHdUIsT0FBTyxDQUFDLEdBQUdYLE9BQU87SUFDM0NjLGVBQWUxQiw0REFBT0EsR0FBR3VCLE9BQU8sQ0FBQyxJQUFJWCxPQUFPO0FBQ2hELEdBQUc7QUFFSSxNQUFNZSxjQUFjMUIsNERBQU9BLENBQUMsVUFBVTtJQUN6Q00sSUFBSVAsNERBQU9BLEdBQUdRLFVBQVUsR0FBR0MseUJBQXlCO0lBQ3BEbUIsT0FBTzFCLDREQUFPQSxDQUFDO1FBQUVTLFFBQVE7SUFBSSxHQUFHQyxPQUFPO0lBQ3ZDaUIsTUFBTTNCLDREQUFPQSxDQUFDO1FBQUVTLFFBQVE7SUFBRztJQUMzQm1CLFVBQVU5Qiw0REFBT0E7SUFDakIrQixRQUFRN0IsNERBQU9BLENBQUM7UUFBRVMsUUFBUTtJQUFHO0lBQzdCcUIsYUFBYTlCLDREQUFPQSxDQUFDO1FBQUVTLFFBQVE7SUFBRztJQUNsQ3NCLFNBQVM5Qix5REFBSUE7SUFDYitCLFdBQVcvQix5REFBSUE7SUFDZmdDLFNBQVNoQyx5REFBSUEsR0FBR2lDLEtBQUs7SUFDckJDLFVBQVVsQyx5REFBSUEsR0FBR2lDLEtBQUs7SUFDdEJFLFdBQVduQyx5REFBSUEsR0FBR2lDLEtBQUs7SUFDdkJHLE1BQU1wQyx5REFBSUEsR0FBR2lDLEtBQUs7QUFDdEIsR0FBRyIsInNvdXJjZXMiOlsiL1VzZXJzL3JvZHJpZ29nbG9kb3NpbmRvL0Rlc2t0b3AvYW5pbWUtYXBpLW1haW4vY29uZmlncy9zY2hlbWEudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW50ZWdlciwgcGdUYWJsZSwgdmFyY2hhciwgdGV4dCwgdGltZXN0YW1wLCBib29sZWFuIH0gZnJvbSBcImRyaXp6bGUtb3JtL3BnLWNvcmVcIjtcblxuZXhwb3J0IGNvbnN0IHVzZXJzVGFibGUgPSBwZ1RhYmxlKFwidXNlcnNcIiwge1xuICAgIGlkOiBpbnRlZ2VyKCkucHJpbWFyeUtleSgpLmdlbmVyYXRlZEFsd2F5c0FzSWRlbnRpdHkoKSxcbiAgICBuYW1lOiB2YXJjaGFyKHsgbGVuZ3RoOiAyNTUgfSkubm90TnVsbCgpLFxuICAgIGVtYWlsOiB2YXJjaGFyKHsgbGVuZ3RoOiAyNTUgfSkubm90TnVsbCgpLnVuaXF1ZSgpLFxufSk7XG5cbmV4cG9ydCBjb25zdCBhcGlLZXlzVGFibGUgPSBwZ1RhYmxlKFwiYXBpX2tleXNcIiwge1xuICAgIGlkOiBpbnRlZ2VyKCkucHJpbWFyeUtleSgpLmdlbmVyYXRlZEFsd2F5c0FzSWRlbnRpdHkoKSxcbiAgICB1c2VySWQ6IGludGVnZXIoKS5yZWZlcmVuY2VzKCgpID0+IHVzZXJzVGFibGUuaWQpLm5vdE51bGwoKSxcbiAgICBuYW1lOiB2YXJjaGFyKHsgbGVuZ3RoOiAyNTUgfSkubm90TnVsbCgpLFxuICAgIGtleTogdmFyY2hhcih7IGxlbmd0aDogMjU1IH0pLm5vdE51bGwoKS51bmlxdWUoKSxcbiAgICBsYXN0VXNlZDogdGltZXN0YW1wKCkuZGVmYXVsdE5vdygpLFxuICAgIGNyZWF0ZWRBdDogdGltZXN0YW1wKCkuZGVmYXVsdE5vdygpLm5vdE51bGwoKSxcbiAgICBpc0FjdGl2ZTogYm9vbGVhbigpLmRlZmF1bHQodHJ1ZSkubm90TnVsbCgpLFxuICAgIHBsYW46IHZhcmNoYXIoeyBsZW5ndGg6IDIwIH0pLmRlZmF1bHQoJ2ZyZWUnKS5ub3ROdWxsKCksIC8vIGZyZWUgbyBwcm9cbiAgICByZXF1ZXN0c0NvdW50OiBpbnRlZ2VyKCkuZGVmYXVsdCgwKS5ub3ROdWxsKCksXG4gICAgcmVxdWVzdHNMaW1pdDogaW50ZWdlcigpLmRlZmF1bHQoMTApLm5vdE51bGwoKSxcbn0pO1xuXG5leHBvcnQgY29uc3QgYW5pbWVzVGFibGUgPSBwZ1RhYmxlKFwiYW5pbWVzXCIsIHtcbiAgICBpZDogaW50ZWdlcigpLnByaW1hcnlLZXkoKS5nZW5lcmF0ZWRBbHdheXNBc0lkZW50aXR5KCksXG4gICAgdGl0bGU6IHZhcmNoYXIoeyBsZW5ndGg6IDI1NSB9KS5ub3ROdWxsKCksXG4gICAgdHlwZTogdmFyY2hhcih7IGxlbmd0aDogNTAgfSksIC8vIFRWLCBNb3ZpZSwgT1ZBLCBldGMuXG4gICAgZXBpc29kZXM6IGludGVnZXIoKSxcbiAgICBzdGF0dXM6IHZhcmNoYXIoeyBsZW5ndGg6IDUwIH0pLCAvLyBGaW5pc2hlZCwgQ3VycmVudGx5IEFpcmluZywgZXRjLlxuICAgIGFuaW1lU2Vhc29uOiB2YXJjaGFyKHsgbGVuZ3RoOiA1MCB9KSwgLy8gU2Vhc29uIGluZm9cbiAgICBwaWN0dXJlOiB0ZXh0KCksIC8vIFVSTCB0byB0aGUgcGljdHVyZVxuICAgIHRodW1ibmFpbDogdGV4dCgpLCAvLyBVUkwgdG8gdGhlIHRodW1ibmFpbFxuICAgIHNvdXJjZXM6IHRleHQoKS5hcnJheSgpLCAvLyBBcnJheSBvZiBzb3VyY2UgVVJMc1xuICAgIHN5bm9ueW1zOiB0ZXh0KCkuYXJyYXkoKSwgLy8gQWx0ZXJuYXRpdmUgdGl0bGVzXG4gICAgcmVsYXRpb25zOiB0ZXh0KCkuYXJyYXkoKSwgLy8gUmVsYXRlZCBhbmltZSBVUkxzXG4gICAgdGFnczogdGV4dCgpLmFycmF5KCksIC8vIFRhZ3MvZ2VucmVzXG59KTsiXSwibmFtZXMiOlsiaW50ZWdlciIsInBnVGFibGUiLCJ2YXJjaGFyIiwidGV4dCIsInRpbWVzdGFtcCIsImJvb2xlYW4iLCJ1c2Vyc1RhYmxlIiwiaWQiLCJwcmltYXJ5S2V5IiwiZ2VuZXJhdGVkQWx3YXlzQXNJZGVudGl0eSIsIm5hbWUiLCJsZW5ndGgiLCJub3ROdWxsIiwiZW1haWwiLCJ1bmlxdWUiLCJhcGlLZXlzVGFibGUiLCJ1c2VySWQiLCJyZWZlcmVuY2VzIiwia2V5IiwibGFzdFVzZWQiLCJkZWZhdWx0Tm93IiwiY3JlYXRlZEF0IiwiaXNBY3RpdmUiLCJkZWZhdWx0IiwicGxhbiIsInJlcXVlc3RzQ291bnQiLCJyZXF1ZXN0c0xpbWl0IiwiYW5pbWVzVGFibGUiLCJ0aXRsZSIsInR5cGUiLCJlcGlzb2RlcyIsInN0YXR1cyIsImFuaW1lU2Vhc29uIiwicGljdHVyZSIsInRodW1ibmFpbCIsInNvdXJjZXMiLCJhcnJheSIsInN5bm9ueW1zIiwicmVsYXRpb25zIiwidGFncyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./configs/schema.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fkeys%2Froute&page=%2Fapi%2Fkeys%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fkeys%2Froute.ts&appDir=%2FUsers%2Frodrigoglodosindo%2FDesktop%2Fanime-api-main%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Frodrigoglodosindo%2FDesktop%2Fanime-api-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fkeys%2Froute&page=%2Fapi%2Fkeys%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fkeys%2Froute.ts&appDir=%2FUsers%2Frodrigoglodosindo%2FDesktop%2Fanime-api-main%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Frodrigoglodosindo%2FDesktop%2Fanime-api-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_rodrigoglodosindo_Desktop_anime_api_main_app_api_keys_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/keys/route.ts */ \"(rsc)/./app/api/keys/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/keys/route\",\n        pathname: \"/api/keys\",\n        filename: \"route\",\n        bundlePath: \"app/api/keys/route\"\n    },\n    resolvedPagePath: \"/Users/rodrigoglodosindo/Desktop/anime-api-main/app/api/keys/route.ts\",\n    nextConfigOutput,\n    userland: _Users_rodrigoglodosindo_Desktop_anime_api_main_app_api_keys_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZrZXlzJTJGcm91dGUmcGFnZT0lMkZhcGklMkZrZXlzJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGa2V5cyUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRnJvZHJpZ29nbG9kb3NpbmRvJTJGRGVza3RvcCUyRmFuaW1lLWFwaS1tYWluJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRnJvZHJpZ29nbG9kb3NpbmRvJTJGRGVza3RvcCUyRmFuaW1lLWFwaS1tYWluJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNxQjtBQUNsRztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL3JvZHJpZ29nbG9kb3NpbmRvL0Rlc2t0b3AvYW5pbWUtYXBpLW1haW4vYXBwL2FwaS9rZXlzL3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9rZXlzL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkva2V5c1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkva2V5cy9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9Vc2Vycy9yb2RyaWdvZ2xvZG9zaW5kby9EZXNrdG9wL2FuaW1lLWFwaS1tYWluL2FwcC9hcGkva2V5cy9yb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fkeys%2Froute&page=%2Fapi%2Fkeys%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fkeys%2Froute.ts&appDir=%2FUsers%2Frodrigoglodosindo%2FDesktop%2Fanime-api-main%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Frodrigoglodosindo%2FDesktop%2Fanime-api-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@clerk","vendor-chunks/tslib","vendor-chunks/cookie","vendor-chunks/map-obj","vendor-chunks/no-case","vendor-chunks/lower-case","vendor-chunks/snakecase-keys","vendor-chunks/snake-case","vendor-chunks/dot-case","vendor-chunks/drizzle-orm","vendor-chunks/@neondatabase","vendor-chunks/dotenv"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fkeys%2Froute&page=%2Fapi%2Fkeys%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fkeys%2Froute.ts&appDir=%2FUsers%2Frodrigoglodosindo%2FDesktop%2Fanime-api-main%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Frodrigoglodosindo%2FDesktop%2Fanime-api-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();