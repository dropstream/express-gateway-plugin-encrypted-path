# express-gateway-plugin-encrypted-path
Plugin used to decrypt an API Endpoint path

It allows receiving unauthenticated request in a secure way, by exposing an encrypted path with a part that:

1. Corresponds to an plain-text identifier that is decrypted and passed downstream to the proxy
2. Is cryptographically sound

To use, add plugin in system.config.yml and add the following in gateway.config.yml:

```
      - encrypted-path:
          - condition:
              name: cryptpathmatch
              match: /foo/:encrypted
            action:
              rewrite: /bar/:decrypted
              key: abcdefgh
```
where 

  - :encrypted is the part in the path that contains the encrypted payload
  - :decrypted is the part that can be used in the action section to rewrite the url using the value of the decrypted payload (plain text)
