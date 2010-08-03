Ext.ns("cfunited","cfunited.ui");

Ext.setup({
    tabletStartupScreen: 'assets/images/tablet_startup.png',
    phoneStartupScreen: 'assets/images/phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    onReady: function() {
		var app = new cfunited.App();
    }
});