//=============================================================================
// EvilCatUtils.js
//=============================================================================

/*
 * @plugindesc Some core functions used in EvilCat plugins.
 * @author EvilCat
 * @email soevilcat@mail.ru
 * @version 1.4
 
 * @param Read Meta from Page
 * @desc Updates meta from the current page (first comments only).
 * @default On
 
 * @help
 * This plugins is intended to ease some of scripting needs.
 * Please refer to code comments.
 *
 * Plugin Commands:
 * Calc $v(2) = 2+2+$v(4)
 * Sets variable #2 to the result of 2 + 2 + variable #4.
 *
 * Creative Commons 4.0 Attribution license
 */

/*
* Add-ons that I know of (it should be safe to say - all of them!)
* EvilCatUtils Colors: Adds Color type and class.
*/
 
/*
* TODO:
* Better Error descriptions
*/
 
"use strict";

var EvilCat = {};

{
	/*
	* Converts any value to true or false per standard JavaScript expression rules.
	* @return bool
	*/
	EvilCat.toBool		=function(val) { return val ? true : false; }
	
	/*
	* Checks if value can be used as number. Doesn't parse expression like parseInt() and parseFloat() do.
	* @return bool
	*/
	EvilCat.isNumber	=function(n)	{ return !isNaN(Number(n)) && isFinite(n); }
	
	/*
	* Checks value is arguments objects, which is similar to an array, but isn't an array. Have to be careful with that!
	* @return bool
	*/
	EvilCat.isArguments	=function(item)	{ return Object.prototype.toString.call(item)==='[object Arguments]'; }
	
	/*
	* Checks if value is an array or an arguments object.
	* @return bool
	*/
	EvilCat.isArrayLike	=function(item)	{ return item instanceof Array || EvilCat.isArguments(item); }
	
	/*
	* Creates a "trait" (object for mixing into prototypes) by adding together other traits.
	* Accepts any number of object arguments.
	* @return Object A new trait object composed of all objects.
	*/
	EvilCat.composeTrait=function()
	{
		var trait={};
		for (var x=0; x<arguments.length; x++)
		{
			EvilCat.receiveProperties(trait, arguments[x]);
		}
		return trait;
	}

	/*
	* Function-style class extension. Sets parent_constructor's prototype (if provided) as constructor's prototype's prototype, which is a form of class inheritance in JavaScript.
	* @param Function constructor Constructor of target class.
	* @param Function|Object parent_constructor May be a constructor of parent class or a trait.
	* Also accepts any number of traits.
	
	* Usually used like this:
	* var <class_name>=function () { ... }
	* EvilCat.extend(<class_name>, <parent_class_name>, { new and overloaded methods in object notation });
	*/
	EvilCat.extend=function(constructor, parent_constructor /* , trait, trait... */)
	{
		var traits_from;
		if (parent_constructor instanceof Function)
		{
			constructor.prototype=Object.create(parent_constructor.prototype);
			constructor.prototype.constructor=constructor;
			traits_from=2;
		}
		else traits_from=1;
		
		if (arguments.length<=traits_from) return;
		for (var x=traits_from; x<arguments.length; x++)
		{
			if (arguments[x] instanceof Function) EvilCat.useTrait(constructor, arguments[x].prototype);
			else EvilCat.useTrait(constructor, arguments[x]);
		}
	}

	/*
	* Mixes a trait into prototype
	* @param Function constructor Target class constructor
	* @param Object trait A trait to mix-in.
	*/
	EvilCat.useTrait=function(constructor, trait)
	{
		EvilCat.receiveProperties(constructor.prototype, trait);
	}

	/*
	* Copies properties of one object to another. Handles get/set properties correctly. Doesn't clone sub-objects.
	* @param Object target A target to copy properties to.
	* @param Object source The donor of properties.
	*/
	EvilCat.receiveProperties=function(target, source)
	{
		var keys=Object.getOwnPropertyNames(source), key, prop;
		keys.forEach(function(key)
		{
			prop=Object.getOwnPropertyDescriptor(source, key);
			Object.defineProperty(target, key, prop);
		});
	}
	
	/*
	* Shallow copy of basic data object (an object used only to store basic data, no functions or prototypes).
	* @param Object source
	* @return Object a new object having the same own properties as the original.
	*/
	EvilCat.cloneDataObject=function(source)
	{
		if (source.constructor!==Object) throw new Error('cloneDataObject is for basic object only!');
		return EvilCat.receiveProperties({}, source);
	}
	
	EvilCat.newApply=function(constructor, args)
	{
		obj=Object.create(constructor.prototype);
		constructor.apply(obj, args);
		return obj;
	}
	
	/*
	* A class for handling singleton plugin objects.
	* Usage:
		
		var <some_var> = function <plugin_name> {
			// JS constructor notation here
		}
		<some_var>.prototype = Object.create(EvilCat.Plugin.prototype);
		<some_var>.prototype.constructor = <some_var>;
		
		OR
		
		var <some_var> = function <plugin_name> {
			// JS constructor notation here
		}
		EvilCat.extend(<some_var>, EvilCat.Plugin, { new and overloaded methods in object notation }
		
		OR
		
		var <some_var> = class <plugin_name> extends EvilCat.Plugin {
			// JS6 class notation here
		}
		
		THEN
		
		var <plugin_var> = new <some_var>; // the class is singleton, meaning it has only one instance; we create it now.
	*/
	EvilCat.Plugin=class Plugin
	{
		/*
		* Don't forget to call parent's constructor when inheriting from this class! Use either:
		  EvilCat.Plugin.apply(this, arguments);
		  OR
		  super(arg1, arg2...); // in JS6 class notation
		* Note that constructor (or class definition for JS6 way) should have a name to be activated properly by EvilCatUtils system!
		* @throws Error if constructor function has no name.
		*/
		constructor()
		{
			this.name=this.constructor.name;
			if (!this.name) throw new Error('Plugin constructor should have a name!');
			else if (EvilCat.Plugins[this.name]) throw new Error('Duplicate plugin!');
			EvilCat.Plugins[this.name]=this;
			
			this.makeCommandsList();
			
			this.parsedParams={};
			this.addOns=[];
		}
		
		/*
		* Overload this method to append string names of methods that are valid as Plugin Commands. For example:
		* makeCommandsList() { this.validCommands=['loadEvent']; }		
		* Methods listed here are called with Game_Event object as first argument, then all other Plugin Command arguments.
		* @return Array A list of string names of plugin's methods that should be available as Plugin Command.
		*/
		makeCommandsList() { this.validCommands=[]; }
		
		/*
		* Handles Plugin Commands.
		* @private
		* @param Game_Interperter interpreter The interpreter that called Plugin Command.
		* @param Array args Arguments of Plugin Command as parsed by Game_Interpreter
		* @throws Error if command is not found among methods available as Plugin Commands.
		*/
		_eventCommand(plugin_name, interpreter, args)
		{
			var command_method=this._getCommandMethod(args[0], plugin_name);
			if (!command_method) throw new Error('unknown command '+args[0]);
			var plugin_args=args.slice(1);
			plugin_args.unshift(interpreter);
			plugin_args.unshift(plugin_name);
			command_method.apply(this, plugin_args);
		}
		
		/*
		* Returns plugin's method to handle specific Plugin Command.
		* @private
		* @param string command String command name as parsed by Game_Interpreter.
		* @return Function|null Either the desired method or null if not a valid Plugin Command.
		* @throws Error if Plugin Command is listed as available, but the plugin object doesn't actually have this method.
		*/
		_getCommandMethod(command, plugin_name)
		{
			var ind=this.validCommands.indexOf(command);
			if (ind==-1) return;
			if (!this[command] || !(this[command] instanceof Function)) throw new Error('bad plugin command');
			return this[command];
		}
		
		registerAddOn(name, applyAlias)
		{
			this.addOns.push(name);
			if (this._parameters) EvilCat.receiveProperties(this._parameters, PluginManager.parameters(name));
			if (applyAlias) EvilCat.PluginAliases[name]=this;
		}
		
		/*
		* Returns plugin's raw parameters (not parsed).
		* @return Array
		*/
		parameters()
		{
			if (!this._paramaters)
			{
				this._parameters=PluginManager.parameters(this.name);
				this.addOns.forEach( (function(name) { EvilCat.receiveProperties(this._parameters, PluginManager.parameters(name)); }).bind(this) );
			}
			return this._parameters;
		}
		
		/*
		* Returns plugin's parameter converted to desired type.
		* Type should be 'Bool', 'Int', 'Float', 'String', a parser method or a string name of pre-extended types (see below).
		* If a param is parsed once, the result is stored. It is assumed that param is supposed to be of specific type only, and neither it nor the type changes at runtime.
		* @param string name A string name of a parameter.
		* @param string|Function type Either a string name of a type, or a parser.
		* @param by_default (optional) A value to return if the parameter is not present.
		* @return Parsed parameter value.
		* @throws Error if parameter is not set and by_default is not provided.
		*/
		parameter(name, type, by_default)
		{
			if (this.parsedParams.hasOwnProperty(name)) return this.parsedParams[name];
			
			var parameters=this.parameters();
			if (!parameters.hasOwnProperty(name))
			{
				if (by_default===undefined) throw new Error('Required param: '+name);
				return this.parsedParams[name]=by_default;
			}
			
			var param=parameters[name];
			if (type)
			{
				try
				{
					return this._parseParam(param, type, name);
				}
				catch (err)
				{
					if (by_default!==undefined)
					{
						console.log(this.name+' plugin: Default value used for '+name);
						return this.parsedParams[name]=by_default;
					}
					else throw err;
				}
			}
			else return this.parsedParams[name]=param;
		}
		
		/*
		* Parses a parameter according to a type.
		* @private
		* @param string param A value of a parameter.
		* @param string|Function type Either a string name of a type, or a parser.
		* @param string name A string name of a parameter.
		* @return Parsed parameter value.
		* @throws Error if can't decide parsed for the type.
		*/
		_parseParam(param, type, name)
		{
			var method;
			if (type instanceof Function) method=type;
			else method=this.constructor._parserByName(type);
			if (!method) throw new Error('no parse method for '+type);
			var parsed=method(param);
			if (name!==undefined) this.parsedParams[name]=parsed;
			return parsed;
		}
		
		/*
		* Find parser by type's string name. Should be called in plugin class (not instance) context!
		* @private
		* @param string type_name A string name of a type, like 'Bool', 'Int', 'Float'. The type should be pre-extended to the class.
		* @return undefined|Function The parsed function if found; undefined otherwise.
		*/
		static _parserByName(type_name)
		{
			var method='parse'+type_name;
			if (!this[method]) return undefined;
			return this[method].bind(this); // Parsed usually don't requre a context, but it should be a reliable feathre nonetheless.
		}
		
		/*
		* Supplies a Plugin class with additinal parameter parser. Should be called in plugin class (not instance) context!
		* Example: EvilCat.ShadowedCharacters.extendType('Color'); // If EvilCatColors add-on plugin is used.
		*
		* Has sereval signatures:
		*
		* @param string name Type name
		* @param Function parser The function to convert to type.
		*
		* @param Function parser The function to convert to type, shoul'd have a name!
		*
		* @param string name Type name that is present in EvilCat.parses object.
		*/
		static extendType(name, parser)
		{
			if (parser===undefined)
			{
				if (name instanceof Function && Function.name) { parser=name; name=parser.name; }
				else if (EvilCat.parsers.hasOwnProperty(name)) parser=EvilCat.parsers[name];
				else throw new Error('No parser!')
			}
			
			var parserName='parse'+name, paramName='param'+name;
			if (this[parserName]) throw new Error('Parser '+name+' already exists!');
			if (this[paramName])  throw new Error('Parser '+name+' already exists!');
			
			this.prototype[paramName]=function(pname, by_default) { return this.parameter(pname, name, by_default); }
			this[parserName]=parser;
		}
		
		/*
		* Supplies a Plugin class with additinal parameter parsers. Should be called in plugin class (not instance) context!
		* Accepts a list constisting of names and parsers in any combination. They are handed to extendType function.
		*/
		static extendTypes()
		{
			for (var x=0; x<arguments.length; x++)
			{
				this.extendType(arguments[x]);
			}
		}
	}
	EvilCat.Plugins={};
	EvilCat.PluginAliases={};
	
	let _Game_Interpreter_pluginCommand=Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args)
	{
		if (EvilCat.Plugins[command]) EvilCat.Plugins[command]._eventCommand(command, this, args);
		else if (EvilCat.PluginAliases[command]) EvilCat.PluginAliases[command]._eventCommand(command, this, args);
        else _Game_Interpreter_pluginCommand.call(this, command, args);
    };
	
	Game_Interpreter.prototype.getContext = function()
	{
		if (this._eventId>0) return $gameMap.event(this._eventId);
		// in all other cases, the Interpreter isn't informed of its master.
	}
	
