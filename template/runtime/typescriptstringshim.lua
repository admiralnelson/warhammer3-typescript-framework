
-- WEIRD lua 5.1 STRING IMPLEMENTATION. CAAAAAAAAAAAAAAAAAAAAAA!
out("typescript string shim is loaded!")
local originalFunction = string.find
string.find = function (string, pattern, init, plain)
    if init == nil then init = 1 end
    return originalFunction(string, pattern, init)
end