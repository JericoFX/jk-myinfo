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
   
    local licenses = lib.callback.await("jk-myinfo::server::getLicenses", false)
    SendNUIMessage({
        action = "open",
        data = {
            name = ("%s %s"):format(PlayerData.charinfo.firstname, PlayerData.charinfo.lastname),
            job = PlayerData.job.label,
            rank = PlayerData.job.grade.name,
            id = cache.serverId,
            licenses = licenses,
            open = true,
        }
    })
end, false)
RegisterNetEvent("jk-myInfo::client::infoPlayers",function(data) 
    SendNUIMessage({
        action="update",
        data = data
    })
end)


RegisterNUICallback('exit', function(data, cb)
    cb({})
end)