// ##################################
// ##       The utils plugin	   ##
// ##################################

	let Utils = EvilCat.Utils = class Utils extends EvilCat.Plugin
	{
		constructor()
		{
			super();
		}
		
		_eventCommand(plugin_name, interpreter, args)
		{
			if (plugin_name==='Calc') this.Calc(args.join(''));
			else EvilCat.Plugin.prototype._eventCommand.apply(this, arguments);
		}
		
		Calc(expr)
		{
			var match=/^\s*\$v\(\s*(\d+)\s*\)\s*=(.+)$/.exec(expr);
			if (!match) throw new Error('Bad or useless expression: '+expr);
			var $v=function(index) { return $gameVariables.value(index); };
			$gameVariables.setValue(match[1], eval(match[2]));
		}
	}
	Utils = EvilCat.Utils = new Utils();
	EvilCat.PluginAliases.Calc=Utils;
	
// ##################################
// ##    Standard type parsers    ###
// ##################################
	EvilCat.parsers=
	{
		Bool: function Bool(param)
		{
			if (param===true || param===false) return param;
			param=param.toLowerCase().trim();
			
			var string_true =['true',	'y',	'yes',	'on',	'1',	'enable',	'enabled'];
			var string_false=['false',	'n',	'no',	'off',	'0',	'disable',	'disabled'];
			
			if (string_true.indexOf(param)!=-1) return true;
			if (string_false.indexOf(param)!=-1) return false;
			
			throw new Error('unknown boolean value: '+param);
		},
		
		Int: function Int(param)
		{
			if (Number.isInteger(param)) return param;
			return Math.floor(Number(param));
		},
		
		Id: function Id(param)
		{
			param=EvilCat.parsers.Int(param);
			if (param<1) throw new Error('bad Id');
			return param;
		},
		
		Float: function Float(param)
		{
			if (Number.isFinite(param)) return param;
			var result=Number(param);
			if (isNaN(result)) throw new Error('Not a number');
		},
		
		String: function String(param)
		{
			if (typeof param === 'string') return param;
			return window.String(param); // accessing global String property instead of local (which is the function itself for portability reasons)
		},
		
		Array: function Array(param) // String array by default!
		{
			if (param instanceof Array) return param;
			if (typeof param === 'string') return param.split(/\s*,\s*/);
			throw new Error('bad array');
		}
	};
	EvilCat.Plugin.extendTypes('Bool', 'Int', 'Id', 'Float', 'String', 'Array');
	
