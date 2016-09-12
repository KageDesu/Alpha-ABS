//=============================================================================
// ReferByTitle.js
//=============================================================================

/*:
 * @plugindesc Allows to refer to actors, events and other objects by unique title.
 * @author EvilCat
 * @email soevilcat@mail.ru
 * @version 0.5
 
 * @param Event Palette Map ID
 * @desc ID of map to look for events absent on the current map.
 * @default 
 
 * @param Wikilinks
 * @desc Turns on and off wikilink functions (see help)
 * @default On
 
 * @help
 * Allows to retrieve various type of data by title, not numerical id.
 * This plugin is for use mostly by other plugins, although it allows
 * to copy events from other events on map or (if Palette Map ID is set)
 * palette map by stating [[Title]] in its note. For example:
 * If the note says [[Bat]], then the plugin will look for an event named
 * "Bat" in the current map and copy it, overwriting this event.
 * If Palette Map ID is set, it will also look for "Bat" in the palette map.
 * Palette option requires EvilCat.WebLoad plugin!
 *
 * The title should be unique among peers, otherwise you introduce uncertainty.
 * Titles are not mandatory, but only titled data can be retrieved.
 * By default, name is used as title; you can override this by adding
 * <Title: something> to notes (it will be trimmed from spaces).
 *
 * WIP: currently only retrieves events.
 * Creative Commons 4.0 Attribution license
 */

"use strict";

if (!EvilCat) throw new Error('Requires EvilCat Utils plugin!');

