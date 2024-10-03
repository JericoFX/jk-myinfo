local QBCore = exports["qb-core"]:GetCoreObject()
local PlayerData = {}

CreateThread(function()
    PlayerData = QBCore.Functions.GetPlayerData()
    SetNuiFocus(false, false)
end)

RegisterNetEvent('QBCore:Client:OnPlayerLoaded', function()
    PlayerData = QBCore.Functions.GetPlayerData()
end)

RegisterNetEvent('QBCore:Client:OnJobUpdate', function(job)
    PlayerData.job = job
end)

RegisterCommand("myInfo", function(source, args)
    local infoOnline = lib.callback.await("jk-myinfo::server::getPlayersOnline", false)
    -- SetNuiFocus(true, true)
    local licenses = lib.callback.await("jk-myinfo::server::getLicenses", false)

    SendNUIMessage({
        action = "open",
        data = {
            name = ("%s %s"):format(PlayerData.charinfo.firstname, PlayerData.charinfo.lastname),
            job = PlayerData.job.label,
            rank = PlayerData.job.grade.name,
            id = cache.serverId,
            licenses = licenses,
            onlinePlayers = {
                mechanics = infoOnline.mechanics.count,
                police = infoOnline.police.count,
                ems = infoOnline.ems.count,
            },
            open = true,
        }
    })
end, false)

RegisterNUICallback('close', function(data, cb)
    cb({})
    --SetNuiFocus(false, false)
end)