// ##############################################
// ###    Getting meta from various objects   ###
// ##############################################
	
	/*
	* A standard method to extract and parse data from meta.
	* @private
	
	* Has several signatures:
	* @param Array meta A meta array.
	* @return Array Raw meta
	
	* @param Array meta A meta array.
	* @param string name A string name of a meta parameter
	* @param string|Function type Either a string name of a standard type, or a parser.
	* @param by_default (optional) A value to return if the parameter is not present.
	* @return Parsed meta parameter value; or undefined if either parameter or meta is not present.
	* @throws Error if can't decide parser function.
	*/
	let extractFromMeta = EvilCat.extractFromMeta =function(meta, name, parser, by_default)
	{
		if (!meta) return undefined;
		if (name===undefined) return meta;
		
		var value;
		if (!meta.hasOwnProperty(name)) return by_default;
		value=meta[name];
		if (parser)
		{
			if (typeof parser === 'string')
			{
				if (!EvilCat.parsers[parser]) throw new Error('Bad parser name!');
				parser=EvilCat.parsers[parser];
			}
			value=parser(value);
		}
		return value;
	}
	
	/*
	* Method attached to most objects that have notes. Has same signature as EvilCat.Plugin.parameter.
	* Doesn't store parsed values, so is slightly more expensive than plugin's method.
	* @param string name A string name of a meta parameter.
	* @param string|Function type Either a string name of a standard type, or a parser.
	* @param by_default (optional) A value to return if the parameter is not present.
	* @return Parsed meta parameter value.
	*/
	let getMeta=function(param, parser, by_default)
	{
		var meta;
		if (this.meta) meta=this.meta;
		else if (this.getDBData)
		{
			var data=this.getDBData();
			if (data && data.meta) meta=data.meta;
		}
		if (!meta) return by_default;
		return extractFromMeta(meta, param, parser, by_default);
	}
	
	Game_Item	.prototype.getMeta	=getMeta;
	Game_Actor	.prototype.getMeta	=getMeta;
	Game_Enemy	.prototype.getMeta	=getMeta;
	Game_Map	.prototype.getMeta	=getMeta;
	Game_Event	.prototype.getMeta	=getMeta;
	Game_Player	.prototype.getMeta	=getMeta;
	Game_Follower.prototype.getMeta	=getMeta;
	// Troops, Common Events, and Vehicles don't have notes
	
	if (Utils.paramBool('Read Meta from Page', true))
	{
		let gatherIntroComments=function(list)
		{
			if (!list) return;
			var comments=[], command;
			for (var x=0; x<list.length; x++)
			{
				command=list[x];
				if (command.code!==108 && command.code!==408) break;
				comments.push(command.parameters[0]);
			}
			return comments.join("\n");
		}
		
		let _Game_Event_refresh=Game_Event.prototype.refresh;
		Game_Event.prototype.refresh = function()
		{
			_Game_Event_refresh.call(this);
			var metaSource=this.getDBData().note;
			var page=this.page();
			var intro=gatherIntroComments(page && page.list);
			if (intro) metaSource=[metaSource, intro].join("\n");
			
			var fakeData={note: metaSource};
			DataManager.extractMetadata(fakeData);
			this.meta=fakeData.meta;
		}
	}
	
