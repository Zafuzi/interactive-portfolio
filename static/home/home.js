

function populateStyleForm()
{
	let settings = JSON.parse(localStorage.getItem("settings"));
	console.log(settings);

	for(let key in settings)
	{
		let rule = settings[key];

		for(let ruleKey in rule)
		{
			let input = document.querySelector(`[name="${key}.${ruleKey}"]`);
			if(input)
			{
				input.value = rule[ruleKey];

				if(input.dataset.hasListener !== "true")
				{
					input.dataset.hasListener = "true";
					input.addEventListener("change", function(event)
					{
						let value = event.target.value;

						sleepless.rpc("/api/", {action: "set_rule", key, ruleKey, value: event.target.value}, function(result)
						{
							getSettings(populateStyleForm);
						}, function(error)
						{
							alert(error);
						});
					});
				}
			}
		}
	}
}

populateStyleForm();