{
	let ReferByTitle = EvilCat.ReferByTitle = class ReferByTitle extends EvilCat.Plugin
	{
		constructor()
		{
			super();
			if (this.paramId('Event Palette Map Id', false)!==false && !EvilCat.WebLoad) throw new Error('Requires WebLoad plugin for Palette Map!');
			this.true={};
			this.false={}; // for storage in WeakMaps which only allow objects, so let's create an object to represent false. Any object, no matter the content, is always unique in Javascript.
		}
		
		_isPersistent(varname)
		{
			var volatileData=['_eventMap', '_mapsMap'];
			return volatileData.indexOf(varname)===-1;
		}
		
		_getTitleCache(varname)	{ return this[varname] || (this[varname] = (this._isPersistent(varname) ? new Map() : new WeakMap())) ; }
		_clearCache(varname)	{ delete this[varname]; }
		
		_events()	{ return this._getTitleCache('_eventsMap');	}
		_palette()	{ return this._getTitleCache('_paletteMap');	}
		
		/*
		// Unimplemented yet
		_actors()	{ return this._getTitleCache('_actorsMap');	}
		_classes()	{ return this._getTitleCache('_classesMap');	}
		_skills()	{ return this._getTitleCache('_skillsMap');	}
		_items()	{ return this._getTitleCache('_itemsMap');	}
		_weapons()	{ return this._getTitleCache('_weaponMap');	}
		_armors()	{ return this._getTitleCache('_armorsMap');	}
		_enemies()	{ return this._getTitleCache('_enemiesMap');	}
		_troops()	{ return this._getTitleCache('_troopsMap');	}
		_states()	{ return this._getTitleCache('_statesMap');	}
		_anims()	{ return this._getTitleCache('_animsMap');	}
		_tilesets()	{ return this._getTitleCache('_tilesetsMap');	}
		_cEvents()	{ return this._getTitleCache('_cEventsMap');	}
		_maps()		{ return this._getTitleCache('_mapsMap');		}
		*/
		
		
		/*
		// these functions are possible, but would work slow any way you look at it.
		
		_all()		{ return this._getTitleCache('_allMap');		}
		_globEvents() { return this._getTitleCache('_globEventsMap');	}
		
		*/
		
		_get_from_cache_or_find(title, cache, find_callback)
		{
			if (!title) return;
			var fromMap=cache.get(title);
			if (fromMap===this.false) return;
			else if (fromMap) return fromMap;
			if (cache.has(EvilCat.ReferByTitle.COMPLETED_KEY)) return;
			
			var find=find_callback();
			if (!cache.has(title))
			{
				if (find) cache.set(title, find);
				else cache.set(title, this.false);
			}
			return find;
		}
		
		getEvent(title, cache)
		{
			var cache = cache || this._events();
			return this._get_from_cache_or_find(title, cache, (function()
			{
				if (!$gameMap || !(SceneManager._scene instanceof Scene_Map)) return;
				var events=$gameMap.events();
				for (var x=0; x<events.length; x++)
				{
					var event=events[x];
					var eventTitle=event.getTitleId();
					if (!eventTitle) continue;
					if (!cache.has(eventTitle)) cache.set(eventTitle, event);
					if (eventTitle===title) return event;
				}
				cache.set(EvilCat.ReferByTitle.COMPLETED_KEY, this.true);
				throw new NotFoundError(title);
			}).bind(this));
		}
		
		promisePaletteMap()
		{
			if (this.paletteMap instanceof Promise) return this.paletteMap;
			
			var paletteId=this.paramId('Event Palette Map ID', false);
			if (!paletteId) throw new Error('No palette map ID set');
			if (!EvilCat.WebLoad) throw new Error('Requires WebLoad plugin for Palette Map!');
			
			return this.paletteMap = EvilCat.WebLoad.StandardSource.syncLoadFile('Map'+paletteId.padZero(3));
		}
		
		promisePaletteEventData(title)
		{			
			var cache=this._palette();
			var result=this._get_from_cache_or_find(title, cache, (function()
			{
				return this.promisePaletteMap().then((function(mapData)
				{
					for (var x=1; x<mapData.events.length; x++)
					{
						var event=mapData.events[x];
						var eventTitle=extractTitleId(event);
						if (!eventTitle) continue;
						
						if (!cache.has(eventTitle)) cache.set(eventTitle, event);
						if (eventTitle===title) return event;
					}
					cache.set(EvilCat.ReferByTitle.COMPLETED_KEY, this.true);
					throw new NotFoundError(title);
				}).bind(this));
			}).bind(this));
			
			if (! (result instanceof Promise)) return Promise.resolve(result);
			return result;
		}
		
		promiseWikiEventData(wikilink)
		{
			var event;
			try { event=this.getEvent(wikilink); }
			catch (e)
			{
				if (e instanceof NotFoundError) event=null;
				else throw e;
			}
			if (event) return Promise.resolve(event.getDBData());
			
			if (this.paramId('Event Palette Map ID', false)===false) return Promise.reject(new NotFoundError(wikilink));
			return this.promisePaletteEventData(wikilink);
		}
	}
	ReferByTitle = EvilCat.ReferByTitle = new ReferByTitle();
	
	ReferByTitle.COMPLETED_KEY='completed>'; // colon can't be used in meta, so this key should always be unused by author.
	
	let NotFoundError=EvilCat.ReferByTitle.NotFoundError=class NotFoundError extends Error
	{
		constructor(title)
		{
			Error.apply(this, arguments);
			this.name='NotFoundError';
			this.message='Title: '+title;
		}
	}
	
	if (ReferByTitle.paramBool('Wikilinks', true))
	{
		let _DataManager_extractMetadata=DataManager.extractMetadata;
		DataManager.extractMetadata = function(data)
		{
			_DataManager_extractMetadata.call(this, data);
			
			var re=/\[\[(.+?)\]\]/;
			var match = re.exec(data.note);
			if (match) data.meta.wikilink=match[1].trim();
		};
		
		let _Game_Map_setupEvents=Game_Map.prototype.setupEvents;
		Game_Map.prototype.setupEvents = function()
		{
			_Game_Map_setupEvents.call(this);
			this.events().forEach(function(event)
			{
				var wikilink=event.getMeta('wikilink');
				if (wikilink) event.initWikilink(wikilink.trim());
			});
		}
		
		Game_Event.prototype.initWikilink=function(wikilink)
		{
			wikilink=wikilink.trim();
			ReferByTitle.promiseWikiEventData(wikilink).then((function(data)
			{
				this.setData(data);
			}).bind(this),
			function(reason)
			{
				SceneManager.catchException(reason);
			});
		}
	}
	
	let Game_Map_setupEvents=Game_Map.prototype.setupEvents;
	Game_Map.prototype.setupEvents=function()
	{
		Game_Map_setupEvents.call(this);
		ReferByTitle._clearCache('_eventsMap');
	}
	
	let extractTitleId=function(data, throwError)
	{
		if(data == null)
			return false;
		
		if (!data.meta && data.note) DataManager.extractMetadata(data);
		if (data.meta)
		{
			var title=EvilCat.extractFromMeta(data.meta, 'Title', 'String', '').trim();
			if (title) return title;
		}
		if (data.name) return data.name;
		if (throwError) throw new Error('No title id!');
		return false;
	}
	let getTitleId=function(throwError)
	{
		if (this.hasOwnProperty('titleId')) return this.titleId;
		if (this.getDBData) return this.titleId=extractTitleId(this.getDBData(), throwError);
		if (throwError) throw new Error('No title id!');
		return false;
	}
	
	Game_Item	.prototype.getTitleId	= getTitleId;
	Game_Actor	.prototype.getTitleId	= getTitleId;
	Game_Enemy	.prototype.getTitleId	= getTitleId;
	Game_Troop	.prototype.getTitleId	= getTitleId;
	Game_Map	.prototype.getTitleId	= getTitleId;
	Game_CommonEvent.prototype.getTitleId	= getTitleId;
	Game_Event	.prototype.getTitleId	= getTitleId;
	Game_Player	.prototype.getTitleId	= getTitleId;
	Game_Follower.prototype.getTitleId= getTitleId;
	
}