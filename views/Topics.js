cfunited.ui.Topics = Ext.extend(Ext.Panel,{
	id:'topicsPanel',
	fullscreen:true,
	title:'Topics',
	iconCls:'bookmarks',
	layout:'card',
		
	initComponent: function(){
				
		this.topicsTitlebar = new Ext.Toolbar({
			title:'Topics',
			dock:'top'
		});	

		Ext.regModel("Topic",{
			fields: ['id','name','topics']
		});
				
		this.topics = new Ext.List({
			id:'topicsList',
			fullscreen:true,
			tpl:'<tpl for="."><div class="topic"><strong>{name}</strong></div></tpl>',
			singleSelect:true,
			itemSelector:'div.topic',
			dockedItems: [this.topicsTitlebar],
            store: new Ext.data.Store({
				model: 'Topic'
            })
		});			
		
		// SESSIONS CARD
		this.sessionsTitlebar = new Ext.Toolbar({
			title:'Sessions By Topic',
			dock:'top',
			items:[
				{xtype:'button',text:'Back',ui:'back',handler:this.onBack}
			]		
		});			
		
		Ext.regModel("Session",{
			fields: ['id','name','speakers']
		});
		
		var stpl = [
			'<tpl for=".">',
				'<div class="session">',
					'<strong>{name}</strong><br/>',
					'<tpl for="speakers">',
						'<span class="details">{name}</span>',
					'</tpl>',
				'</div>',
			'</tpl>'
		];
		
        this.sessions = new Ext.List({
			id:'sesByTopic',
			fullscreen:true,	
			tpl: stpl,
            itemSelector: 'div.session',
            singleSelect: true,
			dockedItems: [this.sessionsTitlebar],
            store: new Ext.data.Store({
                model: 'Session'
            })
        });
		
		this.sdetails = new cfunited.ui.TopicSessionDetails();
		this.items = [this.topics,this.sessions,this.sdetails];
		
		cfunited.ui.Topics.superclass.initComponent.apply(this,arguments);
		
		// events
		this.topics.on('itemtap',this.onTopicTap,this);
		this.sessions.on('itemtap',this.onSessionTap,this);
	},
	
	onBack: function(){
		Ext.getCmp('topicsPanel').setCard(0);
	},
	
	onSessionTap: function(view,index,item,e){
		var rec = view.store.getAt(index);
		this.setCard(2);			
		this.sdetails.loadSession(rec.id);
	},

	onTopicTap: function(view,index,item,e){
		var rec = view.store.getAt(index);
		this.setCard(1);
		
		// change the title bar
		this.sessionsTitlebar.setTitle(rec.name);
		
		// load the sessions for this topic
		this.sessions.getStore().loadData(rec.topics);		
	},
	
	onLoad: function(){
		Ext.getBody().mask(false, '<div class="loading">Loading&hellip;</div>');
		
		Ext.util.JSONP.request({
            url: 'AjaxProxy.cfc',
            callbackKey: 'callback',
			params:{
				method:'get',
                _cf_nodebug:true,
				targeturl: 'http://www.cfunited.com/2010/topics.json'
			},
            callback: function(result) {
				Ext.getCmp('topicsList').getStore().loadData(result);
				Ext.getBody().unmask();	
            }
        });		
			
	}
	
});
