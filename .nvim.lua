local wk = require("which-key")
wk.add({
	{ "<localleader>f", group = "Foundry" },
	{
		"<localleader>fc",
		function()
			require("lazyvim.util").terminal("fvtt-config")
		end,
		desc = "Launch fvtt-config",
	},
	{
		"<localleader>ff",
		function()
			require("lazyvim.util").terminal({ "fvtt", "launch", "--world", "gaia" })
		end,
		desc = "Launch foundry with world Gaïa",
	},
	{
		"<localleader>fl",
		function()
			require("lazyvim.util").terminal({ "fvtt", "launch" })
		end,
		desc = "Launch foundry",
	},
	{ "<localleader>s", group = "NPM scripts" },
	{
		"<localleader>sd",
		function()
			require("lazyvim.util").terminal({ "npm", "run", "build:dev" }, { interactive = false })
			vim.cmd.startinsert()
		end,
		desc = "npm run build:dev",
	},
})
