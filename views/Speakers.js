cfunited.ui.Speakers = Ext.extend(Ext.Panel,{
	id:'speakers-card',
	fullscreen:true,
	title:'Speakers',
	iconCls:'team',
	layout:'card',
	initComponent: function(){

		this.titlebar = new Ext.Toolbar({
			title:'Speakers',
			dock:'top'
		});		
	
		Ext.regModel("Speaker",{
			fields:['id','name','companyname','bio','topics']
		});
		
		var tpl = new Ext.XTemplate(
			'<tpl for=".">',
				'<div class="speaker">',
					'<strong>{name}</strong>',
				'</div>',
			'</tpl>'
		);
				
		this.speakers = new Ext.List({
			id:'speakerList',
			fullscreen:true,
			tpl:tpl,
			itemSelector: 'div.speaker',
			singleSelect:true,
			grouped:true,
			indexBar:true,
			dockedItems:[this.titlebar],
			store: new Ext.data.Store({
				model:'Speaker',
				sorters:'name',
				getGroupString : function(record){
					return record.get('name')[0];
				}
			})			
		});
		
		this.speakerDetails = new cfunited.ui.SpeakerDetails();
		
		this.items = [this.speakers,this.speakerDetails];
		
		cfunited.ui.Speakers.superclass.initComponent.apply(this, arguments);
		
		this.speakers.on('itemtap',this.onItemTap,this);
		
	},
	
	onBack: function(){
		//
	},
	
	onItemTap: function(view,index,item,e){
		var rec = view.store.getAt(index);		
		
		this.speakerDetails.loadSpeaker(rec);
		this.setCard(1);
	},

	onLoad: function(){
		Ext.getBody().mask(false, '<div class="loading">Loading&hellip;</div>');

		Ext.util.JSONP.request({
            url: 'AjaxProxy.cfc',
			callbackKey: 'callback',
			params:{
				method:'get',
				_cf_nodebug:true,
				targeturl: 'http://cfunited.com/2010/speakers.json'
			},
            callback: function(result) {
				Ext.getCmp('speakerList').getStore().loadData(result);
				Ext.getBody().unmask();	
            }
        });				
		
	}
	
});
