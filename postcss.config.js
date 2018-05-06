module.exports = (ctx) => ({
	map: ctx.env === 'development' ? ctx.map : false,
	plugins: {
	  "autoprefixer": {
			"browsers": [
				">3%",
				"ie >= 11"
			]
	  },
	  "postcss-nested": {}
	}
})
  