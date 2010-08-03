cfunited.ui.More = Ext.extend(Ext.Panel,{
	id:'OptionsCard',
	fullscreen:true,
	iconCls:'more',
	layout:'card',
	title:'More',
	
	initComponent: function(){
	
		this.titlebar = new Ext.Toolbar({
			title:'More',
			dock:'top'
		});	
		
		this.options = new Ext.List({
			fullscreen:true,
			dockedItems: [this.titlebar],
			singleSelect:true,
			itemSelector:'div.option',
			defaults:{
				cls:'option'
			},
			items:[
				{id:'sponsors',html:'<strong>Sponsors</strong>'},
				{id:'travel',html:'<strong>Travel</strong>'},
				{id:'credits',html:'<strong>Credits</strong>'}
			]
		});
		
		// UI		
		this.sponsors = new cfunited.ui.Sponsors();
		this.travel = new cfunited.ui.Travel();
		this.credits = new cfunited.ui.Credits();
		
		this.items = [this.options,this.sponsors,this.travel,this.credits];
				
		cfunited.ui.More.superclass.initComponent.apply(this,arguments);
		
		this.options.on('itemtap',this.onItemTap,this);
	},
	
	onItemTap: function(view,index,item,e){
		var id = item.id;
		
		switch(id){
			case 'sponsors':
				this.setCard(1);
				this.sponsors.onLoad();	
			break;
			case 'travel':
				this.setCard(2);
			break;
			case 'credits':
				this.setCard(3);
			break;
		}
		
	}
	
});