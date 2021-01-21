const pathToRegExp = require('path-to-regexp');
const Blowfish = require('egoroof-blowfish');
const hexToArrayBuffer = require('hex-to-array-buffer');
const arrayBufferToHex = require('array-buffer-to-hex');

module.exports = {
  name: 'encrypted-path',
  policy: (actionParams) => {
    const compiledExp = pathToRegExp.compile(actionParams.rewrite);
    const bf = new Blowfish(actionParams.key, Blowfish.MODE.ECB, Blowfish.PADDING.PKCS5)
    return (req, res, next) => {
      let params = req.egContext.encryptedPathCondition;
      let encrypted = hexToArrayBuffer(params.encrypted);
      params.decrypted = bf.decode(encrypted, Blowfish.TYPE.STRING);
      // eslint-disable-next-line no-console
      console.log('encrypted-path policy params:', params);
      let url = decodeURIComponent(compiledExp(params));
      req.url = url;
      next();
    };
  },
  schema: {
    $id: 'http://express-gateway.io/schemas/policies/encrypted-path-rewrite.json',
    type: 'object',
    properties: {
      rewrite: {
        description: `Express Path correspond to the url pattern to rewrite.
                      The format should matche the one used in the condition,
                      with :decrypted replacing the value of :encrypted`,
        type: 'string'
      },
      key: {
        description: 'The secret key to decrypt paths',
        type: 'string'
      }
    }, required: ['rewrite', 'key']
  }
};
