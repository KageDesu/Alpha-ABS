//=============================================================================
// WebLoad.js
//=============================================================================

/*:
 * @plugindesc Loads data from web.
 * @author EvilCat
 * @email soevilcat@mail.ru
 * @version 0.2.1
 
 * @param Base URL
 * @desc Web folder with game data
 * @default http://pokeliga.com/test/
 
 * @param Max Request Time
 * @desc Number of seconds to wait for data
 * @default 5
 
 * @help
 * Use Plugin Command:
 * WebLoad loadEvent <filename>
 * WebLoad loadEventNow <filename>
 * ('.json' extension added automatically)
 * loadEvent is async while loadEventNow is sync (pauses the game until loaded).
 * Creative Commons 4.0 Attribution license
 */

"use strict";

if (!EvilCat) throw new Error('Requires EvilCat Utils plugin!');

{
	let WebLoad=class WebLoad extends EvilCat.Plugin
	{
		constructor()
		{
			super();
		}
		
		init()
		{
			this.DefaultSource = this.StandardSource = new EvilCat.WebLoad.classes.StandardSource();
			var baseUrl=this.paramString('Base URL', false);
			if (baseUrl!==false) this.WebSource=new EvilCat.WebLoad.classes.WebSource(baseUrl);
		}
		
		makeCommandsList() { this.validCommands=['loadEvent', 'loadEventNow']; }
		
		loadEvent(plugin_name, interpreter, filename)
		{
			var target=interpreter.getContext();
			if (!target) throw new Error('WebLoad works for map events only!');
			var source=this.sourceByName(plugin_name);
			if (!source) throw new Error('Source unrecognized');
			return source.loadEvent(target, filename);
		}
		loadEventNow(plugin_name, interpreter, filename)
		{
			var target=interpreter.getContext();
			if (!target) throw new Error('WebLoad works for map events only!');
			var source=this.sourceByName(plugin_name);
			if (!source) throw new Error('Source unrecognized');
			return source.loadEventNow(target, filename);
		}
		
		sourceByName(command)
		{
			if (command==='WebLoad')
			{
				if (!this.WebSource) throw new Error('Web source not set!');
				return this.WebSource;
			}
		}
		
	};
	WebLoad=EvilCat.WebLoad=new WebLoad();
	WebLoad.DEFAULT_AUTOFAIL_TIMESPAN=5; // 5 s
	WebLoad.classes={};

	let DataSource = EvilCat.WebLoad.classes.DataSource = class
	{
		constructor()
		{
			this._loadingEvents={};
			this._promises={};
		}
		
		makeUrl(filename)
		{
			return this.baseUrl()+filename+'.json';
		}
		
		baseUrl()
		{
			throw new Error('abstract method!');
		}
		
		loadFile(filename, autofailTimeout, sync)
		{
			if (this._promises[filename]) return this._promises[filename]; // If filename was requested with different timeout and synchronity within short amount of time, only the first set of params will count. But this situation is unlikely.
			
			if (autofailTimeout===undefined) autofailTimeout=WebLoad.paramFloat('Max Request Time', EvilCat.WebLoad.DEFAULT_AUTOFAIL_TIMESPAN);
			autofailTimeout*=1000;
			if (sync) SceneManager.recordPromise();
			return this._promises[filename] = new Promise((function(resolve, reject)
			{
				var xhr = new XMLHttpRequest();
				var url = this.makeUrl(filename);
				xhr.timeout=autofailTimeout;
				xhr.open('GET', url);
				xhr.overrideMimeType('application/json');
				xhr.onload = function()
				{
					if (xhr.status < 400)
					{
						var json=JSON.parse(xhr.responseText);
						resolve(json);
					}
					else reject(new LoadError(filename, xhr.status));
				};
				xhr.onerror=function() { reject(new LoadError(filename)); }
				xhr.onloadend=(function()
				{
					delete this._promises[filename];
					if (sync) SceneManager.settlePromise();
				}).bind(this);
				xhr.send();
			}).bind(this));
		}
		syncLoadFile(filename, autofailTimeout)
		{
			return this.loadFile(filename, autofailTimeout);
		}
		
		_loadEvent(target, filename, sync)
		{
			if (this.isEventLoading(target)) return;
			this.eventIsLoading(target);
			
			var callback=(function(json)
			{
				this.clearEventLoading(target);
				target.setData(json);
			}).bind(this);
			var error_callback=function(reason) { throw new Error('Can\'t load event! '+reason); }
			
			this.loadFile(filename, undefined, sync).then(callback, error_callback);
		}
		loadEvent(target, filename)		{ this._loadEvent(target, filename, false); }
		loadEventNow(target, filename)	{ this._loadEvent(target, filename, true); }
		
		isEventLoading(event)		{ return this._loadingEvents[event.eventId()];		}
		eventIsLoading(event)		{ return this._loadingEvents[event.eventId()]=true;	}
		clearEventLoading(event)	{ delete this._loadingEvents[event.eventId()];		}
	}
	
	let LoadError=EvilCat.WebLoad.LoadError=class LoadError extends Error
	{
		constructor(filename, code)
		{
			Error.apply(this, arguments);
			this.name='LoadError';
			this.message=filename;
			if (code) this.message+=' ('+code+')';
		}
	}
	
	EvilCat.WebLoad.classes.StandardSource=class extends DataSource
	{
		baseUrl() { return 'data/'; }
	}
	
	EvilCat.WebLoad.classes.WebSource=class extends DataSource
	{
		constructor(base)
		{
			super();
			this.base=base;
		}
		
		baseUrl() { return this.base; }
	}
	
	let _SceneManager_initialize=SceneManager.initialize;
	SceneManager.initialize=function()
	{
		SceneManager.promises=0;
		_SceneManager_initialize.call(this);
	}
	
	let _SceneManager_update=SceneManager.update;
	SceneManager.update = function()
	{
		if (SceneManager.promises>0) Graphics.updateLoading();
		else _SceneManager_update.call(this);
	}
	
	SceneManager.recordPromise=function()
	{
		this.promises++;
		if (this.promises==1)
		{
			Graphics.startLoading();
		}
	}
	
	SceneManager.settlePromise=function()
	{
		this.promises--;
		if (this.promises===0)
		{
			Graphics.endLoading();
			this.requestUpdate();
		}
	}
	
	WebLoad.init();
}