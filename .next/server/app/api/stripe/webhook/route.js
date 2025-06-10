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
exports.id = "app/api/stripe/webhook/route";
exports.ids = ["app/api/stripe/webhook/route"];
exports.modules = {

/***/ "(rsc)/./app/api/stripe/webhook/route.ts":
/*!*****************************************!*\
  !*** ./app/api/stripe/webhook/route.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var stripe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! stripe */ \"(rsc)/./node_modules/stripe/esm/stripe.esm.node.js\");\n/* harmony import */ var _configs_db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/configs/db */ \"(rsc)/./configs/db.tsx\");\n/* harmony import */ var _configs_schema__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/configs/schema */ \"(rsc)/./configs/schema.ts\");\n/* harmony import */ var drizzle_orm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! drizzle-orm */ \"(rsc)/./node_modules/drizzle-orm/sql/expressions/conditions.js\");\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! crypto */ \"crypto\");\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\n\nconst stripe = new stripe__WEBPACK_IMPORTED_MODULE_1__[\"default\"](process.env.STRIPE_SECRET_KEY, {\n    apiVersion: '2025-05-28.basil'\n});\n// Generate a secure API key (moved here for direct use in webhook)\nfunction generateApiKey() {\n    return `sk-${(0,crypto__WEBPACK_IMPORTED_MODULE_4__.randomBytes)(24).toString('hex')}`;\n}\nasync function POST(req) {\n    console.log('STRIPE_WEBHOOK_SECRET en webhook:', process.env.STRIPE_WEBHOOK_SECRET ? 'Cargada' : 'No cargada');\n    const sig = req.headers.get('stripe-signature');\n    const body = await req.text();\n    let event;\n    try {\n        event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);\n    } catch (err) {\n        console.error('Error de verificación de la firma del webhook:', err.message);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Webhook Error: Invalid signature'\n        }, {\n            status: 400\n        });\n    }\n    // Manejar el evento de sesión de checkout completada\n    if (event.type === 'checkout.session.completed') {\n        const session = event.data.object;\n        const userEmail = session.customer_details?.email;\n        const userIdFromMetadata = session.metadata?.userId; // Si pasaste userId en metadata\n        if (!userEmail && !userIdFromMetadata) {\n            console.error('Webhook: No se encontró email ni userId en la sesión de checkout.');\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Missing user info'\n            }, {\n                status: 400\n            });\n        }\n        try {\n            let dbUser;\n            if (userEmail) {\n                dbUser = await _configs_db__WEBPACK_IMPORTED_MODULE_2__.db.select().from(_configs_schema__WEBPACK_IMPORTED_MODULE_3__.usersTable).where((0,drizzle_orm__WEBPACK_IMPORTED_MODULE_5__.eq)(_configs_schema__WEBPACK_IMPORTED_MODULE_3__.usersTable.email, userEmail)).limit(1);\n            } else if (userIdFromMetadata) {\n                // Asumiendo que userIdFromMetadata es un string que representa un número\n                dbUser = await _configs_db__WEBPACK_IMPORTED_MODULE_2__.db.select().from(_configs_schema__WEBPACK_IMPORTED_MODULE_3__.usersTable).where((0,drizzle_orm__WEBPACK_IMPORTED_MODULE_5__.eq)(_configs_schema__WEBPACK_IMPORTED_MODULE_3__.usersTable.id, parseInt(userIdFromMetadata))).limit(1);\n            }\n            if (!dbUser || !dbUser.length) {\n                console.error('Webhook: Usuario no encontrado en la base de datos para email/userId', userEmail, userIdFromMetadata);\n                return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                    error: 'User not found in DB'\n                }, {\n                    status: 404\n                });\n            }\n            const existingApiKey = await _configs_db__WEBPACK_IMPORTED_MODULE_2__.db.select().from(_configs_schema__WEBPACK_IMPORTED_MODULE_3__.apiKeysTable).where((0,drizzle_orm__WEBPACK_IMPORTED_MODULE_5__.eq)(_configs_schema__WEBPACK_IMPORTED_MODULE_3__.apiKeysTable.userId, dbUser[0].id)).limit(1);\n            if (existingApiKey.length) {\n                await _configs_db__WEBPACK_IMPORTED_MODULE_2__.db.update(_configs_schema__WEBPACK_IMPORTED_MODULE_3__.apiKeysTable).set({\n                    plan: 'pro',\n                    requestsLimit: 150\n                }).where((0,drizzle_orm__WEBPACK_IMPORTED_MODULE_5__.eq)(_configs_schema__WEBPACK_IMPORTED_MODULE_3__.apiKeysTable.userId, dbUser[0].id));\n                console.log(`Usuario ${userEmail} (ID: ${dbUser[0].id}) actualizado a plan PRO.`);\n            } else {\n                // Si no existe una API Key, crear una nueva con el plan PRO\n                const newApiKey = generateApiKey();\n                await _configs_db__WEBPACK_IMPORTED_MODULE_2__.db.insert(_configs_schema__WEBPACK_IMPORTED_MODULE_3__.apiKeysTable).values({\n                    userId: dbUser[0].id,\n                    name: 'Pro Plan Key',\n                    key: newApiKey,\n                    plan: 'pro',\n                    requestsCount: 0,\n                    requestsLimit: 150,\n                    lastUsed: new Date(),\n                    createdAt: new Date()\n                });\n                console.log(`Webhook: Se creó una nueva API Key para el usuario ${userEmail} (ID: ${dbUser[0].id}) con plan PRO.`);\n            }\n        } catch (error) {\n            console.error('Error al actualizar el plan del usuario:', error);\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Failed to update user plan'\n            }, {\n                status: 500\n            });\n        }\n    }\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        received: true\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFHLENBQUM7b0JBQUVDLE1BQU07b0JBQU9DLGVBQWU7Z0JBQUksR0FDdENULEtBQUssQ0FBQ3hDLCtDQUFFQSxDQUFDRix5REFBWUEsQ0FBQ3NDLE1BQU0sRUFBRUMsTUFBTSxDQUFDLEVBQUUsQ0FBQ0ssRUFBRTtnQkFDN0MvQixRQUFRQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUVtQixVQUFVLE1BQU0sRUFBRU0sTUFBTSxDQUFDLEVBQUUsQ0FBQ0ssRUFBRSxDQUFDLHlCQUF5QixDQUFDO1lBQ2xGLE9BQU87Z0JBQ0wsNERBQTREO2dCQUM1RCxNQUFNUSxZQUFZM0M7Z0JBQ2xCLE1BQU1WLDJDQUFFQSxDQUFDc0QsTUFBTSxDQUFDckQseURBQVlBLEVBQUVzRCxNQUFNLENBQUM7b0JBQ25DaEIsUUFBUUMsTUFBTSxDQUFDLEVBQUUsQ0FBQ0ssRUFBRTtvQkFDcEJXLE1BQU07b0JBQ05DLEtBQUtKO29CQUNMRixNQUFNO29CQUNOTyxlQUFlO29CQUNmTixlQUFlO29CQUNmTyxVQUFVLElBQUlDO29CQUNkQyxXQUFXLElBQUlEO2dCQUNqQjtnQkFDQTlDLFFBQVFDLEdBQUcsQ0FBQyxDQUFDLG1EQUFtRCxFQUFFbUIsVUFBVSxNQUFNLEVBQUVNLE1BQU0sQ0FBQyxFQUFFLENBQUNLLEVBQUUsQ0FBQyxlQUFlLENBQUM7WUFDbkg7UUFFRixFQUFFLE9BQU9uQixPQUFPO1lBQ2RaLFFBQVFZLEtBQUssQ0FBQyw0Q0FBNENBO1lBQzFELE9BQU81QixxREFBWUEsQ0FBQzhCLElBQUksQ0FBQztnQkFBRUYsT0FBTztZQUE2QixHQUFHO2dCQUFFRyxRQUFRO1lBQUk7UUFDbEY7SUFDRjtJQUVBLE9BQU8vQixxREFBWUEsQ0FBQzhCLElBQUksQ0FBQztRQUFFa0MsVUFBVTtJQUFLO0FBQzVDIiwic291cmNlcyI6WyIvVXNlcnMvcm9kcmlnb2dsb2Rvc2luZG8vRGVza3RvcC9hbmltZS1hcGktbWFpbi9hcHAvYXBpL3N0cmlwZS93ZWJob29rL3JvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcbmltcG9ydCBTdHJpcGUgZnJvbSAnc3RyaXBlJztcbmltcG9ydCB7IGRiIH0gZnJvbSAnQC9jb25maWdzL2RiJztcbmltcG9ydCB7IGFwaUtleXNUYWJsZSwgdXNlcnNUYWJsZSB9IGZyb20gJ0AvY29uZmlncy9zY2hlbWEnO1xuaW1wb3J0IHsgZXEgfSBmcm9tICdkcml6emxlLW9ybSc7XG5pbXBvcnQgeyByYW5kb21CeXRlcyB9IGZyb20gJ2NyeXB0byc7XG5cbmNvbnN0IHN0cmlwZSA9IG5ldyBTdHJpcGUocHJvY2Vzcy5lbnYuU1RSSVBFX1NFQ1JFVF9LRVkhLCB7IGFwaVZlcnNpb246ICcyMDI1LTA1LTI4LmJhc2lsJyB9KTtcblxuLy8gR2VuZXJhdGUgYSBzZWN1cmUgQVBJIGtleSAobW92ZWQgaGVyZSBmb3IgZGlyZWN0IHVzZSBpbiB3ZWJob29rKVxuZnVuY3Rpb24gZ2VuZXJhdGVBcGlLZXkoKSB7XG4gIHJldHVybiBgc2stJHtyYW5kb21CeXRlcygyNCkudG9TdHJpbmcoJ2hleCcpfWA7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcTogUmVxdWVzdCkge1xuICBjb25zb2xlLmxvZygnU1RSSVBFX1dFQkhPT0tfU0VDUkVUIGVuIHdlYmhvb2s6JywgcHJvY2Vzcy5lbnYuU1RSSVBFX1dFQkhPT0tfU0VDUkVUID8gJ0NhcmdhZGEnIDogJ05vIGNhcmdhZGEnKTtcbiAgY29uc3Qgc2lnID0gcmVxLmhlYWRlcnMuZ2V0KCdzdHJpcGUtc2lnbmF0dXJlJykhO1xuICBjb25zdCBib2R5ID0gYXdhaXQgcmVxLnRleHQoKTtcblxuICBsZXQgZXZlbnQ6IFN0cmlwZS5FdmVudDtcbiAgdHJ5IHtcbiAgICBldmVudCA9IHN0cmlwZS53ZWJob29rcy5jb25zdHJ1Y3RFdmVudChib2R5LCBzaWcsIHByb2Nlc3MuZW52LlNUUklQRV9XRUJIT09LX1NFQ1JFVCEpO1xuICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGRlIHZlcmlmaWNhY2nDs24gZGUgbGEgZmlybWEgZGVsIHdlYmhvb2s6JywgZXJyLm1lc3NhZ2UpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnV2ViaG9vayBFcnJvcjogSW52YWxpZCBzaWduYXR1cmUnIH0sIHsgc3RhdHVzOiA0MDAgfSk7XG4gIH1cblxuICAvLyBNYW5lamFyIGVsIGV2ZW50byBkZSBzZXNpw7NuIGRlIGNoZWNrb3V0IGNvbXBsZXRhZGFcbiAgaWYgKGV2ZW50LnR5cGUgPT09ICdjaGVja291dC5zZXNzaW9uLmNvbXBsZXRlZCcpIHtcbiAgICBjb25zdCBzZXNzaW9uID0gZXZlbnQuZGF0YS5vYmplY3QgYXMgU3RyaXBlLkNoZWNrb3V0LlNlc3Npb247XG5cbiAgICBjb25zdCB1c2VyRW1haWwgPSBzZXNzaW9uLmN1c3RvbWVyX2RldGFpbHM/LmVtYWlsO1xuICAgIGNvbnN0IHVzZXJJZEZyb21NZXRhZGF0YSA9IHNlc3Npb24ubWV0YWRhdGE/LnVzZXJJZDsgLy8gU2kgcGFzYXN0ZSB1c2VySWQgZW4gbWV0YWRhdGFcblxuICAgIGlmICghdXNlckVtYWlsICYmICF1c2VySWRGcm9tTWV0YWRhdGEpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1dlYmhvb2s6IE5vIHNlIGVuY29udHLDsyBlbWFpbCBuaSB1c2VySWQgZW4gbGEgc2VzacOzbiBkZSBjaGVja291dC4nKTtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnTWlzc2luZyB1c2VyIGluZm8nIH0sIHsgc3RhdHVzOiA0MDAgfSk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGxldCBkYlVzZXI7XG4gICAgICBpZiAodXNlckVtYWlsKSB7XG4gICAgICAgIGRiVXNlciA9IGF3YWl0IGRiLnNlbGVjdCgpLmZyb20odXNlcnNUYWJsZSkud2hlcmUoZXEodXNlcnNUYWJsZS5lbWFpbCwgdXNlckVtYWlsKSkubGltaXQoMSk7XG4gICAgICB9IGVsc2UgaWYgKHVzZXJJZEZyb21NZXRhZGF0YSkge1xuICAgICAgICAvLyBBc3VtaWVuZG8gcXVlIHVzZXJJZEZyb21NZXRhZGF0YSBlcyB1biBzdHJpbmcgcXVlIHJlcHJlc2VudGEgdW4gbsO6bWVyb1xuICAgICAgICBkYlVzZXIgPSBhd2FpdCBkYi5zZWxlY3QoKS5mcm9tKHVzZXJzVGFibGUpLndoZXJlKGVxKHVzZXJzVGFibGUuaWQsIHBhcnNlSW50KHVzZXJJZEZyb21NZXRhZGF0YSkpKS5saW1pdCgxKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFkYlVzZXIgfHwgIWRiVXNlci5sZW5ndGgpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignV2ViaG9vazogVXN1YXJpbyBubyBlbmNvbnRyYWRvIGVuIGxhIGJhc2UgZGUgZGF0b3MgcGFyYSBlbWFpbC91c2VySWQnLCB1c2VyRW1haWwsIHVzZXJJZEZyb21NZXRhZGF0YSk7XG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnVXNlciBub3QgZm91bmQgaW4gREInIH0sIHsgc3RhdHVzOiA0MDQgfSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGV4aXN0aW5nQXBpS2V5ID0gYXdhaXQgZGIuc2VsZWN0KClcbiAgICAgICAgLmZyb20oYXBpS2V5c1RhYmxlKVxuICAgICAgICAud2hlcmUoZXEoYXBpS2V5c1RhYmxlLnVzZXJJZCwgZGJVc2VyWzBdLmlkKSlcbiAgICAgICAgLmxpbWl0KDEpO1xuXG4gICAgICBpZiAoZXhpc3RpbmdBcGlLZXkubGVuZ3RoKSB7XG4gICAgICAgIGF3YWl0IGRiLnVwZGF0ZShhcGlLZXlzVGFibGUpXG4gICAgICAgICAgLnNldCh7IHBsYW46ICdwcm8nLCByZXF1ZXN0c0xpbWl0OiAxNTAgfSlcbiAgICAgICAgICAud2hlcmUoZXEoYXBpS2V5c1RhYmxlLnVzZXJJZCwgZGJVc2VyWzBdLmlkKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBVc3VhcmlvICR7dXNlckVtYWlsfSAoSUQ6ICR7ZGJVc2VyWzBdLmlkfSkgYWN0dWFsaXphZG8gYSBwbGFuIFBSTy5gKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFNpIG5vIGV4aXN0ZSB1bmEgQVBJIEtleSwgY3JlYXIgdW5hIG51ZXZhIGNvbiBlbCBwbGFuIFBST1xuICAgICAgICBjb25zdCBuZXdBcGlLZXkgPSBnZW5lcmF0ZUFwaUtleSgpO1xuICAgICAgICBhd2FpdCBkYi5pbnNlcnQoYXBpS2V5c1RhYmxlKS52YWx1ZXMoe1xuICAgICAgICAgIHVzZXJJZDogZGJVc2VyWzBdLmlkLFxuICAgICAgICAgIG5hbWU6ICdQcm8gUGxhbiBLZXknLCAvLyBOb21icmUgcG9yIGRlZmVjdG8gcGFyYSBsYSBudWV2YSBjbGF2ZSBQUk9cbiAgICAgICAgICBrZXk6IG5ld0FwaUtleSxcbiAgICAgICAgICBwbGFuOiAncHJvJyxcbiAgICAgICAgICByZXF1ZXN0c0NvdW50OiAwLFxuICAgICAgICAgIHJlcXVlc3RzTGltaXQ6IDE1MCxcbiAgICAgICAgICBsYXN0VXNlZDogbmV3IERhdGUoKSxcbiAgICAgICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKCksXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyhgV2ViaG9vazogU2UgY3Jlw7MgdW5hIG51ZXZhIEFQSSBLZXkgcGFyYSBlbCB1c3VhcmlvICR7dXNlckVtYWlsfSAoSUQ6ICR7ZGJVc2VyWzBdLmlkfSkgY29uIHBsYW4gUFJPLmApO1xuICAgICAgfVxuICAgICAgXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGFsIGFjdHVhbGl6YXIgZWwgcGxhbiBkZWwgdXN1YXJpbzonLCBlcnJvcik7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ0ZhaWxlZCB0byB1cGRhdGUgdXNlciBwbGFuJyB9LCB7IHN0YXR1czogNTAwIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IHJlY2VpdmVkOiB0cnVlIH0pO1xufSAiXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiU3RyaXBlIiwiZGIiLCJhcGlLZXlzVGFibGUiLCJ1c2Vyc1RhYmxlIiwiZXEiLCJyYW5kb21CeXRlcyIsInN0cmlwZSIsInByb2Nlc3MiLCJlbnYiLCJTVFJJUEVfU0VDUkVUX0tFWSIsImFwaVZlcnNpb24iLCJnZW5lcmF0ZUFwaUtleSIsInRvU3RyaW5nIiwiUE9TVCIsInJlcSIsImNvbnNvbGUiLCJsb2ciLCJTVFJJUEVfV0VCSE9PS19TRUNSRVQiLCJzaWciLCJoZWFkZXJzIiwiZ2V0IiwiYm9keSIsInRleHQiLCJldmVudCIsIndlYmhvb2tzIiwiY29uc3RydWN0RXZlbnQiLCJlcnIiLCJlcnJvciIsIm1lc3NhZ2UiLCJqc29uIiwic3RhdHVzIiwidHlwZSIsInNlc3Npb24iLCJkYXRhIiwib2JqZWN0IiwidXNlckVtYWlsIiwiY3VzdG9tZXJfZGV0YWlscyIsImVtYWlsIiwidXNlcklkRnJvbU1ldGFkYXRhIiwibWV0YWRhdGEiLCJ1c2VySWQiLCJkYlVzZXIiLCJzZWxlY3QiLCJmcm9tIiwid2hlcmUiLCJsaW1pdCIsImlkIiwicGFyc2VJbnQiLCJsZW5ndGgiLCJleGlzdGluZ0FwaUtleSIsInVwZGF0ZSIsInNldCIsInBsYW4iLCJyZXF1ZXN0c0xpbWl0IiwibmV3QXBpS2V5IiwiaW5zZXJ0IiwidmFsdWVzIiwibmFtZSIsImtleSIsInJlcXVlc3RzQ291bnQiLCJsYXN0VXNlZCIsIkRhdGUiLCJjcmVhdGVkQXQiLCJyZWNlaXZlZCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/stripe/webhook/route.ts\n");

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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fstripe%2Fwebhook%2Froute&page=%2Fapi%2Fstripe%2Fwebhook%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fstripe%2Fwebhook%2Froute.ts&appDir=%2FUsers%2Frodrigoglodosindo%2FDesktop%2Fanime-api-main%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Frodrigoglodosindo%2FDesktop%2Fanime-api-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fstripe%2Fwebhook%2Froute&page=%2Fapi%2Fstripe%2Fwebhook%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fstripe%2Fwebhook%2Froute.ts&appDir=%2FUsers%2Frodrigoglodosindo%2FDesktop%2Fanime-api-main%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Frodrigoglodosindo%2FDesktop%2Fanime-api-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_rodrigoglodosindo_Desktop_anime_api_main_app_api_stripe_webhook_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/stripe/webhook/route.ts */ \"(rsc)/./app/api/stripe/webhook/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/stripe/webhook/route\",\n        pathname: \"/api/stripe/webhook\",\n        filename: \"route\",\n        bundlePath: \"app/api/stripe/webhook/route\"\n    },\n    resolvedPagePath: \"/Users/rodrigoglodosindo/Desktop/anime-api-main/app/api/stripe/webhook/route.ts\",\n    nextConfigOutput,\n    userland: _Users_rodrigoglodosindo_Desktop_anime_api_main_app_api_stripe_webhook_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZzdHJpcGUlMkZ3ZWJob29rJTJGcm91dGUmcGFnZT0lMkZhcGklMkZzdHJpcGUlMkZ3ZWJob29rJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGc3RyaXBlJTJGd2ViaG9vayUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRnJvZHJpZ29nbG9kb3NpbmRvJTJGRGVza3RvcCUyRmFuaW1lLWFwaS1tYWluJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRnJvZHJpZ29nbG9kb3NpbmRvJTJGRGVza3RvcCUyRmFuaW1lLWFwaS1tYWluJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUMrQjtBQUM1RztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL3JvZHJpZ29nbG9kb3NpbmRvL0Rlc2t0b3AvYW5pbWUtYXBpLW1haW4vYXBwL2FwaS9zdHJpcGUvd2ViaG9vay9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvc3RyaXBlL3dlYmhvb2svcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9zdHJpcGUvd2ViaG9va1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvc3RyaXBlL3dlYmhvb2svcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvcm9kcmlnb2dsb2Rvc2luZG8vRGVza3RvcC9hbmltZS1hcGktbWFpbi9hcHAvYXBpL3N0cmlwZS93ZWJob29rL3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fstripe%2Fwebhook%2Froute&page=%2Fapi%2Fstripe%2Fwebhook%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fstripe%2Fwebhook%2Froute.ts&appDir=%2FUsers%2Frodrigoglodosindo%2FDesktop%2Fanime-api-main%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Frodrigoglodosindo%2FDesktop%2Fanime-api-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

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

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/get-intrinsic","vendor-chunks/has-symbols","vendor-chunks/function-bind","vendor-chunks/get-proto","vendor-chunks/call-bind-apply-helpers","vendor-chunks/dunder-proto","vendor-chunks/math-intrinsics","vendor-chunks/es-errors","vendor-chunks/gopd","vendor-chunks/es-define-property","vendor-chunks/hasown","vendor-chunks/es-object-atoms","vendor-chunks/drizzle-orm","vendor-chunks/@neondatabase","vendor-chunks/dotenv","vendor-chunks/stripe","vendor-chunks/qs","vendor-chunks/object-inspect","vendor-chunks/side-channel-list","vendor-chunks/side-channel-weakmap","vendor-chunks/side-channel-map","vendor-chunks/side-channel","vendor-chunks/call-bound"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fstripe%2Fwebhook%2Froute&page=%2Fapi%2Fstripe%2Fwebhook%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fstripe%2Fwebhook%2Froute.ts&appDir=%2FUsers%2Frodrigoglodosindo%2FDesktop%2Fanime-api-main%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Frodrigoglodosindo%2FDesktop%2Fanime-api-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();