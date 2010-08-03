cfunited.ui.Sponsors = Ext.extend(Ext.Panel,{
	fullscreen:true,
	styleHtmlContent:true,
	cls:'sponsors',
	
	initComponent: function(){

		this.btnBack = new Ext.Button({text:'Back',ui:'back',handler:this.onBack});
		
		this.titlebar = new Ext.Toolbar({
			title:'Sponsors',
			dock:'top',
			items:[this.btnBack]
		});
		
		Ext.regModel("Sponsor",{
			fields:[
				{name:'id',type:'int'},
				{name:'name',type:'string'},
				{name:'sponsors',type:'object',
					fields:[
						{name:'id',type:'int'},
						{name:'name',type:'string'},
						{name:'url',type:'string'},
						{name:'description',type:'string'}						
					]
				}				
			]
		});
		
		var tpl = [
			'<tpl for=".">',
				'<tpl for="sponsors">',
					'<div class="sponsor"><strong>{name}</strong> <a href="{url}" target="_blank">{url}</a><br/>',
						'{description}',
					'</div>',
				'</tpl>',
			'</tpl>'
		];
		
		this.list = new Ext.List({
			id:'sponsors-list',
			fullscreen:true,
			tpl:tpl,
			singleSelect:true,
			itemSelector: 'div.sponsor',
			grouped:true,
			store: new Ext.data.Store({
				model:'Sponsor',
				getGroupString: function(record){
					return record.get('name');
				}
			})
		});		
		
		
		this.dockedItems = [this.titlebar];
		this.items = [this.list];
		
		cfunited.ui.Sponsors.superclass.initComponent.apply(this,arguments);
		
	},
	
	onBack: function(){
		Ext.getCmp('OptionsCard').setCard(0);
	},
	
	onLoad: function(){
        Ext.getBody().mask(false, '<div class="loading">Loading&hellip;</div>');
		
		Ext.util.JSONP.request({
            url: 'AjaxProxy.cfc',
			callbackKey: 'callback',
			params:{
				method:'get',
				_cf_nodebug:true,
				targeturl: 'http://cfunited.com/2010/sponsors.json'
			},
            callback: function(result) {
				var sponsors = new Array();
				
				for(var i=0; i < result.length; i++){
					if(result[i].sponsors.length > 0){
						sponsors.push(result[i]);	
					}
				}
				
				Ext.getCmp('sponsors-list').getStore().loadData(sponsors);
				Ext.getBody().unmask();	
            }
        });			
	}
	
})
