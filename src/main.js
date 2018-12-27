const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const {Tray, Menu} = require('electron');

const path = require('path');

let mainWindow;
let tray = null;
let closeWindow = false;
var AutoLaunch = require('auto-launch');
var kazooAutoLauncher = new AutoLaunch({
		name: 'KAZOO',
		path: '/Applications/KAZOO.app'
});

kazooAutoLauncher.isEnabled()
.then(function(isEnabled){
    if(isEnabled){
        return;
    }
    kazooAutoLauncher.enable();
})
.catch(function(err){
    // handle error
});

function createWindow() {
	mainWindow = new BrowserWindow({
    title:'KAZOO',
    width: 1700,
    height: 950,
    minWidth: 1500,
		minHeight: 800,
		center: true,
    backgroundColor: '#171717',
  });
	mainWindow.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);

	mainWindow.on('closed', function () {
		mainWindow = null
	})
}

app.on('ready', () => {
	createWindow();

	tray = new Tray(path.join(__dirname, '../build/trayicon.png'));
  const contextMenu = Menu.buildFromTemplate([
		{
			label: "Show Kazoo", click: (item, window, event) => {
				if(closeWindow){
					closeWindow = false;
					createWindow();
				}
				else{
					mainWindow.show();
				}
			}
		},
		{
			label: "Quit Kazoo", click: (item, window, event) => {
				app.quit();
			}
		}
	]);
	tray.setContextMenu(contextMenu);

	mainWindow.on('minimize', () => {
		mainWindow.hide();

  });
	mainWindow.on('closed', () => {
		mainWindow = null;
		closeWindow = true;
  });
});

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
			app.quit()
	}
});

app.on('activate', function () {
	if (mainWindow === null) {
			createWindow()
	}
});