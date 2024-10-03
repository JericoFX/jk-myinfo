local QBCore = exports["qb-core"]:GetCoreObject()
local PlayerData = {}

CreateThread(function()
    if QBCore then
        PlayerData = QBCore.Functions.GetPlayerData()
        SetNuiFocus(false, false)
    end
end)

RegisterNetEvent('QBCore:Client:OnPlayerLoaded', function()
    PlayerData = QBCore.Functions.GetPlayerData()
end)

RegisterNetEvent('QBCore:Client:OnJobUpdate', function(job)
    PlayerData.job = job
end)

RegisterCommand("myInfo", function(source, args)
    local infoOnline = lib.callback.await("jk-myinfo::server::getPlayersOnline", 200)
    local licenses = lib.callback.await("jk-myinfo::server::getLicenses", false)
    SendNUIMessage({
        action = "open",
        data = {
            name = ("%s %s"):format(PlayerData.charinfo.firstname, PlayerData.charinfo.lastname),
            job = PlayerData.job.label,
            rank = PlayerData.job.grade.name,
            id = cache.serverId,
            licenses = licenses,
            onlinePlayers = infoOnline,
            open = true,
        }
    })
end, false)
RegisterNetEvent("jk-myinfo::client::updatePlayerOnline",function(data) 
    local onlinePlayers = lib.callback.await("jk-myinfo::server::getPlayersOnline", 200)
    SendNUIMessage({
        action="update",
        data = onlinePlayers
    })
end)


RegisterNUICallback('exit', function(data, cb)
    cb({})
end)