// #########################################
// ###     Common function for DB data   ###
// #########################################
	
	// for skills, weapons, armor and items
	Game_Item	.prototype.getDBData	=function() { return this.object();	}
	Game_Actor	.prototype.getDBData	=function() { return this.actor();	}
	Game_Enemy	.prototype.getDBData	=function() { return this.enemy();	}
	Game_Troop	.prototype.getDBData	=function() { return this.troop();	}
	Game_Map	.prototype.getDBData	=function() { return $dataMap;		}
	Game_CommonEvent.prototype.getDBData
										=function() { return this.event();	}
	Game_Event	.prototype.getDBData	=function() { return this.event();	}
	Game_Player	.prototype.getDBData	=function() { return $gameParty.leader().getDBData(); }
	Game_Follower.prototype.getDBData	=function() { return this.actor() && this.actor().getDBData(); }
	Game_Vehicle.prototype.getDBData	=function() { return this.vehicle();}
	
// #########################################
// ###     Additional manager methods    ###
// #########################################
	
	SceneManager.isInStack=function(sceneClass)
	{
		return this._stack.indexOf(sceneClass)!=-1;
	}
	
// #########################################
// ##    Additional Character methods    ###
// #########################################

	/*
	* Sets arbitrary data to event instead of what it had before.
	* @param Object data Data in json format.
	*/
	Game_Event.prototype.setData=function(data)
	{
		data.id=this.eventId();
		DataManager.extractMetadata(data);
		var x=this.x, y=this.y;
		this.event=function() { return data; }
		this.initMembers();
		this.locate(x, y);
		this.refresh();
	}

	/*
	* Checks if Event is near enough to a position by its real coordinates. Analogous to standard pos() method.
	* Doesn't take into account diagonals! Point 1,1 is withint distance 1 of point 0,0 by this system, but 1.1, 0 isn't.
	* @param float x Reference point x
	* @param float y Reference point y
	* @param float max_distance (Optional) Maximum divergence by an axis to be considered out of range; default is 1.
	* @return bool
	*/
	Game_CharacterBase.prototype.realPos=function(x, y, max_distance)
	{
		if (max_distance===undefined) max_distance=1;
		return (Math.abs(this._realX-x)<max_distance) && (Math.abs(this._realY-y)<max_distance);
	}
	
	/*
	* Calculates trigonometrical distance from Event's real coordinates to the reference point.
	* @param float x Reference point x
	* @param float y Reference point y
	* @return float Distance
	*/
	Game_CharacterBase.prototype.realDistanceTo=function(x, y)
	{
		return Math.sqrt( Math.pow(this._realX-x, 2) + Math.pow(this._realY-y, 2) );
	}
	
	/*
	* Lists events that are near enough in a square range to a position by their real coordinates. Analogous to standard eventsXy() method.
	* @see Game_CharacterBase.prototype.realPos()
	* @param float x Reference point x
	* @param float y Reference point y
	* @param float max_distance (Optional) Maximum divergence by an axis to be considered out of range; default is 1.
	* @return Array of Game_Event
	*/
	Game_Map.prototype.eventsRealXy=function(x, y, max_distance)
	{
		return this.events().filter(function(event) {
			return event.realPos(x, y);
		});
	}
	
	/*
	* Returns Event that is nearest trigonometrically to the reference point by its real coordinates.
	* Picks from events filtered by eventsRealXy() method, that is - all events in square range of the refernce point.
	* @see Game_Map.prototype.eventsRealXy()
	* @param float x Reference point x
	* @param float y Reference point y
	* @param float max_distance (Optional) Maximum divergence by an axis to be considered out of range; default is 1.
	* @return Game_Event|null Either Game_Event object; or null if not found.
	*/
	Game_Map.prototype.nearestEvent=function(x, y, max_distance)
	{
		var distance=null;
		return this.events().reduce(
			function(carry, event)
			{
				if (!event.realPos(x, y, max_distance)) return carry;
				var new_distance=event.realDistanceTo(x, y);
				if (distance===null || new_distance<distance)
				{
					distance=new_distance;
					return event;
				}
				else return carry;
			},
			null
		);
	}
	
}