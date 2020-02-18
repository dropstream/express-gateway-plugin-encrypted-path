const pathToRegExp = require('path-to-regexp');

module.exports = {
  name: 'pathmatch',
  handler: function (req, conditionConfig) {
    const keys = [];
    const regExpFromPath = pathToRegExp(conditionConfig.match, keys);
    const extractedParameters = regExpFromPath.exec(req.url);

    if (extractedParameters !== null) {
      req.egContext.encryptedPathCondition = {};
      keys.forEach((key, index) => { req.egContext.encryptedPathCondition[key.name] = extractedParameters[index + 1] });
      if (req.egContext.encryptedPathCondition['encrypted'] != null &&
          req.egContext.encryptedPathCondition['encrypted'] != "")
        return true;
      else
        return false;
    }
    return false;
  },
  schema: {
    $id: 'http://express-gateway.io/schemas/conditions/encrypted-path-pathmatch.json',
    type: 'object',
    properties: {
      match: {
        type: 'string',
        description: 'The url pattern to look for'
      },
    },
    required: ['match']
  }
};
