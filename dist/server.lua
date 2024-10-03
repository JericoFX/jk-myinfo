local QBCore = exports["qb-core"]:GetCoreObject()

lib.callback.register("jk-myinfo::server::getPlayersOnline", function(source)
    local data = {}
    for k, v in pairs(Config.Jobs) do
        data[k] = {
            name = k,
            count = QBCore.Functions.GetPlayersOnDuty(tostring(k))[1] or 0
        }
    end
    return data
end)

lib.callback.register("jk-myinfo::server::getLicenses", function(source)
    local Player = QBCore.Functions.GetPlayer(source)
    local licences = {}
    for k, v in pairs(Player.PlayerData.metadata.licences) do
        licences[#licences + 1] = {
            name = k:upper(),
            status = v == true and "Valido" or "No Encontrada",
        }
    end
    table.sort(licences, function(a, b)
        return (a.status == "Valido" and b.status ~= "Valido") or (a.status ~= "Valido" and b.status == "Valido")
    end)
    return licences
end)
