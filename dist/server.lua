local QBCore = exports["qb-core"]:GetCoreObject()
local data = {}

-- lib.cron.new("* * * * *",function() 
--  for k, v in pairs(Config.Jobs) do
--         data[k] = {
--             name = k,
--             count = QBCore.Functions.GetPlayersOnDuty(tostring(k))[1] or 0
--         }
--     end
    
-- end,{
--     debug = true
-- })
CreateThread(function() 
    while true do
        Wait(5000)
        for k, v in pairs(Config.Jobs) do
               data[k] = {
                   name = k,
                   count = QBCore.Functions.GetPlayersOnDuty(tostring(k))[1] or 0
               }
        end
        TriggerClientEvent("jk-myInfo::client::infoPlayers",-1,data)
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