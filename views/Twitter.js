cfunited.ui.Twitter = Ext.extend(Ext.List,{
    id:'twitter-list',
	title:'Twitter',
	cls: 'timeline',
	iconCls:'download',
    tpl: [
	    '<tpl for=".">',
	        '<div class="tweet">',
	            '<img src="{profile_image_url}" />',
	            '<div class="x-tweetanchor"></div>',
	                '<div class="tweet-bubble">',
	                    '<div class="tweet-content">',
	                        '<h2>{from_user}</h2>',
	                        '<p> {text}</p><strong></strong>',
	                        '<span class="posted">{created_at}</span>',
	                    '</div>',
	                '</div>',
	            '</div>',
	        '</div>',
	    '</tpl>'
    ].join(''),	
	itemSelector: 'div.tweet',
    emptyText : '<p style="padding: 10px">No tweets found matching that search</p>',
	
	initComponent: function(){

        this.refreshIcon = new Ext.Button({
            iconCls: 'refresh',
            handler: this.onRefresh
        });
		
		this.titlebar = new Ext.Toolbar({
			title:'Twitter Feed',
			dock:'top',
			defaults:{
				ui:'mask'
			},
			items:[
				{flex:1},
				this.refreshIcon
			]
		});		
		
		// model
		Ext.regModel('Tweet', {
		    fields: [
		        {name: 'id',type: 'int'},
		        {name: 'profile_image_url',type: 'string'},
		        {name: 'from_user',type: 'string'},
		        {name: 'text',type: 'string'}
		    ]
		});
		
		this.store = new Ext.data.Store({
            id:'tweeter',
            model: "Tweet"
        });
		
		this.dockedItems = [this.titlebar];
		
		cfunited.ui.Twitter.superclass.initComponent.apply(this,arguments);
		
	},
	
	onLoad: function(){
		this.onRefresh();
	},
	
	onRefresh: function(){
		var twitterStore = Ext.getCmp('twitter-list').getStore();
		
		Ext.getBody().mask(false, '<div class="loading">Loading&hellip;</div>');
		
		Ext.util.JSONP.request({
            url: 'http://search.twitter.com/search.json',
            callbackKey: 'callback',
			params:{
                q: 'cfunited',
                rpp: 50,
                suppress_response_codes: true
			},
            callback: function(result) {
				var tweets = result.results;
				
				for( var i=0; i < tweets.length; i++){
					var dt = new Date(tweets[i].created_at);
					tweets[i].created_at = dt.format('D F j, Y, g:i a');
					//tweets[i].text = t.replace(/(http:\/\/)(.*)\s/gi, '<a href="$1$2" target="_blank">$1$2</a>');
				}
				
				twitterStore.loadData(tweets);
				Ext.getBody().unmask();	
            }
        });
		
	}
	
});
