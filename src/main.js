const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const {app, Tray, Menu, globalShortcut} = require('electron');

const path = require('path');

let mainWindow;
let tray = null;
let closeWindow = false;
var AutoLaunch = require('auto-launch');
var kazooAutoLauncher = new AutoLaunch({
		name: 'UserPortal',
		path: '/Applications/UserPortal.app'
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
    title:'UserPortal',
    width: 1700,
    height: 950,
		center: true,
    backgroundColor: '#171717',
  });
	mainWindow.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);
	mainWindow.maximize();
}

app.on('ready', () => {
	createWindow();
	tray = new Tray(path.join(__dirname, '../build/trayicon.png'));

	globalShortcut.register('CommandOrControl+R', () => {
		mainWindow.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);
	});

	globalShortcut.register('CommandOrControl+Q', () => {
    app.quit();
	});
	const contextMenu = Menu.buildFromTemplate([
		{
			label: "Show UserPortal", click: () => {
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
			label: "Reload",
			accelerator: "CmdOrCtrl+R",
			click: () => {
				mainWindow.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);
			}
		},
		{ type: 'separator' },
		{
			label: "Quit UserPortal",
			accelerator: "CmdOrCtrl+Q",
			click: () => {
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