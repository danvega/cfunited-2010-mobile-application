cfunited.ui.TopicSessionDetails = Ext.extend(Ext.Panel,{
	fullscreen:true,
	styleHtmlContent:true,
	monitorOrientation:true,
	initComponent: function(){

		this.titlebar = new Ext.Toolbar({
			title:'Session Details',
			dock:'top',
			items:[
				{xtype:'button',text:'Back',ui:'back',handler:this.onBack}
			]
		});
		
		Ext.regModel("Session",{
			fields:[
				{name:'id',type:'int'},
				{name:'name',type:'string'},
				{name:'description',type:'string'},
				{name:'schedule',type:'object',
					fields:[
						{name:'date',type:'date',dateFormat:'m/d/Y'},
						{name:'starttime',type:'string'},
						{name:'endtime',type:'string'},
						{name:'location',type:'string'},
						{name:'seats',type:'int'}
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
		
		this.tpl = [
			'<tpl for=".">',
				'<div class="session-detail">',			
					'<strong>What:</strong> {name}<br/>',
					'<strong>When:</strong>',
						'<tpl for="schedule">',
							'<tpl if="xindex == 1">',
							' {date} {starttime} - {endtime}<br/>',
							'</tpl>',
						'</tpl>',			
					'<strong>Who:</strong>',
						'<tpl for="speakers">',
							' {[xindex > 1 ? "," : ""]}{name}',
						'</tpl>',
					'<br/><strong>Where:</strong>',
						'<tpl for="schedule">',
							'<tpl if="xindex == 1">',
								' {location}<br/>',
							'</tpl>',
						'</tpl>',						
					'<br/>{description}<br/><br/>',
					'<tpl for="schedule">',
						'<tpl if="xindex == 2">',
							'<em>This session is repeated on Saturday from {starttime} to {endtime}</em>',
						'</tpl>',
					'</tpl>',
				'</div>',
			'</tpl>'
		];
		
		this.dv = new Ext.DataPanel({
			fullscreen:true,
			tpl:this.tpl,
            store: new Ext.data.Store({
				model: 'Session'
            })
		});
		
		this.dockedItems = [this.titlebar];
		this.items = [this.dv];
			
		cfunited.ui.TopicSessionDetails.superclass.initComponent.apply(this,arguments);
		
	},
	
	onBack: function(){		
		Ext.getCmp('topicsPanel').setCard(0);
	},
	
	loadSession: function(id){
		
		Ext.getBody().mask(false, '<div class="loading">Loading&hellip;</div>');
		
		var dv = this.dv;
			
        Ext.util.JSONP.request({
            url: 'AjaxProxy.cfc',
            callbackKey: 'callback',
			params:{
				method:'get',
				_cf_nodebug:true,
				targeturl: 'http://cfunited.com/2010/topics/' + id + '.json'
			},
            callback: function(result) {
				dv.update(result);
				Ext.getBody().unmask();	
            }
           
        })	
	
	}
	
});

