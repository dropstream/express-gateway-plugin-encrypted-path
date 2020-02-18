module.exports = {
  version: '1.2.0',
  init: function (pluginContext) {
    pluginContext.registerPolicy(require('./policies/encrypted-path-policy'));
    pluginContext.registerCondition(require('./conditions/pathmatch'));
  },
  policies:['encrypted-path'], // this is for CLI to automatically add to "policies" whitelist in gateway.config
  schema: {
    $id: 'http://express-gateway.io/schemas/plugin/encrypted-path.json',
    required: [] }
};
