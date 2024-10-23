local QBCore = exports["qb-core"]:GetCoreObject()
local PlayerData = {}
local open = false
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


local keybind = lib.addKeybind({
    name = 'myInfo',
    description = 'Muestra la informacion',
    defaultKey = 'F9',
    onPressed = function(self)
        local licenses = lib.callback.await("jk-myinfo::server::getLicenses", false)
        SendNUIMessage({
            action = "open",
            data = {
                name = ("%s %s"):format(PlayerData.charinfo.firstname, PlayerData.charinfo.lastname),
                job = PlayerData.job.label,
                rank = PlayerData.job.grade.name,
                id = cache.serverId,
                licenses = licenses,
                onlinePlayers = {},
                open = not open,
            }
        })
    end,
    onReleased = function(self)
        open = false
        SendNUIMessage({
            action = "exit",
            data = {}
        })
    end
})

RegisterNetEvent("jk-myinfo::client::updatePlayerOnline", function(data)
    if not source or source == "" then return end
    SendNUIMessage({
        action = "update",
        data = {
            onlinePlayers = data or {}
        }
    })
end)


RegisterNuiCallback('exit', function(data, cb)
    cb({})
end)
