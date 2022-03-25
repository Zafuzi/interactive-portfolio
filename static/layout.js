let nav = null;
let args = sleepless.getQueryData();
	args.route = "/" + window.location.pathname.split("/")[1];

let settingsElement = null;

// get datastore from server
const getSettings = function(callback)
{
	rpc("/api/", {action: "getSettings"}, function(result)
	{
		localStorage.setItem("settings", JSON.stringify(result));
		if(settingsElement)
		{
			document.body.removeChild(settingsElement);
			settingsElement = null;
		}

		let dynamicStyle = document.createElement("style");
			dynamicStyle.id = "settingsElement";

		for(let key in result)
		{
			let rule = result[key];

			dynamicStyle.textContent += `${key} {\n`;
			for(let ruleKey in rule)
			{
				dynamicStyle.textContent += `\t${ruleKey}: ${rule[ruleKey]};\n`;
			}
			dynamicStyle.textContent += "}\n";

		}

		document.body.appendChild(dynamicStyle);

		settingsElement = document.querySelector("#settingsElement");

		if(callback && typeof callback === "function")
		{
			callback(result);
		}
	}, console.error);
}

document.addEventListener("DOMContentLoaded", function()
{
	nav = document.querySelector("nav");
	setActiveNav();
	//getSettings();
});

function setActiveNav()
{
	if(nav)
	{
		let activeLink = nav.querySelector(`a[data-route="${args.route}"]`)
		if(activeLink)
		{
			activeLink.classList.add("active");
		}
	}
	console.log("Query Args: %o", args);
}
