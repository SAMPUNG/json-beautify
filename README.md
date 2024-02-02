# json-beautify

A tool that can be used to beautify JSON strings.

- NPM Install

```cmd
npm install @jugar/json-beautify
```

- Usage

```ts
import { beautifyJSON } from '@jugar/json-beautify'

const json = `'{"Command":"FlyTo","Data":{"Parameters":{"Location":"(X=15491.9375,Y=26122.925781,Z=1500.001099)","Rotation":"(P=-48.723961,Y=-74.87056,R=0)","Distance":43987.796875,"Duration":3}},"UID":"323CDAE1"}'`

beautifyJSON(json)
```
