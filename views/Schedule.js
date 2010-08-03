cfunited.ui.Schedule = Ext.extend(Ext.Container,{
	id:'schedule-card',
	title:'Schedule',
	iconCls:'time',
	layout:'card',
	monitorOrientation:true,
	
	initComponent: function(){
	
		this.titlebar = new Ext.Toolbar({
			title:'Schedule',
			dock:'top'
		});	
	
		Ext.regModel("Schedule",{
			fields:[
				{name:'seats',type:'int'},
				{name:'starttime',type:'string'},
				{name:'endtime',type:'string'},
				{name:'topic',type:'object',
					fields: [
						{name:'id',type:'int'},
						{name:'name',type:'string'}
					]
				},
				{name:'speakers',type:'object',
					fields:[
						{name:'id',type:'int'},
						{name:'name',type:'string'}							
					]
				},
				{name:'location',type:'string'}
			]
		});
				
		this.sb = new Ext.SplitButton({
			defaults:{
				xtype:'button',
				scope:this,
				handler:function(btn,e){
					this.loadData(btn.id);
				}
			},
			centered:true,
			items:[
				{id:'2010/07/28',text:'Wed'},
				{id:'2010/07/29',text:'Thur'},
				{id:'2010/07/30',text:'Fri'},
				{id:'2010/07/31',text:'Sat'}			
			],
			cls:'day-selector'
		});
		
		var tpl = [
			'<tpl for=".">',
				'<div class="schedule">',
					'<tpl for="topic">',
						'<strong>{name}</strong><br/>',
					'</tpl>',
					'<div class="details">',
						'&nbsp;',
						'<tpl for="speakers">',
							'{[xindex > 1 ? "," : ""]}{name}',
						'</tpl>',
						'<div class="location">{location}</div>',
					'</div>',
				'</div>',
			'</tpl>'
		];
		
        this.sessions = new Ext.List({
			id:'sessionList',
			cls:'session-list',
			fullscreen:true,
			tpl: tpl,
            itemSelector: 'div.schedule',
            singleSelect: true,
			grouped:true,
            store: new Ext.data.Store({
                model: 'Schedule',
                getGroupString: function(record){
					return record.get('starttime') + ' - ' + record.get('endtime');
                }
            })
        });	
		
		this.main = new Ext.Panel({
			dockedItems: [this.titlebar],
			items: [
				{
					xtype:'container',
					layout:'vbox',
					items:[
						this.sb,
						this.sessions
					]
				}
			]
		});
		
		this.sessionDetails = new cfunited.ui.SessionDetails();
		this.items = [this.main,this.sessionDetails];
		
		cfunited.ui.Schedule.superclass.initComponent.apply(this,arguments);
		
		// events
		this.sessions.on('itemtap',this.onItemTap,this);
	},
	
	onItemTap: function(view, index, item, e){		
		var rec = view.store.getAt(index);				
		this.setCard(1);
		this.sessionDetails.loadSession(rec.topic.id);		
	},
	
	onBack: function(){
		this.setCard(0);
	},
	
	onLoad: function(){		
		var dt = new Date();
		
		switch(dt.format('Y/m/d')){
			
			case '2010/07/28':
				this.loadData(dt.format('Y/m/d'));
				this.sb.setActive(dt.format('Y/m/d'));
			break;
			case '2010/07/29':
				this.loadData(dt.format('Y/m/d'));
				this.sb.setActive(dt.format('Y/m/d'));
			break;
			case '2010/07/30':
				this.loadData(dt.format('Y/m/d'));
				this.sb.setActive(dt.format('Y/m/d'));
			break;
			case '2010/07/31':
				this.loadData(dt.format('Y/m/d'));
				this.sb.setActive(dt.format('Y/m/d'));
			break;
			
			default :
				this.loadData('2010/07/28');
				this.sb.setActive(dt.format('2010/07/28'));
			break;
		}		
		
	},
	
	loadData: function(date){
        Ext.getBody().mask(false, '<div class="loading">Loading&hellip;</div>');
		
		Ext.util.JSONP.request({
            url: 'AjaxProxy.cfc',
			callbackKey: 'callback',
			params:{
				method:'get',
				_cf_nodebug:true,
				targeturl: 'http://cfunited.com/2010/schedule.json'
			},
            callback: function(result) {
				
				for( var i=0; i < result.length; i++ ){
					if( result[i].date == date){
						Ext.getCmp('sessionList').getStore().loadData(result[i].schedule);
					}
				}
				
				Ext.getBody().unmask();	
            }
        });		
	}
	
});

