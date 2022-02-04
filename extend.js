export default (config) => {

	config.buildModules = config.buildModules || []

	config.buildModules.push(
		'@nuxtjs/google-analytics'
	)

	return config
	
}