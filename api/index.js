delete require.cache[ module.filename ];	// always reload
const HERE = require("path").dirname( module.filename );

const fs = require( "fs" );

require("sleepless");
const L = log5.mkLog( "BLOGS " )( 3 );

const DataStore = require("ds").DS;
const ds = new DataStore("./datastore.json");

if(!ds.body)
{
	ds.body = {
		"background-color": "#ffffff",
		"color": "#000000",
		"font-size": "12pt",
	}
}

module.exports = function(input, _okay, _fail)
{
	let {action} = input;
	//console.log(action);

	if(action === "set_rule")
	{
		let {key, ruleKey, value} = input;

		check(key, "string");
		check(ruleKey, "string");
		check(value, "string");

		if((ruleKey === "color" || ruleKey === "background-color") && !isColor(value))
		{
			_fail("Not a color");
			return;
		}

		if(ruleKey == "font-size")
		{
			let size = value.split(/\D+/)[0];
			let unit = value.split(/(\D+)/)[1];

			if(!unit || unit === "" || unit === " ")
			{
				unit = "pt";
				value += unit;
			}
			if(unit !== "pt")
			{
				_fail("Must use pt");
				return;
			}
			if(size < 12 || size > 24)
			{
				_fail("Size must be within the range of 12pt to 24pt");
				return;
			}
		}

		console.log(`setting ${key}.${ruleKey}: ${value};`);
		if(!ds[key])
		{
			ds[key] = {};
		}
		ds[key][ruleKey] = value;
		ds.save();
		_okay();

		return;
	}

	if(action === "getSettings")
	{
		_okay(ds);
		return;
	}

	_fail(`Action not found: `, action);
}

const isColor = function(color)
{
	if(!color.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/))
	{
		return false;
	}
	return true;
}

const check = function(obj, type)
{
	if(typeof obj !== type)
	{
		throw new Error(`Match fail | Expected ${type} | Got ${typeof obj}`);
	}

	return true;
}
