cfunited.ui.Credits = Ext.extend(Ext.Panel,{
	scroll:'vertical',
	contentEl:'credits-card-layout',		
	styleHtmlContent:true,
				
	initComponent: function(){
		
		this.btnBack = new Ext.Button({text:'Back',ui:'back',handler:this.onBack});
		
		this.titlebar = new Ext.Toolbar({
			title:'Credits',
			dock:'top',
			items:[this.btnBack]
		});
		
		this.dockedItems = [this.titlebar];
		
		cfunited.ui.Credits.superclass.initComponent.apply(this,arguments);
		
	},
	
	onBack: function(){
		Ext.getCmp('OptionsCard').setCard(0);
	}
	
})
