cfunited.ui.SpeakerDetails = Ext.extend(Ext.Panel,{
	fullscreen:true,
	styleHtmlContent:true,
	
	initComponent: function(){

		this.titlebar = new Ext.Toolbar({
			title:'Speaker Details',
			dock:'top',
			items:[
				{xtype:'button',text:'Back',ui:'back',handler:this.onBack}
			]
		});

		Ext.regModel("Speaker",{
			fields:[
				{name:'id',type:'int'},
				{name:'bio',type:'string'},
				{name:'topics',type:'object',
					fields:[
						{name:'id',type:'int'},
						{name:'name',type:'string'}						
					]
				}
			]
		});
		
		this.tpl = [
			'<tpl for=".">',
				'<div class="speaker-detail">',
					'<strong>{name}</strong><br/>',
					'{bio}<br/><br/>',
					'<strong>Topics</strong><br/>',
					'<tpl for="topics">',
						'{name}<br/>',
					'</tpl>',
				'</div>',
			'</tpl>'
		];
		
		this.sdv = new Ext.DataPanel({
			id:'speaker-details',
			fullscreen:true,
			styleHtmlContent:true,
			tpl:this.tpl,
            store: new Ext.data.Store({
				model: 'Speaker'
            })
		});
		
		this.dockedItems = [this.titlebar];	
		this.items = [this.sdv];
			
		cfunited.ui.SpeakerDetails.superclass.initComponent.apply(this,arguments);

	},
	
	onBack: function(){
		Ext.getCmp('speakers-card').setCard(0);
	},
	
	loadSpeaker: function(s){
		
		this.titlebar.setTitle(s.name);		
		this.sdv.update(s);
				
	}
	
	
	
});

