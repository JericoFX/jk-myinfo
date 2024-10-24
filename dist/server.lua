local QBCore = exports["qb-core"]:GetCoreObject()
local data = {}

CreateThread(function()
    while true do
        Wait(5000)
        for k, v in pairs(Config.Jobs) do
            data[#data + 1] = {
                name = k,
                count = QBCore.Functions.GetDutyCount(tostring(k))
            }
        end
        TriggerClientEvent("jk-myinfo::client::updatePlayerOnline", -1, data)
        table.wipe(data)
    end
end)


local function GetLicences(source)
    local Player = QBCore.Functions.GetPlayer(source)
    local licences = {}
    for k, v in pairs(Player.PlayerData.metadata.licences) do
        licences[#licences + 1] = {
            name = k:upper(),
            status = v == true and "Valido" or "No Encontrada",
        }
    end
    table.sort(licences, function(a, b)
        if (a.status == "Valido" and b.status ~= "Valido") then
            return true
        elseif a.status ~= "Valido" and b.status == "Valido" then
            return false
        else
            return a.name < b.name
        end
    end)
    return licences
end

lib.callback.register("jk-myinfo::server::getLicenses", function(source)
    return GetLicences(source)
end)
