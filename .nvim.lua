local wk = require("which-key")
wk.add({
	{ "<localleader>f", group = "Foundry" },
	{
		"<localleader>fc",
		function()
			require("snacks").terminal("fvtt-config")
		end,
		desc = "Launch fvtt-config",
	},
	{
		"<localleader>ff",
		function()
			require("snacks").terminal({ "fvtt", "launch", "--world", "gaia" })
		end,
		desc = "Launch foundry with world Gaïa",
	},
	{
		"<localleader>fl",
		function()
			require("snacks").terminal({ "fvtt", "launch" })
		end,
		desc = "Launch foundry",
	},
	{ "<localleader>s", group = "NPM scripts" },
	{
		"<localleader>sd",
		function()
			require("snacks").terminal({ "npm", "run", "build:dev" }, { interactive = false })
			vim.cmd.startinsert()
		end,
		desc = "npm run build:dev",
	},
})
