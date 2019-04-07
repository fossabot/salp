// App menu
const { app, Menu, shell } = require('electron')

const template = [
    {
        label: 'View',
        submenu: [
            { role: 'togglefullscreen' }
        ]
    },
    {
        role: 'window',
        submenu: [
            { role: 'minimize' },
            { role: 'close' }
        ]
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Learn More',
                click: ()  => shell.openExternal('https://github.com/salp-app/salp')
            }
        ]
    }
]

if (process.platform === 'darwin') {
    template.unshift({
        label: app.getName(),
        submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideothers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
        ]
    })

    template[2].submenu = [
        { role: 'close' },
        { role: 'minimize' },
        { role: 'zoom' },
        { type: 'separator' },
        { role: 'front' }
    ]
} else {
    template[2].submenu.unshift({
        role: 'about'
    })
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
