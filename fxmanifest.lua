name 'JK MYINFO'
author 'Johann Krauss (JericoFX)'
version '0.0.0'
fx_version 'cerulean'
game 'gta5'
ui_page 'dist/web/index.html'
lua54 'yes'

files {
	'locales/*.json',
	'dist/web/assets/index.css',
	'dist/web/assets/index.js',
	'dist/web/index.html',
	'dist/web/vite.svg',
	'locales/en.json',
}
shared_scripts { "@ox_lib/init.lua", "config.lua" }
dependencies {
	'/server:7290',
	'/onesync',
}

client_scripts {
	'dist/client.lua',
}

server_scripts {
	'dist/server.lua',
}
