export const fxmanifest = `fx_version 'cerulean'

game 'gta5'

name '%s'

client_script 'resources/dist/client/*.client.js'

server_script 'resources/dist/server/*.server.js'

ui_page 'ui/dist/index.html'

files {
  'ui/dist/index.html',
  'ui/dist/**/*'
}`;
