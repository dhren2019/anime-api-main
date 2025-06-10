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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DELETE: () => (/* binding */ DELETE),\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _configs_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/configs/db */ \"(rsc)/./configs/db.tsx\");\n/* harmony import */ var _configs_schema__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/configs/schema */ \"(rsc)/./configs/schema.ts\");\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! crypto */ \"crypto\");\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var drizzle_orm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! drizzle-orm */ \"(rsc)/./node_modules/drizzle-orm/sql/expressions/conditions.js\");\n/* harmony import */ var _clerk_nextjs_server__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @clerk/nextjs/server */ \"(rsc)/./node_modules/@clerk/nextjs/dist/esm/app-router/server/currentUser.js\");\n\n\n\n\n\n\n// Generate a secure API key\nfunction generateApiKey() {\n    return `sk-${(0,crypto__WEBPACK_IMPORTED_MODULE_3__.randomBytes)(24).toString('hex')}`;\n}\n// Create new API key\nasync function POST(req) {\n    try {\n        const user = await (0,_clerk_nextjs_server__WEBPACK_IMPORTED_MODULE_4__.currentUser)();\n        if (!user || !user.primaryEmailAddress?.emailAddress) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        const { name } = await req.json();\n        // Get the user from our database\n        const dbUser = await _configs_db__WEBPACK_IMPORTED_MODULE_1__.db.select().from(_configs_schema__WEBPACK_IMPORTED_MODULE_2__.usersTable).where((0,drizzle_orm__WEBPACK_IMPORTED_MODULE_5__.eq)(_configs_schema__WEBPACK_IMPORTED_MODULE_2__.usersTable.email, user.primaryEmailAddress.emailAddress)).limit(1);\n        if (!dbUser.length) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"User not found\"\n            }, {\n                status: 404\n            });\n        }\n        const key = generateApiKey();\n        const apiKey = await _configs_db__WEBPACK_IMPORTED_MODULE_1__.db.insert(_configs_schema__WEBPACK_IMPORTED_MODULE_2__.apiKeysTable).values({\n            userId: dbUser[0].id,\n            name,\n            key,\n            createdAt: new Date(),\n            isActive: true\n        }).returning();\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            key: apiKey[0]\n        });\n    } catch (error) {\n        console.error('Error creating API key:', error, error?.message, JSON.stringify(error));\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: error?.message || JSON.stringify(error) || 'Internal Server Error'\n        }, {\n            status: 500\n        });\n    }\n}\n// Get all API keys for the user\nasync function GET() {\n    try {\n        const user = await (0,_clerk_nextjs_server__WEBPACK_IMPORTED_MODULE_4__.currentUser)();\n        console.log('Usuario Clerk:', user);\n        if (!user || !user.primaryEmailAddress?.emailAddress) {\n            console.log('No autenticado');\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        // Get the user from our database\n        const dbUser = await _configs_db__WEBPACK_IMPORTED_MODULE_1__.db.select().from(_configs_schema__WEBPACK_IMPORTED_MODULE_2__.usersTable).where((0,drizzle_orm__WEBPACK_IMPORTED_MODULE_5__.eq)(_configs_schema__WEBPACK_IMPORTED_MODULE_2__.usersTable.email, user.primaryEmailAddress.emailAddress)).limit(1);\n        console.log('Usuario en DB:', dbUser);\n        if (!dbUser.length) {\n            console.log('Usuario no encontrado en DB');\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"User not found\"\n            }, {\n                status: 404\n            });\n        }\n        const keys = await _configs_db__WEBPACK_IMPORTED_MODULE_1__.db.select().from(_configs_schema__WEBPACK_IMPORTED_MODULE_2__.apiKeysTable).where((0,drizzle_orm__WEBPACK_IMPORTED_MODULE_5__.eq)(_configs_schema__WEBPACK_IMPORTED_MODULE_2__.apiKeysTable.userId, dbUser[0].id));\n        console.log('API Keys encontradas:', keys);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            keys\n        });\n    } catch (error) {\n        console.error('Error fetching API keys:', error, error?.message, JSON.stringify(error));\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: error?.message || JSON.stringify(error) || 'Internal Server Error'\n        }, {\n            status: 500\n        });\n    }\n}\n// Delete an API key\nasync function DELETE(req) {\n    try {\n        const user = await (0,_clerk_nextjs_server__WEBPACK_IMPORTED_MODULE_4__.currentUser)();\n        if (!user || !user.primaryEmailAddress?.emailAddress) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        const { id } = await req.json();\n        // Get the user from our database\n        const dbUser = await _configs_db__WEBPACK_IMPORTED_MODULE_1__.db.select().from(_configs_schema__WEBPACK_IMPORTED_MODULE_2__.usersTable).where((0,drizzle_orm__WEBPACK_IMPORTED_MODULE_5__.eq)(_configs_schema__WEBPACK_IMPORTED_MODULE_2__.usersTable.email, user.primaryEmailAddress.emailAddress)).limit(1);\n        if (!dbUser.length) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"User not found\"\n            }, {\n                status: 404\n            });\n        }\n        await _configs_db__WEBPACK_IMPORTED_MODULE_1__.db.delete(_configs_schema__WEBPACK_IMPORTED_MODULE_2__.apiKeysTable).where((0,drizzle_orm__WEBPACK_IMPORTED_MODULE_5__.and)((0,drizzle_orm__WEBPACK_IMPORTED_MODULE_5__.eq)(_configs_schema__WEBPACK_IMPORTED_MODULE_2__.apiKeysTable.id, id), (0,drizzle_orm__WEBPACK_IMPORTED_MODULE_5__.eq)(_configs_schema__WEBPACK_IMPORTED_MODULE_2__.apiKeysTable.userId, dbUser[0].id)));\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true\n        });\n    } catch (error) {\n        console.error('Error deleting API key:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: error.message || 'Internal Server Error'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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WSxHQUNoRVUsS0FBSyxDQUFDO1FBRVQsSUFBSSxDQUFDTCxPQUFPTSxNQUFNLEVBQUU7WUFDbEIsT0FBT3pCLHFEQUFZQSxDQUFDZSxJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBaUIsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQ3RFO1FBRUEsTUFBTWhCLDJDQUFFQSxDQUNMNEMsTUFBTSxDQUFDM0MseURBQVlBLEVBQ25Cb0IsS0FBSyxDQUNKaEIsZ0RBQUdBLENBQ0RELCtDQUFFQSxDQUFDSCx5REFBWUEsQ0FBQzZCLEVBQUUsRUFBRUEsS0FDcEIxQiwrQ0FBRUEsQ0FBQ0gseURBQVlBLENBQUM0QixNQUFNLEVBQUVYLE1BQU0sQ0FBQyxFQUFFLENBQUNZLEVBQUU7UUFJMUMsT0FBTy9CLHFEQUFZQSxDQUFDZSxJQUFJLENBQUM7WUFBRXFCLFNBQVM7UUFBSztJQUMzQyxFQUFFLE9BQU9wQixPQUFZO1FBQ25CcUIsUUFBUXJCLEtBQUssQ0FBQywyQkFBMkJBO1FBQ3pDLE9BQU9oQixxREFBWUEsQ0FBQ2UsSUFBSSxDQUN0QjtZQUFFQyxPQUFPQSxNQUFNc0IsT0FBTyxJQUFJO1FBQXdCLEdBQ2xEO1lBQUVyQixRQUFRO1FBQUk7SUFFbEI7QUFDRiIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxST0RSSUdPXFxEZXNrdG9wXFxhbmltZS1hcGktbWFpblxcYXBwXFxhcGlcXGtleXNcXHJvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcclxuaW1wb3J0IHsgZGIgfSBmcm9tICdAL2NvbmZpZ3MvZGInO1xyXG5pbXBvcnQgeyBhcGlLZXlzVGFibGUsIHVzZXJzVGFibGUgfSBmcm9tICdAL2NvbmZpZ3Mvc2NoZW1hJztcclxuaW1wb3J0IHsgcmFuZG9tQnl0ZXMgfSBmcm9tICdjcnlwdG8nO1xyXG5pbXBvcnQgeyBlcSwgYW5kIH0gZnJvbSAnZHJpenpsZS1vcm0nO1xyXG5pbXBvcnQgeyBjdXJyZW50VXNlciB9IGZyb20gXCJAY2xlcmsvbmV4dGpzL3NlcnZlclwiO1xyXG5cclxuLy8gR2VuZXJhdGUgYSBzZWN1cmUgQVBJIGtleVxyXG5mdW5jdGlvbiBnZW5lcmF0ZUFwaUtleSgpIHtcclxuICByZXR1cm4gYHNrLSR7cmFuZG9tQnl0ZXMoMjQpLnRvU3RyaW5nKCdoZXgnKX1gO1xyXG59XHJcblxyXG4vLyBDcmVhdGUgbmV3IEFQSSBrZXlcclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxOiBSZXF1ZXN0KSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBjdXJyZW50VXNlcigpO1xyXG4gICAgXHJcbiAgICBpZiAoIXVzZXIgfHwgIXVzZXIucHJpbWFyeUVtYWlsQWRkcmVzcz8uZW1haWxBZGRyZXNzKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH0sIHsgc3RhdHVzOiA0MDEgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgeyBuYW1lIH0gPSBhd2FpdCByZXEuanNvbigpO1xyXG4gICAgXHJcbiAgICAvLyBHZXQgdGhlIHVzZXIgZnJvbSBvdXIgZGF0YWJhc2VcclxuICAgIGNvbnN0IGRiVXNlciA9IGF3YWl0IGRiXHJcbiAgICAgIC5zZWxlY3QoKVxyXG4gICAgICAuZnJvbSh1c2Vyc1RhYmxlKVxyXG4gICAgICAud2hlcmUoZXEodXNlcnNUYWJsZS5lbWFpbCwgdXNlci5wcmltYXJ5RW1haWxBZGRyZXNzLmVtYWlsQWRkcmVzcykpXHJcbiAgICAgIC5saW1pdCgxKTtcclxuXHJcbiAgICBpZiAoIWRiVXNlci5sZW5ndGgpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiVXNlciBub3QgZm91bmRcIiB9LCB7IHN0YXR1czogNDA0IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGtleSA9IGdlbmVyYXRlQXBpS2V5KCk7XHJcbiAgICBjb25zdCBhcGlLZXkgPSBhd2FpdCBkYi5pbnNlcnQoYXBpS2V5c1RhYmxlKS52YWx1ZXMoe1xyXG4gICAgICB1c2VySWQ6IGRiVXNlclswXS5pZCxcclxuICAgICAgbmFtZSxcclxuICAgICAga2V5LFxyXG4gICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKCksXHJcbiAgICAgIGlzQWN0aXZlOiB0cnVlXHJcbiAgICB9KS5yZXR1cm5pbmcoKTtcclxuXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBrZXk6IGFwaUtleVswXSB9KTtcclxuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBjcmVhdGluZyBBUEkga2V5OicsIGVycm9yLCBlcnJvcj8ubWVzc2FnZSwgSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgeyBlcnJvcjogZXJyb3I/Lm1lc3NhZ2UgfHwgSlNPTi5zdHJpbmdpZnkoZXJyb3IpIHx8ICdJbnRlcm5hbCBTZXJ2ZXIgRXJyb3InIH0sIFxyXG4gICAgICB7IHN0YXR1czogNTAwIH1cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBHZXQgYWxsIEFQSSBrZXlzIGZvciB0aGUgdXNlclxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKCkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgY3VycmVudFVzZXIoKTtcclxuICAgIGNvbnNvbGUubG9nKCdVc3VhcmlvIENsZXJrOicsIHVzZXIpO1xyXG5cclxuICAgIGlmICghdXNlciB8fCAhdXNlci5wcmltYXJ5RW1haWxBZGRyZXNzPy5lbWFpbEFkZHJlc3MpIHtcclxuICAgICAgY29uc29sZS5sb2coJ05vIGF1dGVudGljYWRvJyk7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH0sIHsgc3RhdHVzOiA0MDEgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gR2V0IHRoZSB1c2VyIGZyb20gb3VyIGRhdGFiYXNlXHJcbiAgICBjb25zdCBkYlVzZXIgPSBhd2FpdCBkYlxyXG4gICAgICAuc2VsZWN0KClcclxuICAgICAgLmZyb20odXNlcnNUYWJsZSlcclxuICAgICAgLndoZXJlKGVxKHVzZXJzVGFibGUuZW1haWwsIHVzZXIucHJpbWFyeUVtYWlsQWRkcmVzcy5lbWFpbEFkZHJlc3MpKVxyXG4gICAgICAubGltaXQoMSk7XHJcblxyXG4gICAgY29uc29sZS5sb2coJ1VzdWFyaW8gZW4gREI6JywgZGJVc2VyKTtcclxuXHJcbiAgICBpZiAoIWRiVXNlci5sZW5ndGgpIHtcclxuICAgICAgY29uc29sZS5sb2coJ1VzdWFyaW8gbm8gZW5jb250cmFkbyBlbiBEQicpO1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJVc2VyIG5vdCBmb3VuZFwiIH0sIHsgc3RhdHVzOiA0MDQgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qga2V5cyA9IGF3YWl0IGRiXHJcbiAgICAgIC5zZWxlY3QoKVxyXG4gICAgICAuZnJvbShhcGlLZXlzVGFibGUpXHJcbiAgICAgIC53aGVyZShlcShhcGlLZXlzVGFibGUudXNlcklkLCBkYlVzZXJbMF0uaWQpKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZygnQVBJIEtleXMgZW5jb250cmFkYXM6Jywga2V5cyk7XHJcblxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsga2V5cyB9KTtcclxuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBBUEkga2V5czonLCBlcnJvciwgZXJyb3I/Lm1lc3NhZ2UsIEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgIHsgZXJyb3I6IGVycm9yPy5tZXNzYWdlIHx8IEpTT04uc3RyaW5naWZ5KGVycm9yKSB8fCAnSW50ZXJuYWwgU2VydmVyIEVycm9yJyB9LCBcclxuICAgICAgeyBzdGF0dXM6IDUwMCB9XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuLy8gRGVsZXRlIGFuIEFQSSBrZXlcclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIERFTEVURShyZXE6IFJlcXVlc3QpIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IGN1cnJlbnRVc2VyKCk7XHJcbiAgICBcclxuICAgIGlmICghdXNlciB8fCAhdXNlci5wcmltYXJ5RW1haWxBZGRyZXNzPy5lbWFpbEFkZHJlc3MpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfSwgeyBzdGF0dXM6IDQwMSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB7IGlkIH0gPSBhd2FpdCByZXEuanNvbigpO1xyXG4gICAgXHJcbiAgICAvLyBHZXQgdGhlIHVzZXIgZnJvbSBvdXIgZGF0YWJhc2VcclxuICAgIGNvbnN0IGRiVXNlciA9IGF3YWl0IGRiXHJcbiAgICAgIC5zZWxlY3QoKVxyXG4gICAgICAuZnJvbSh1c2Vyc1RhYmxlKVxyXG4gICAgICAud2hlcmUoZXEodXNlcnNUYWJsZS5lbWFpbCwgdXNlci5wcmltYXJ5RW1haWxBZGRyZXNzLmVtYWlsQWRkcmVzcykpXHJcbiAgICAgIC5saW1pdCgxKTtcclxuXHJcbiAgICBpZiAoIWRiVXNlci5sZW5ndGgpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiVXNlciBub3QgZm91bmRcIiB9LCB7IHN0YXR1czogNDA0IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGF3YWl0IGRiXHJcbiAgICAgIC5kZWxldGUoYXBpS2V5c1RhYmxlKVxyXG4gICAgICAud2hlcmUoXHJcbiAgICAgICAgYW5kKFxyXG4gICAgICAgICAgZXEoYXBpS2V5c1RhYmxlLmlkLCBpZCksIFxyXG4gICAgICAgICAgZXEoYXBpS2V5c1RhYmxlLnVzZXJJZCwgZGJVc2VyWzBdLmlkKVxyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBzdWNjZXNzOiB0cnVlIH0pO1xyXG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGRlbGV0aW5nIEFQSSBrZXk6JywgZXJyb3IpO1xyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICB7IGVycm9yOiBlcnJvci5tZXNzYWdlIHx8ICdJbnRlcm5hbCBTZXJ2ZXIgRXJyb3InIH0sIFxyXG4gICAgICB7IHN0YXR1czogNTAwIH1cclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJkYiIsImFwaUtleXNUYWJsZSIsInVzZXJzVGFibGUiLCJyYW5kb21CeXRlcyIsImVxIiwiYW5kIiwiY3VycmVudFVzZXIiLCJnZW5lcmF0ZUFwaUtleSIsInRvU3RyaW5nIiwiUE9TVCIsInJlcSIsInVzZXIiLCJwcmltYXJ5RW1haWxBZGRyZXNzIiwiZW1haWxBZGRyZXNzIiwianNvbiIsImVycm9yIiwic3RhdHVzIiwibmFtZSIsImRiVXNlciIsInNlbGVjdCIsImZyb20iLCJ3aGVyZSIsImVtYWlsIiwibGltaXQiLCJsZW5ndGgiLCJrZXkiLCJhcGlLZXkiLCJpbnNlcnQiLCJ2YWx1ZXMiLCJ1c2VySWQiLCJpZCIsImNyZWF0ZWRBdCIsIkRhdGUiLCJpc0FjdGl2ZSIsInJldHVybmluZyIsInN1Y2Nlc3MiLCJjb25zb2xlIiwibWVzc2FnZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJHRVQiLCJsb2ciLCJrZXlzIiwiREVMRVRFIiwiZGVsZXRlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/keys/route.ts\n");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   animesTable: () => (/* binding */ animesTable),\n/* harmony export */   apiKeysTable: () => (/* binding */ apiKeysTable),\n/* harmony export */   usersTable: () => (/* binding */ usersTable)\n/* harmony export */ });\n/* harmony import */ var drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! drizzle-orm/pg-core */ \"(rsc)/./node_modules/drizzle-orm/pg-core/table.js\");\n/* harmony import */ var drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! drizzle-orm/pg-core */ \"(rsc)/./node_modules/drizzle-orm/pg-core/columns/integer.js\");\n/* harmony import */ var drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! drizzle-orm/pg-core */ \"(rsc)/./node_modules/drizzle-orm/pg-core/columns/varchar.js\");\n/* harmony import */ var drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! drizzle-orm/pg-core */ \"(rsc)/./node_modules/drizzle-orm/pg-core/columns/timestamp.js\");\n/* harmony import */ var drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! drizzle-orm/pg-core */ \"(rsc)/./node_modules/drizzle-orm/pg-core/columns/boolean.js\");\n/* harmony import */ var drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! drizzle-orm/pg-core */ \"(rsc)/./node_modules/drizzle-orm/pg-core/columns/text.js\");\n\nconst usersTable = (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_0__.pgTable)(\"users\", {\n    id: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_1__.integer)().primaryKey().generatedAlwaysAsIdentity(),\n    name: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.varchar)({\n        length: 255\n    }).notNull(),\n    email: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.varchar)({\n        length: 255\n    }).notNull().unique()\n});\nconst apiKeysTable = (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_0__.pgTable)(\"api_keys\", {\n    id: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_1__.integer)().primaryKey().generatedAlwaysAsIdentity(),\n    userId: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_1__.integer)().references(()=>usersTable.id).notNull(),\n    name: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.varchar)({\n        length: 255\n    }).notNull(),\n    key: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.varchar)({\n        length: 255\n    }).notNull().unique(),\n    lastUsed: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_3__.timestamp)().defaultNow(),\n    createdAt: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_3__.timestamp)().defaultNow().notNull(),\n    isActive: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_4__.boolean)().default(true).notNull()\n});\nconst animesTable = (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_0__.pgTable)(\"animes\", {\n    id: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_1__.integer)().primaryKey().generatedAlwaysAsIdentity(),\n    title: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.varchar)({\n        length: 255\n    }).notNull(),\n    type: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.varchar)({\n        length: 50\n    }),\n    episodes: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_1__.integer)(),\n    status: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.varchar)({\n        length: 50\n    }),\n    animeSeason: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.varchar)({\n        length: 50\n    }),\n    picture: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_5__.text)(),\n    thumbnail: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_5__.text)(),\n    sources: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_5__.text)().array(),\n    synonyms: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_5__.text)().array(),\n    relations: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_5__.text)().array(),\n    tags: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_5__.text)().array()\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9jb25maWdzL3NjaGVtYS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBMEY7QUFFbkYsTUFBTU0sYUFBYUwsNERBQU9BLENBQUMsU0FBUztJQUN2Q00sSUFBSVAsNERBQU9BLEdBQUdRLFVBQVUsR0FBR0MseUJBQXlCO0lBQ3BEQyxNQUFNUiw0REFBT0EsQ0FBQztRQUFFUyxRQUFRO0lBQUksR0FBR0MsT0FBTztJQUN0Q0MsT0FBT1gsNERBQU9BLENBQUM7UUFBRVMsUUFBUTtJQUFJLEdBQUdDLE9BQU8sR0FBR0UsTUFBTTtBQUNwRCxHQUFHO0FBRUksTUFBTUMsZUFBZWQsNERBQU9BLENBQUMsWUFBWTtJQUM1Q00sSUFBSVAsNERBQU9BLEdBQUdRLFVBQVUsR0FBR0MseUJBQXlCO0lBQ3BETyxRQUFRaEIsNERBQU9BLEdBQUdpQixVQUFVLENBQUMsSUFBTVgsV0FBV0MsRUFBRSxFQUFFSyxPQUFPO0lBQ3pERixNQUFNUiw0REFBT0EsQ0FBQztRQUFFUyxRQUFRO0lBQUksR0FBR0MsT0FBTztJQUN0Q00sS0FBS2hCLDREQUFPQSxDQUFDO1FBQUVTLFFBQVE7SUFBSSxHQUFHQyxPQUFPLEdBQUdFLE1BQU07SUFDOUNLLFVBQVVmLDhEQUFTQSxHQUFHZ0IsVUFBVTtJQUNoQ0MsV0FBV2pCLDhEQUFTQSxHQUFHZ0IsVUFBVSxHQUFHUixPQUFPO0lBQzNDVSxVQUFVakIsNERBQU9BLEdBQUdrQixPQUFPLENBQUMsTUFBTVgsT0FBTztBQUM3QyxHQUFHO0FBRUksTUFBTVksY0FBY3ZCLDREQUFPQSxDQUFDLFVBQVU7SUFDekNNLElBQUlQLDREQUFPQSxHQUFHUSxVQUFVLEdBQUdDLHlCQUF5QjtJQUNwRGdCLE9BQU92Qiw0REFBT0EsQ0FBQztRQUFFUyxRQUFRO0lBQUksR0FBR0MsT0FBTztJQUN2Q2MsTUFBTXhCLDREQUFPQSxDQUFDO1FBQUVTLFFBQVE7SUFBRztJQUMzQmdCLFVBQVUzQiw0REFBT0E7SUFDakI0QixRQUFRMUIsNERBQU9BLENBQUM7UUFBRVMsUUFBUTtJQUFHO0lBQzdCa0IsYUFBYTNCLDREQUFPQSxDQUFDO1FBQUVTLFFBQVE7SUFBRztJQUNsQ21CLFNBQVMzQix5REFBSUE7SUFDYjRCLFdBQVc1Qix5REFBSUE7SUFDZjZCLFNBQVM3Qix5REFBSUEsR0FBRzhCLEtBQUs7SUFDckJDLFVBQVUvQix5REFBSUEsR0FBRzhCLEtBQUs7SUFDdEJFLFdBQVdoQyx5REFBSUEsR0FBRzhCLEtBQUs7SUFDdkJHLE1BQU1qQyx5REFBSUEsR0FBRzhCLEtBQUs7QUFDdEIsR0FBRyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxST0RSSUdPXFxEZXNrdG9wXFxhbmltZS1hcGktbWFpblxcY29uZmlnc1xcc2NoZW1hLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGludGVnZXIsIHBnVGFibGUsIHZhcmNoYXIsIHRleHQsIHRpbWVzdGFtcCwgYm9vbGVhbiB9IGZyb20gXCJkcml6emxlLW9ybS9wZy1jb3JlXCI7XHJcblxyXG5leHBvcnQgY29uc3QgdXNlcnNUYWJsZSA9IHBnVGFibGUoXCJ1c2Vyc1wiLCB7XHJcbiAgICBpZDogaW50ZWdlcigpLnByaW1hcnlLZXkoKS5nZW5lcmF0ZWRBbHdheXNBc0lkZW50aXR5KCksXHJcbiAgICBuYW1lOiB2YXJjaGFyKHsgbGVuZ3RoOiAyNTUgfSkubm90TnVsbCgpLFxyXG4gICAgZW1haWw6IHZhcmNoYXIoeyBsZW5ndGg6IDI1NSB9KS5ub3ROdWxsKCkudW5pcXVlKCksXHJcbn0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IGFwaUtleXNUYWJsZSA9IHBnVGFibGUoXCJhcGlfa2V5c1wiLCB7XHJcbiAgICBpZDogaW50ZWdlcigpLnByaW1hcnlLZXkoKS5nZW5lcmF0ZWRBbHdheXNBc0lkZW50aXR5KCksXHJcbiAgICB1c2VySWQ6IGludGVnZXIoKS5yZWZlcmVuY2VzKCgpID0+IHVzZXJzVGFibGUuaWQpLm5vdE51bGwoKSxcclxuICAgIG5hbWU6IHZhcmNoYXIoeyBsZW5ndGg6IDI1NSB9KS5ub3ROdWxsKCksXHJcbiAgICBrZXk6IHZhcmNoYXIoeyBsZW5ndGg6IDI1NSB9KS5ub3ROdWxsKCkudW5pcXVlKCksXHJcbiAgICBsYXN0VXNlZDogdGltZXN0YW1wKCkuZGVmYXVsdE5vdygpLFxyXG4gICAgY3JlYXRlZEF0OiB0aW1lc3RhbXAoKS5kZWZhdWx0Tm93KCkubm90TnVsbCgpLFxyXG4gICAgaXNBY3RpdmU6IGJvb2xlYW4oKS5kZWZhdWx0KHRydWUpLm5vdE51bGwoKSxcclxufSk7XHJcblxyXG5leHBvcnQgY29uc3QgYW5pbWVzVGFibGUgPSBwZ1RhYmxlKFwiYW5pbWVzXCIsIHtcclxuICAgIGlkOiBpbnRlZ2VyKCkucHJpbWFyeUtleSgpLmdlbmVyYXRlZEFsd2F5c0FzSWRlbnRpdHkoKSxcclxuICAgIHRpdGxlOiB2YXJjaGFyKHsgbGVuZ3RoOiAyNTUgfSkubm90TnVsbCgpLFxyXG4gICAgdHlwZTogdmFyY2hhcih7IGxlbmd0aDogNTAgfSksIC8vIFRWLCBNb3ZpZSwgT1ZBLCBldGMuXHJcbiAgICBlcGlzb2RlczogaW50ZWdlcigpLFxyXG4gICAgc3RhdHVzOiB2YXJjaGFyKHsgbGVuZ3RoOiA1MCB9KSwgLy8gRmluaXNoZWQsIEN1cnJlbnRseSBBaXJpbmcsIGV0Yy5cclxuICAgIGFuaW1lU2Vhc29uOiB2YXJjaGFyKHsgbGVuZ3RoOiA1MCB9KSwgLy8gU2Vhc29uIGluZm9cclxuICAgIHBpY3R1cmU6IHRleHQoKSwgLy8gVVJMIHRvIHRoZSBwaWN0dXJlXHJcbiAgICB0aHVtYm5haWw6IHRleHQoKSwgLy8gVVJMIHRvIHRoZSB0aHVtYm5haWxcclxuICAgIHNvdXJjZXM6IHRleHQoKS5hcnJheSgpLCAvLyBBcnJheSBvZiBzb3VyY2UgVVJMc1xyXG4gICAgc3lub255bXM6IHRleHQoKS5hcnJheSgpLCAvLyBBbHRlcm5hdGl2ZSB0aXRsZXNcclxuICAgIHJlbGF0aW9uczogdGV4dCgpLmFycmF5KCksIC8vIFJlbGF0ZWQgYW5pbWUgVVJMc1xyXG4gICAgdGFnczogdGV4dCgpLmFycmF5KCksIC8vIFRhZ3MvZ2VucmVzXHJcbn0pOyJdLCJuYW1lcyI6WyJpbnRlZ2VyIiwicGdUYWJsZSIsInZhcmNoYXIiLCJ0ZXh0IiwidGltZXN0YW1wIiwiYm9vbGVhbiIsInVzZXJzVGFibGUiLCJpZCIsInByaW1hcnlLZXkiLCJnZW5lcmF0ZWRBbHdheXNBc0lkZW50aXR5IiwibmFtZSIsImxlbmd0aCIsIm5vdE51bGwiLCJlbWFpbCIsInVuaXF1ZSIsImFwaUtleXNUYWJsZSIsInVzZXJJZCIsInJlZmVyZW5jZXMiLCJrZXkiLCJsYXN0VXNlZCIsImRlZmF1bHROb3ciLCJjcmVhdGVkQXQiLCJpc0FjdGl2ZSIsImRlZmF1bHQiLCJhbmltZXNUYWJsZSIsInRpdGxlIiwidHlwZSIsImVwaXNvZGVzIiwic3RhdHVzIiwiYW5pbWVTZWFzb24iLCJwaWN0dXJlIiwidGh1bWJuYWlsIiwic291cmNlcyIsImFycmF5Iiwic3lub255bXMiLCJyZWxhdGlvbnMiLCJ0YWdzIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./configs/schema.ts\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/@clerk","vendor-chunks/next","vendor-chunks/tslib","vendor-chunks/cookie","vendor-chunks/map-obj","vendor-chunks/no-case","vendor-chunks/lower-case","vendor-chunks/snakecase-keys","vendor-chunks/snake-case","vendor-chunks/dot-case","vendor-chunks/drizzle-orm","vendor-chunks/dotenv","vendor-chunks/@neondatabase"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fkeys%2Froute&page=%2Fapi%2Fkeys%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fkeys%2Froute.ts&appDir=C%3A%5CUsers%5CRODRIGO%5CDesktop%5Canime-api-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CRODRIGO%5CDesktop%5Canime-api-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();