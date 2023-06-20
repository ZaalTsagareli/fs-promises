"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var fs = require("fs");
var Exercise = /** @class */ (function () {
    function Exercise() {
    }
    Exercise.way1 = function (fileName, cb) {
        //creating text.txt
        fs.writeFile(fileName, "Hello", function (err) {
            fs.readFile(fileName, "utf-8", function (err, data) {
                if (err)
                    throw err;
                console.log(data);
                fs.appendFile(fileName, " There", function (err) {
                    if (err)
                        throw err;
                    fs.readFile(fileName, "utf-8", function (err, data) {
                        if (err)
                            throw err;
                        console.log(data);
                        cb(data);
                        fs.unlink(fileName, function (err) {
                            if (err)
                                throw err;
                        });
                    });
                });
            });
        });
    };
    Exercise.way2 = function (fileName, cb) {
        try {
            fs.writeFileSync(fileName, "Hello", "utf-8");
            var data = fs.readFileSync(fileName, "utf-8");
            console.log(data);
            fs.appendFileSync(fileName, " There", "utf-8");
            var newData = fs.readFileSync(fileName, "utf-8");
            console.log(newData);
            cb(newData);
            fs.unlinkSync(fileName);
        }
        catch (err) { }
    };
    Exercise.createFilePromise = function (fileName) {
        return new Promise(function (resolve, reject) {
            fs.writeFile(fileName, "hello", "utf-8", function (err) {
                if (err)
                    reject(err);
                resolve(true);
            });
        });
    };
    Exercise.appendFilePromise = function (fileName) {
        return new Promise(function (resolve, reject) {
            fs.appendFile(fileName, " There", function (err) {
                if (err)
                    reject(err);
                resolve(true);
            });
        });
    };
    Exercise.readFilePromise = function (fileName) {
        return new Promise(function (resolve, reject) {
            fs.readFile(fileName, "utf-8", function (err, data) {
                if (err)
                    reject(err);
                resolve(data);
            });
        });
    };
    Exercise.deleteFilePromise = function (fileName) {
        return new Promise(function (resolve, reject) {
            fs.unlink(fileName, function (err) {
                if (err)
                    reject(err);
                resolve(true);
            });
        });
    };
    Exercise.promisify = function (func) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return new Promise(function (resolve, reject) {
                func.apply(void 0, __spreadArray(__spreadArray([], args, false), [function (err, result) {
                        if (err)
                            reject(err);
                        resolve(result);
                    }], false));
            });
        };
    };
    return Exercise;
}());
var doExerciseWithPromiseChain = function () {
    Exercise.createFilePromise("test1.txt")
        .then(function () {
        return Exercise.readFilePromise("test1.txt");
    })
        .then(function (data) {
        console.log(data);
        return Exercise.appendFilePromise("test1.txt");
    })
        .then(function () {
        return Exercise.readFilePromise("test1.txt");
    })
        .then(function (data) {
        console.log(data);
        return Exercise.deleteFilePromise("test1.txt");
    })["catch"](function (err) {
        console.log(err);
    });
};
var doExerciseWithAsync = function () { return __awaiter(void 0, void 0, void 0, function () {
    var data, data1, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                return [4 /*yield*/, Exercise.createFilePromise("test.txt")];
            case 1:
                _a.sent();
                return [4 /*yield*/, Exercise.readFilePromise("test.txt")];
            case 2:
                data = _a.sent();
                console.log(data);
                return [4 /*yield*/, Exercise.appendFilePromise("test.txt")];
            case 3:
                _a.sent();
                return [4 /*yield*/, Exercise.readFilePromise("test.txt")];
            case 4:
                data1 = _a.sent();
                console.log(data1);
                return [4 /*yield*/, Exercise.deleteFilePromise("test.txt")];
            case 5:
                _a.sent();
                return [3 /*break*/, 7];
            case 6:
                err_1 = _a.sent();
                console.log(err_1);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
Exercise.way1("text.txt", function (data) {
    console.log(data, "result data");
});
Exercise.way2("zaali.txt", function (data) {
    console.log(data, "meore");
});
doExerciseWithPromiseChain();
doExerciseWithAsync();
var promisedFunc = Exercise.promisify(fs.writeFile);
promisedFunc("myPromise.txt", "hello").then(function (data) {
    console.log(data);
});
